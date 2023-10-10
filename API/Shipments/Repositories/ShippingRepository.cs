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
    public async Task<List<Shipping>> GetShipments(int employeeId)
    {
        List<Shipping> shippingDetails = new List<Shipping>();
        MySqlConnection con = new(_connectionString);
        try
        {
            string query = "select s.date ,r.status,r.id from shipments s inner join productionstaff p on p.firstsupervisor= s.supervisorid or p.secondsupervisor = s.supervisorid  inner join materialrequests r on s.materialrequestid=r.id where s.shipperid=@employeeId and r.status<> 1 ORDER BY s.id";
            MySqlCommand cmd = new(query, con);
            cmd.Parameters.AddWithValue("@employeeId", employeeId);
            await con.OpenAsync();
            MySqlDataReader reader = cmd.ExecuteReader();
            while (await reader.ReadAsync())
            {
                int id = int.Parse(reader["id"].ToString());
                DateTime date = DateTime.Parse(reader["date"].ToString());
                string status = reader["status"].ToString();


                Shipping shipping = new Shipping()
                {
                    Id = id,
                    Status = status,
                    Date = date,
                };
                shippingDetails.Add(shipping);
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

        return shippingDetails;
    }


    public async Task<List<ShippingDetails>> GetShippingDetails(int taskId)
    {
        List<ShippingDetails> shippingdetails = new();
        MySqlConnection con = new(_connectionString);
        try
        {
            string query = "select sd.id as orderid,s.id as taskid , materialrequests.status, warehousestaff.section,a.department from shipments s inner join shippingdetails sd on s.id=sd.shipmentid inner join materialrequests on materialrequests.id=s.id inner join warehousestaff on warehousestaff.categoryid=sd.categoryid   inner join productionstaff a on  a.firstsupervisor= s.supervisorid or a.secondsupervisor = s.supervisorid where s.id=@taskId";
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

    public async Task<bool> UpdateStatus(int id,string orderStatus)
    {
        bool status = false;
        MySqlConnection con = new(_connectionString);
        try
        {
            string query = "update materialrequests set status=@status where id=@id";
            MySqlCommand cmd = new(query, con);
            cmd.Parameters.AddWithValue("@id", id);
            cmd.Parameters.AddWithValue("@status", orderStatus);
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