using System.Data;
using Transflower.InventoryManagement.BIService.Repositories.Interfaces;
using MySql.Data.MySqlClient;
using Transflower.InventoryManagement.BIService.Models;

namespace Transflower.InventoryManagement.BIService.Repositories;

public class BIRepository : IBIRepository
{
    private readonly IConfiguration _configuration;
    private readonly string _connectionString;

    public BIRepository(IConfiguration configuration)
    {
        _configuration = configuration;
        _connectionString =
            _configuration.GetConnectionString("DefaultConnection")
            ?? throw new ArgumentException("ConnectionString is null");
    }

    public async Task<RequestCount> GetRequestCount(DateTime date, int supervisorId)
    {
        RequestCount requests = new RequestCount();
        MySqlConnection connection = new MySqlConnection(_connectionString);
        try
        {
            MySqlCommand cmd = new MySqlCommand("GetRequestsByDate", connection);
            cmd.CommandType = CommandType.StoredProcedure;
            cmd.Parameters.AddWithValue("@given_date", date);
            cmd.Parameters.AddWithValue("@supervisorId", supervisorId);
            cmd.Parameters.AddWithValue("@todaysRequests", MySqlDbType.Int32);
            cmd.Parameters.AddWithValue("@yesterdaysRequests", MySqlDbType.Int32);
            cmd.Parameters.AddWithValue("@weekRequests", MySqlDbType.Int32);
            cmd.Parameters.AddWithValue("@monthRequests", MySqlDbType.Int32);

            cmd.Parameters["@todaysRequests"].Direction = ParameterDirection.Output;
            cmd.Parameters["@yesterdaysRequests"].Direction = ParameterDirection.Output;
            cmd.Parameters["@weekRequests"].Direction = ParameterDirection.Output;
            cmd.Parameters["@monthRequests"].Direction = ParameterDirection.Output;
            await connection.OpenAsync();
            int rowsAffected = await cmd.ExecuteNonQueryAsync();
            requests.TodaysRequests = (int)cmd.Parameters["@todaysRequests"].Value;
            requests.YesterdaysRequests = (int)cmd.Parameters["@yesterdaysRequests"].Value;
            requests.WeekRequests = (int)cmd.Parameters["@weekRequests"].Value;
            requests.MonthRequests = (int)cmd.Parameters["@monthRequests"].Value;
        }
        catch (Exception)
        {
            throw;
        }
        finally
        {
            await connection.CloseAsync();
        }
        return requests;
    }

    public async Task<OrderCount> GetOrderCount(DateTime date, int storeManagerId)
    {
        OrderCount orders = new OrderCount();
        MySqlConnection connection = new MySqlConnection(_connectionString);
        try
        {
            MySqlCommand cmd = new MySqlCommand("getordersbydate", connection);
            cmd.CommandType = CommandType.StoredProcedure;
            cmd.Parameters.AddWithValue("@given_date", date);
            cmd.Parameters.AddWithValue("@storeManagerId", storeManagerId);
            cmd.Parameters.AddWithValue("@todaysOrders", MySqlDbType.Int32);
            cmd.Parameters.AddWithValue("@yesterdaysOrders", MySqlDbType.Int32);
            cmd.Parameters.AddWithValue("@weekOrders", MySqlDbType.Int32);
            cmd.Parameters.AddWithValue("@monthOrders", MySqlDbType.Int32);

            cmd.Parameters["@todaysOrders"].Direction = ParameterDirection.Output;
            cmd.Parameters["@yesterdaysOrders"].Direction = ParameterDirection.Output;
            cmd.Parameters["@weekOrders"].Direction = ParameterDirection.Output;
            cmd.Parameters["@monthOrders"].Direction = ParameterDirection.Output;
            await connection.OpenAsync();
            int rowsAffected = await cmd.ExecuteNonQueryAsync();
            orders.TodaysOrders = (int)cmd.Parameters["@todaysOrders"].Value;
            orders.YesterdaysOrders = (int)cmd.Parameters["@yesterdaysOrders"].Value;
            orders.WeekOrders = (int)cmd.Parameters["@weekOrders"].Value;
            orders.MonthOrders = (int)cmd.Parameters["@monthOrders"].Value;
        }
        catch (Exception)
        {
            throw;
        }
        finally
        {
            await connection.CloseAsync();
        }
        return orders;
    }
}
