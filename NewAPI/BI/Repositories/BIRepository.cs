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

    public async Task<TaskCount> GetTaskCount(DateTime date, int storeWorkerId)
    {
        TaskCount tasks = new TaskCount();
        MySqlConnection connection = new MySqlConnection(_connectionString);
        try
        {
            MySqlCommand cmd = new MySqlCommand("GetTasksByDate", connection);
            cmd.CommandType = CommandType.StoredProcedure;
            cmd.Parameters.AddWithValue("@given_date", date);
            cmd.Parameters.AddWithValue("@storeWorkerId", storeWorkerId);
            cmd.Parameters.AddWithValue("@todaysTasks", MySqlDbType.Int32);
            cmd.Parameters.AddWithValue("@yesterdaysTasks", MySqlDbType.Int32);
            cmd.Parameters.AddWithValue("@weekTasks", MySqlDbType.Int32);
            cmd.Parameters.AddWithValue("@monthTasks", MySqlDbType.Int32);

            cmd.Parameters["@todaysTasks"].Direction = ParameterDirection.Output;
            cmd.Parameters["@yesterdaysTasks"].Direction = ParameterDirection.Output;
            cmd.Parameters["@weekTasks"].Direction = ParameterDirection.Output;
            cmd.Parameters["@monthTasks"].Direction = ParameterDirection.Output;
            await connection.OpenAsync();
            int rowsAffected = await cmd.ExecuteNonQueryAsync();
            tasks.TodaysTasks = (int)cmd.Parameters["@todaysTasks"].Value;
            tasks.YesterdaysTasks = (int)cmd.Parameters["@yesterdaysTasks"].Value;
            tasks.WeekTasks = (int)cmd.Parameters["@weekTasks"].Value;
            tasks.MonthTasks = (int)cmd.Parameters["@monthTasks"].Value;
        }
        catch (Exception)
        {
            throw;
        }
        finally
        {
            await connection.CloseAsync();
        }
        return tasks;
    }

    public async Task<Request> GetRequestByStatus()
    {
        Request requests = new Request();
        MySqlConnection connection = new MySqlConnection(_connectionString);
        try
        {
            MySqlCommand cmd = new MySqlCommand("GetRequests", connection);
            cmd.CommandType = CommandType.StoredProcedure;
            cmd.Parameters.AddWithValue("@todaysRequests", MySqlDbType.Int32);
            cmd.Parameters.AddWithValue("@totalRequests", MySqlDbType.Int32);
            cmd.Parameters.AddWithValue("@cancelledRequests", MySqlDbType.Int32);
            cmd.Parameters.AddWithValue("@pendingRequests", MySqlDbType.Int32);
            cmd.Parameters.AddWithValue("@deliveredRequests", MySqlDbType.Int32);

            cmd.Parameters["@todaysRequests"].Direction = ParameterDirection.Output;
            cmd.Parameters["@totalRequests"].Direction = ParameterDirection.Output;
            cmd.Parameters["@cancelledRequests"].Direction = ParameterDirection.Output;
            cmd.Parameters["@pendingRequests"].Direction = ParameterDirection.Output;
            cmd.Parameters["@deliveredRequests"].Direction = ParameterDirection.Output;
            await connection.OpenAsync();
            int rowsAffected = await cmd.ExecuteNonQueryAsync();
            requests.TodaysRequests = (int)cmd.Parameters["@todaysRequests"].Value;
            requests.TotalRequests = (int)cmd.Parameters["@totalRequests"].Value;
            requests.TotalCancelled = (int)cmd.Parameters["@cancelledRequests"].Value;
            requests.TotalPending = (int)cmd.Parameters["@pendingRequests"].Value;
            requests.TotalDelivered = (int)cmd.Parameters["@deliveredRequests"].Value;
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

     public async Task<Material> GetMaterials()
    {
        Material materials = new Material();
        MySqlConnection connection = new MySqlConnection(_connectionString);
        try
        {
            MySqlCommand cmd = new MySqlCommand("GetTotalsAndCounts", connection);
            cmd.CommandType = CommandType.StoredProcedure;
            cmd.Parameters.AddWithValue("@Total Stocks", MySqlDbType.Int32);
            cmd.Parameters.AddWithValue("@Total Categories", MySqlDbType.Int32);
            cmd.Parameters.AddWithValue("@Total Materials", MySqlDbType.Int32);
            cmd.Parameters.AddWithValue("@Materials to Reorder", MySqlDbType.Int32);
            cmd.Parameters.AddWithValue("@Out of Stock Materials", MySqlDbType.Int32);

            cmd.Parameters["@Total Stocks"].Direction = ParameterDirection.Output;
            cmd.Parameters["@Total Categories"].Direction = ParameterDirection.Output;
            cmd.Parameters["@Total Materials"].Direction = ParameterDirection.Output;
            cmd.Parameters["@Materials to Reorder"].Direction = ParameterDirection.Output;
            cmd.Parameters["@Out of Stock Materials"].Direction = ParameterDirection.Output;
            await connection.OpenAsync();
            int rowsAffected = await cmd.ExecuteNonQueryAsync();
            materials.TotalStocks = (int)cmd.Parameters["@Total Stocks"].Value;
            materials.TotalCategories = (int)cmd.Parameters["@Total Categories"].Value;
            materials.TotalMaterials = (int)cmd.Parameters["@Total Materials"].Value;
            materials.MaterialsToReorder = (int)cmd.Parameters["@Materials to Reorder"].Value;
            materials.OutOFStockMaterials = (int)cmd.Parameters["@Out of Stock Materials"].Value;
        }
        catch (Exception)
        {
            throw;
        }
        finally
        {
            await connection.CloseAsync();
        }
        return materials;
    }

    public async Task<Supervisor> GetSupervisors()
    {
        Supervisor supervisor = null;
        MySqlConnection connection = new MySqlConnection(_connectionString);
        try
        {
            MySqlCommand cmd = new MySqlCommand("GetSupervisors", connection);
            cmd.CommandType = CommandType.StoredProcedure;
            cmd.Parameters.AddWithValue("@totalSupervisors", MySqlDbType.Int32);
            cmd.Parameters.AddWithValue("@topSupervisors", MySqlDbType.VarChar);     
            cmd.Parameters["@totalSupervisors"].Direction = ParameterDirection.Output;
            cmd.Parameters["@topSupervisors"].Direction = ParameterDirection.Output;    
            await connection.OpenAsync();
            MySqlDataReader reader = cmd.ExecuteReader();
            while (await reader.ReadAsync())
            {
                int totalSupervisors = int.Parse(reader["totalSupervisors"].ToString());
                string? topSupervisors = reader["topSupervisors"].ToString();
                
                supervisor = new Supervisor()
                {
                    TotalSupervisors=totalSupervisors,
                    TopSupervisors=topSupervisors
                };
            }
        }
        catch (Exception)
        {
            throw;
        }
        finally
        {
            await connection.CloseAsync();
        }
        return supervisor;
    }

    public async Task<SupervisorRequest> GetMaterialRequestBySupervisor(int supervisorId)
    {
        SupervisorRequest supervisorRequest = new SupervisorRequest();
        MySqlConnection connection = new MySqlConnection(_connectionString);
        try
        {
            MySqlCommand cmd = new MySqlCommand("GetMaterialRequestStatsBySupervisor", connection);
            cmd.CommandType = CommandType.StoredProcedure;
            cmd.Parameters.AddWithValue("@supervisor_id", supervisorId);
            cmd.Parameters.AddWithValue("@TotalRequestCount", MySqlDbType.Int32);
            cmd.Parameters.AddWithValue("@TopFrequentlyRequestedMaterials", MySqlDbType.VarChar);
            cmd.Parameters.AddWithValue("@HighestRequestInADay", MySqlDbType.Int32);
            
            cmd.Parameters["@TotalRequestCount"].Direction = ParameterDirection.Output;
            cmd.Parameters["@TopFrequentlyRequestedMaterials"].Direction = ParameterDirection.Output;
            cmd.Parameters["@HighestRequestInADay"].Direction = ParameterDirection.Output;
            await connection.OpenAsync();
            MySqlDataReader reader = cmd.ExecuteReader();
            while (await reader.ReadAsync())
            {
                int totalRequestCount = int.Parse(reader["TotalRequestCount"].ToString());
                int highestRequestInADay = int.Parse(reader["HighestRequestInADay"].ToString());
                string? topMaterials= reader["TopFrequentlyRequestedMaterials"].ToString();
                
                supervisorRequest = new SupervisorRequest()
                {
                    TotalRequestCount=totalRequestCount,
                    HighestRequestInADay=highestRequestInADay,
                    FrequentlyRequestedMaterial=topMaterials

                };
            }
        }
        catch (Exception)
        {
            throw;
        }
        finally
        {
            await connection.CloseAsync();
        }
        return supervisorRequest;
    }

    public async Task<OrderStatus> GetAllOrdersCountByStatus()
    {
        OrderStatus orders = new OrderStatus();
        MySqlConnection connection = new MySqlConnection(_connectionString);
        try
        {
            MySqlCommand cmd = new MySqlCommand("GetOrdersCounts", connection);
            cmd.CommandType = CommandType.StoredProcedure;
            cmd.Parameters.AddWithValue("@allOrders", MySqlDbType.Int32);
            cmd.Parameters.AddWithValue("@todaysOrders", MySqlDbType.Int32);
            cmd.Parameters.AddWithValue("@cancelledOrders", MySqlDbType.Int32);
            cmd.Parameters.AddWithValue("@pendingOrders", MySqlDbType.Int32);
            cmd.Parameters.AddWithValue("@completedOrders", MySqlDbType.Int32);

            cmd.Parameters["@allOrders"].Direction = ParameterDirection.Output;
            cmd.Parameters["@todaysOrders"].Direction = ParameterDirection.Output;
            cmd.Parameters["@cancelledOrders"].Direction = ParameterDirection.Output;
            cmd.Parameters["@pendingOrders"].Direction = ParameterDirection.Output;
            cmd.Parameters["@completedOrders"].Direction = ParameterDirection.Output;
            await connection.OpenAsync();
            int rowsAffected = await cmd.ExecuteNonQueryAsync();
            orders.TotalOrders = (int)cmd.Parameters["@allOrders"].Value;
            orders.TodaysOrders = (int)cmd.Parameters["@todaysOrders"].Value;
            orders.CancelledOrders = (int)cmd.Parameters["@cancelledOrders"].Value;
            orders.PendingOrders = (int)cmd.Parameters["@pendingOrders"].Value;
            orders.CompletedOrders = (int)cmd.Parameters["@completedOrders"].Value;
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
