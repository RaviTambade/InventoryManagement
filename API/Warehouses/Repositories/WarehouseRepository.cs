using System.Collections.Specialized;
using Warehouses.Models;
using Warehouses.Repositories.Interfaces;
using MySql.Data.MySqlClient;
namespace Warehouses.Repositories;
public class WarehouseRepository : IWarehouseRepository
{
    private IConfiguration _configuration;
    private string _conString;
    public WarehouseRepository(IConfiguration configuration)
    {
        _configuration = configuration;
        _conString = this._configuration.GetConnectionString("DefaultConnection");
    }
    public async Task<IEnumerable<Warehouse>> GetAll()
    {
        List<Warehouse> warehouses = new List<Warehouse>();
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

                Warehouse warehouse = new Warehouse
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
    public async Task<Warehouse> GetById(int id)
    {
        Warehouse warehouse = null;
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

                 warehouse = new Warehouse
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

    public async Task<bool> Insert(Warehouse warehouse)
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

    public async Task<bool> Update(Warehouse warehouse)
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