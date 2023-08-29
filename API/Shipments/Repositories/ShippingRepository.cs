using Transflower.Shipments.Models;
using Transflower.Shipments.Repositories.Interfaces;
using MySql.Data.MySqlClient;
namespace Transflower.Shipments.Repositories;
public class ShippingRepository : IShippingRepository
{
    private readonly IConfiguration _configuration;
    private readonly string _connectionString;
    public ShippingRepository(IConfiguration configuration)
    {
        _configuration = configuration;
        _connectionString = _configuration.GetConnectionString("DefaultConnection");
    }


    //get cart Items of supervisors by sending supervisor's id
    public async Task<Shipping> GetShipments(int employeeId)
    {
        Shipping shipping = null;
        MySqlConnection con = new(_connectionString);
        try
        {
            string query = "select s.id,s.date,departments.department ,r.id from shipments s inner join employees on employees.id=s.supervisorid inner join departments on employees.departmentid=departments.id inner join materialrequests r on s.materialrequestid=r.id where s.shipperid=@employeeId and r.status=3 or r.status=4 ORDER BY s.id DESC LIMIT 1";
            MySqlCommand cmd = new(query, con);
            cmd.Parameters.AddWithValue("@employeeId", employeeId);
            await con.OpenAsync();
            MySqlDataReader reader = cmd.ExecuteReader();
            while (await reader.ReadAsync())
            {
                int id = int.Parse(reader["id"].ToString());
                DateTime date = DateTime.Parse(reader["date"].ToString());
                string department = reader["department"].ToString();


                shipping = new Shipping()
                {
                    Id = id,
                    Department = department,
                    Date = date,
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

        return shipping;
    }

    public async Task<List<Shipping>> GetShipped(int employeeId)
    {
        List<Shipping> shippings = new();
        MySqlConnection con = new(_connectionString);
        try
        {
            string query = "select s.id,s.date,departments.department ,r.id from shipments s inner join employees on employees.id=s.supervisorid inner join departments on employees.departmentid=departments.id inner join materialrequests r on s.materialrequestid=r.id where  r.status=6 and s.shipperid=@employeeId";
            MySqlCommand cmd = new MySqlCommand(query, con);
            cmd.Parameters.AddWithValue("@employeeId", employeeId);
            await con.OpenAsync();
            MySqlDataReader reader = cmd.ExecuteReader();
            while (await reader.ReadAsync())
            {
                int id = int.Parse(reader["id"].ToString());
                DateTime date = DateTime.Parse(reader["date"].ToString());
                string department = reader["department"].ToString();

                Shipping shipping = new()
                {
                    Id = id,
                    Department = department,
                    Date = date,
                };

                shippings.Add(shipping);

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

        return shippings;
    }


    public async Task<List<ShippingDetails>> GetShippingDetails(int taskId)
    {
        List<ShippingDetails> shippingdetails = new();
        MySqlConnection con = new(_connectionString);
        try
        {
            string query = "select sd.id as orderid,s.id as taskid , materialrequests.status, warehousestaff.section,departments.department from shipments s inner join shippingdetails sd on s.id=sd.shipmentid inner join materialrequests on materialrequests.id=s.id inner join warehousestaff on warehousestaff.categoryid=sd.categoryid inner join employees on employees.id=s.supervisorid inner join departments on employees.departmentid=departments.id where s.id=@taskId";
            MySqlCommand cmd = new(query, con);
            cmd.Parameters.AddWithValue("@taskId", taskId);
            await con.OpenAsync();
            MySqlDataReader reader = cmd.ExecuteReader();
            while (await reader.ReadAsync())
            {
                int orderId = int.Parse(reader["orderid"].ToString());
                int id = int.Parse(reader["taskid"].ToString());
                string section = reader["section"].ToString();
                string department = reader["department"].ToString();
                string status = reader["status"].ToString();

                ShippingDetails details = new()
                {
                    OrderId = orderId,
                    TaskId = id,
                    Department = department,
                    Section = section,
                    Status = status
                };

                shippingdetails.Add(details);

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

        return shippingdetails;
    }


    public async Task<int> GetTotalTasks(int employeeId)
    {
        int tasks = 0;
        MySqlConnection con = new(_connectionString);
        try
        {
            string query = "select count(*) as tasks from shipments where shipperid=@employeeId;";
            MySqlCommand cmd = new(query, con);
            cmd.Parameters.AddWithValue("@employeeId", employeeId);
            await con.OpenAsync();
            MySqlDataReader reader = cmd.ExecuteReader();
            while (await reader.ReadAsync())
            {
                tasks = int.Parse(reader["tasks"].ToString());
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

        return tasks;
    }

    public async Task<bool> UpdateStatus(int id)
    {
        bool status = false;
        MySqlConnection con = new(_connectionString);
        try
        {
            string query = " update materialrequests set status=4 where id=@id";
            MySqlCommand cmd = new(query, con);
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

    public async Task<bool> ShipmentDeliver(int id)
    {
        bool status = false;
        MySqlConnection con = new(_connectionString);
        try
        {
            string query = " update materialrequests set status=6 where id=@id";
            MySqlCommand cmd = new(query, con);
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