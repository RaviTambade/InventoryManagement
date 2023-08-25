using System.Collections.Generic;
using System.Collections.Specialized;
using Warehouses.Models;
using Warehouses.Repositories.Interfaces;
using MySql.Data.MySqlClient;
namespace Warehouses.Repositories;
using System.Data.SqlClient;

public class WarehouseRepository : IWarehouseRepository
{
    private IConfiguration _configuration;
    private string _conString;
    public WarehouseRepository(IConfiguration configuration)
    {
        _configuration = configuration;
        _conString = this._configuration.GetConnectionString("DefaultConnection");
    }
    public async Task<IEnumerable<WarehouseStaff>> GetAll()
    {
        List<WarehouseStaff> warehouses = new List<WarehouseStaff>();
        MySqlConnection con = new MySqlConnection(_conString);
        try
        {
            string query = "select w.id ,e.id as employeeid, w.section, c.category from warehousestaff w inner join categories c on c.id=w.categoryid inner join employees e on e.id=w.employeeid;";
            MySqlCommand cmd = new MySqlCommand(query, con);
            await con.OpenAsync();
            MySqlDataReader reader = cmd.ExecuteReader();
            while (await reader.ReadAsync())
            {
                int id = Int32.Parse(reader["id"].ToString());
                int empid = Int32.Parse(reader["employeeid"].ToString());
                string? section = reader["section"].ToString();
                string? category = reader["category"].ToString();

                WarehouseStaff warehouse = new WarehouseStaff
                {
                    Id = id,
                    EmployeeId=empid,
                    Section = section,
                    MaterialType = category,
    
                };

                warehouses.Add(warehouse);
            }
            await reader.CloseAsync();
        }
        catch (Exception e)
        {
            throw e;
        }
        finally
        {
            await con.CloseAsync();
        }
        return warehouses;
    }
  
      public async Task<List<int>> GetAllStoreManagers()
    {
        List<int> storeManagers = new List<int>();
        MySqlConnection con = new MySqlConnection(_conString);
        try
        {
            string query = "select userid from employees where roleid=(select id from roles where role='Store Manager')";
            MySqlCommand cmd = new MySqlCommand(query, con);
            await con.OpenAsync();
            MySqlDataReader reader = cmd.ExecuteReader();
            while (await reader.ReadAsync())
            {
                int empid = int.Parse(reader["userid"].ToString());
                storeManagers.Add(empid);
            }
            await reader.CloseAsync();
        }
        catch (Exception e)
        {
            throw e;
        }
        finally
        {
            await con.CloseAsync();
        }
        return storeManagers;
    }
  
  
    public async Task<WarehouseStaff> GetById(int id)
    {
        WarehouseStaff warehouse = null;
        MySqlConnection con = new MySqlConnection(_conString);
        try
        {
            string query = "select w.id ,e.id as employeeid, w.section, c.category from warehousestaff w inner join categories c on c.id=w.categoryid inner join employees e on e.id=w.employeeid where w.id =@id";
            MySqlCommand cmd = new MySqlCommand(query, con);
            cmd.Parameters.AddWithValue("@id", id);
            await con.OpenAsync();
            MySqlDataReader reader = cmd.ExecuteReader();
            while (await reader.ReadAsync())
            {
               int theid = Int32.Parse(reader["id"].ToString());
                int empid = Int32.Parse(reader["employeeid"].ToString());
                string? section = reader["section"].ToString();
                string? category = reader["category"].ToString();

                 warehouse = new WarehouseStaff
                {
                    Id = theid,
                    EmployeeId=empid,
                    Section = section,
                    MaterialType = category,
    
                };

            }
            await reader.CloseAsync();
        }
        catch (Exception e)
        {
            throw e;
        }
        finally
        {
            await con.CloseAsync();
        }
        return warehouse;
    }

    public async Task<bool> Insert(WarehouseStaff warehouse)
    {
        bool status = false;
        MySqlConnection con = new MySqlConnection(_conString);
        try
        {
            string query = "insert into Warehousestaff(section, categoryid,employeeid)values(@section, (select id from categories where category=@category),@empid);";
            MySqlCommand cmd = new MySqlCommand(query, con);
            cmd.Parameters.AddWithValue("@section", warehouse.Section);
            cmd.Parameters.AddWithValue("@category", warehouse.MaterialType);
            cmd.Parameters.AddWithValue("@empid", warehouse.EmployeeId);
            
            await con.OpenAsync();
            int rowsAffected = cmd.ExecuteNonQuery();
            if (rowsAffected > 0)
            {
                status = true;
            }
        }
        catch (Exception e)
        {
            throw e;
        }
        finally
        {
            await con.CloseAsync();
        }
        return status;

    }

