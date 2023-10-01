using Transflower.Warehouses.Models;
using Transflower.Warehouses.Repositories.Interfaces;
using MySql.Data.MySqlClient;
namespace Transflower.Warehouses.Repositories;

public class WarehouseRepository : IWarehouseRepository
{
    private readonly IConfiguration _configuration;
    private readonly string _connectionString;
    public WarehouseRepository(IConfiguration configuration)
    {
        _configuration = configuration;
        _connectionString = _configuration.GetConnectionString("DefaultConnection");
    }
    public async Task<IEnumerable<WarehouseStaff>> GetAll()
    {
        List<WarehouseStaff> warehouses = new();
        MySqlConnection con = new(_connectionString);
        try
        {
            string query = " SELECT w.id,e.id AS employeeid,  w.section,  min(m.imageurl) AS imageurl,   (c.category) AS category FROM warehousestaff w INNER JOIN  categories c ON c.id = w.categoryid INNER JOIN   materials m ON m.categoryid = w.categoryid  INNER JOIN    employees e ON e.id = w.employeeid GROUP BY   w.id,  e.id,  w.section;";
            MySqlCommand cmd = new(query, con);
            await con.OpenAsync();
            MySqlDataReader reader = cmd.ExecuteReader();
            while (await reader.ReadAsync())
            {
                int id = int.Parse(reader["id"].ToString());
                int employeeId = int.Parse(reader["employeeid"].ToString());
                string? section = reader["section"].ToString();
                string? category = reader["category"].ToString();
                string? imageUrl = reader["imageurl"].ToString();

                WarehouseStaff warehouse = new()
                {
                    Id = id,
                    EmployeeId = employeeId,
                    Section = section,
                    MaterialType = category,
                    ImageUrl=imageUrl
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
        List<int> storeManagers = new();
        MySqlConnection con = new(_connectionString);
        try
        {
            string query = "select userid from employees where roleid=(select id from roles where role='Store Manager')";
            MySqlCommand cmd = new(query, con);
            await con.OpenAsync();
            MySqlDataReader reader = cmd.ExecuteReader();
            while (await reader.ReadAsync())
            {
                int employeeId = int.Parse(reader["userid"].ToString());
                storeManagers.Add(employeeId);
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
        MySqlConnection con = new(_connectionString);
        try
        {
            string query = "select w.id ,e.id as employeeid, w.section, c.category from warehousestaff w inner join categories c on c.id=w.categoryid inner join employees e on e.id=w.employeeid where w.id =@id";
            MySqlCommand cmd = new(query, con);
            cmd.Parameters.AddWithValue("@id", id);
            await con.OpenAsync();
            MySqlDataReader reader = cmd.ExecuteReader();
            while (await reader.ReadAsync())
            {
                int theId = int.Parse(reader["id"].ToString());
                int employeeId = int.Parse(reader["employeeid"].ToString());
                string? section = reader["section"].ToString();
                string? category = reader["category"].ToString();

                warehouse = new()
                {
                    Id = theId,
                    EmployeeId = employeeId,
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
        MySqlConnection con = new(_connectionString);
        try
        {
            string query = "insert into Warehousestaff(section, categoryid,employeeid)values(@section, (select id from categories where category=@category),@empid);";
            MySqlCommand cmd = new(query, con);
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
        MySqlConnection con = new(_connectionString);
        try
        {
            string query = "UPDATE Warehousestaff SET section=@section, categoryid=(select id from categories where category=@category), employeeid=@empid WHERE id=@id;";
            MySqlCommand cmd = new(query, con);
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

        using (MySqlConnection connection = new(_connectionString))
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
                        allUpdated = false;
                    }
                }
                if (allUpdated)
                {
                    await transaction.CommitAsync();
                }
                else
                {
                    await transaction.RollbackAsync();
                }
            }
            catch (Exception e)
            {
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
            string updateQuery = "UPDATE Warehousestaff " +
                                 "SET section = employeeid = @empid " +
                                 "WHERE id = @id";

            MySqlCommand cmd = new MySqlCommand(updateQuery, connection, transaction);

            cmd.Parameters.AddWithValue("@empid", warehouse.EmployeeId);

            int rowsAffected = await cmd.ExecuteNonQueryAsync();

            if (rowsAffected > 0)
            {
                updated = true;
            }
        }
        catch (Exception e)
        {
            Console.WriteLine("Error: " + e.Message);
            updated = false;
        }

        return updated;
    }

    public async Task<bool> Delete(int id)
    {
        bool status = false;
        MySqlConnection con = new (_connectionString);
        try
        {
            string query = "DELETE FROM warehousestaff WHERE id=@id";
            MySqlCommand cmd = new (query, con);
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