    public async Task<bool> Update(WarehouseStaff warehouse)
    {
        bool status = false;
        MySqlConnection con = new MySqlConnection(_conString);
        try
        {
            string query = "UPDATE Warehousestaff SET section=@section, categoryid=(select id from categories where category=@category), employeeid=@empid WHERE id=@id;";
            MySqlCommand cmd = new MySqlCommand(query, con);
            cmd.Parameters.AddWithValue("@id", warehouse.Id);
            cmd.Parameters.AddWithValue("@category", warehouse.MaterialType);
            cmd.Parameters.AddWithValue("@section", warehouse.Section);
            cmd.Parameters.AddWithValue("@empid", warehouse.EmployeeId);

            await con.OpenAsync();
            int rowsAffected = cmd.ExecuteNonQuery();
            if (rowsAffected > 0)
            {
                status = true;
            }
        }
        catch (Exception e)
        {
            throw e;
        }
        finally
        {
            await con.CloseAsync();
        }
        return status;
    }

 public async Task<bool> UpdateStaff(List<WarehouseStaff> warehouses)
    {
        bool allUpdated = true;

        using (MySqlConnection connection = new MySqlConnection(_conString))
        {
            await connection.OpenAsync();
            MySqlTransaction transaction = await connection.BeginTransactionAsync();

            try
            {
                foreach (var warehouse in warehouses)
                {
                    bool updated = await UpdateSingleAsync(warehouse, connection, transaction);

                    if (!updated)
                    {
                        // Handle the case where an update failed for a specific warehouse
                        allUpdated = false;
                        // You can log or handle this error as needed
                    }
                }

                // Commit the transaction if all updates were successful
                if (allUpdated)
                {
                    await transaction.CommitAsync();
                }
                else
                {
                    // Rollback the transaction if any update failed
                    await transaction.RollbackAsync();
                }
            }
            catch (Exception e)
            {
                // Handle the exception here
                // You can log or handle this error as needed
                Console.WriteLine("Error: " + e.Message);
                allUpdated = false;
            }
            finally
            {
                await connection.CloseAsync();
            }
        }

        return allUpdated;
    }

    private async Task<bool> UpdateSingleAsync(WarehouseStaff warehouse, MySqlConnection connection, MySqlTransaction transaction)
    {
        bool updated = false;

        try
        {
            // Define the UPDATE query
            string updateQuery = "UPDATE Warehousestaff " +
                                 "SET section = @section, categoryid = (SELECT id FROM categories WHERE category = @category), employeeid = @empid " +
                                 "WHERE id = @id";

            MySqlCommand cmd = new MySqlCommand(updateQuery, connection, transaction);
            cmd.Parameters.AddWithValue("@id", warehouse.Id);
            cmd.Parameters.AddWithValue("@category", warehouse.MaterialType);
            cmd.Parameters.AddWithValue("@section", warehouse.Section);
            cmd.Parameters.AddWithValue("@empid", warehouse.EmployeeId);

            int rowsAffected = await cmd.ExecuteNonQueryAsync();

            if (rowsAffected > 0)
            {
                updated = true;
            }
        }
        catch (Exception e)
        {
            // Handle the exception here
            // You can log or handle this error as needed
            Console.WriteLine("Error: " + e.Message);
            updated = false;
        }

        return updated;
    }
   
    public async Task<bool> Delete(int id)
    {
        bool status = false;
        MySqlConnection con = new MySqlConnection(_conString);
        try
        {
            string query = "DELETE FROM warehousestaff WHERE id=@id";
            MySqlCommand cmd = new MySqlCommand(query, con);
            cmd.Parameters.AddWithValue("@id", id);
            await con.OpenAsync();
            int rowsAffected = cmd.ExecuteNonQuery();
            if (rowsAffected > 0)
            {
                status = true;
            }
        }
        catch (Exception e)
        {
            throw e;
        }
        finally
        {
           await con.CloseAsync();
        }
        return status;
    }



}