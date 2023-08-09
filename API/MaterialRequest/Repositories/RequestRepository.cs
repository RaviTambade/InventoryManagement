using System.Security.Cryptography.X509Certificates;
using System.Collections.Generic;
using System.IO;
using System.Runtime.InteropServices.ComTypes;
using System.Collections;
using System.Data;
using MaterialRequest.Models;
using MaterialRequest.Repositories.Interfaces;
using MySql.Data.MySqlClient;
namespace MaterialRequest.Repositories;
public class RequestRepository : IRequestRepository
{
    private IConfiguration _configuration;
    private string _conString;
    public RequestRepository(IConfiguration configuration)
    {
        _configuration = configuration;
        _conString = this._configuration.GetConnectionString("DefaultConnection");
    }

    //  get requested items  of supervisors by sending request id
    public async Task<List<RequestDetails>> GetRequestDetails(int requestid)
    {
        List<RequestDetails> requests = new List<RequestDetails>();
        MySqlConnection con = new MySqlConnection(_conString);
        try
        {
            string query = "select ri.id,r.date, r.status, ri.materialid, categories.category, ri.quantity from materialrequests r  inner join materialrequestitems ri on ri.materialrequestid= r.id   inner join categories on categories.id=ri.categoryid  where r.id=@requestid";
            MySqlCommand cmd = new MySqlCommand(query, con);
            cmd.Parameters.AddWithValue("@requestid", requestid);
            await con.OpenAsync();
            MySqlDataReader reader = cmd.ExecuteReader();
            while (await reader.ReadAsync())
            {
                int id = Int32.Parse(reader["id"].ToString());
                DateTime date = DateTime.Parse(reader["date"].ToString());
                int materialid = Int32.Parse(reader["materialid"].ToString());
                string category = reader["category"].ToString();
                int quantity = Int32.Parse(reader["quantity"].ToString());
                string status = reader["status"].ToString();

                RequestDetails request = new RequestDetails()
                {
                    Id = id,
                    Date = date,
                    MaterialId = materialid,
                    Category = category,
                    Quantity = quantity,
                    Status = status
                };

                requests.Add(request);

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
        return requests;
    }

    public async Task<RequestDetails> GetItem(int id)
    {
        RequestDetails item = null;
        MySqlConnection con = new MySqlConnection(_conString);
        try
        {
            string query = "select ri.id,r.date, r.status, ri.materialid, categories.category, ri.quantity from materialrequests r  inner join materialrequestitems ri on ri.materialrequestid= r.id   inner join categories on categories.id=ri.categoryid  where ri.id=@id";
            MySqlCommand cmd = new MySqlCommand(query, con);
            cmd.Parameters.AddWithValue("@id", id);
            await con.OpenAsync();
            MySqlDataReader reader = cmd.ExecuteReader();
            while (await reader.ReadAsync())
            {
                int rid = Int32.Parse(reader["id"].ToString());
                int materialid = Int32.Parse(reader["materialid"].ToString());
                string category = reader["category"].ToString();
                int quantity = Int32.Parse(reader["quantity"].ToString());

                item = new RequestDetails()
                {
                    Id = rid,
                    MaterialId = materialid,
                    Category = category,
                    Quantity = quantity,
                };

            }
            reader.Close();
        }
        catch (Exception e)
        {
            throw e;
        }
        finally
        {
            con.Close();
        }
        return item;
    }

    public async Task<bool> DeleteRequest(int requestid)
    {
        bool status = false;
        MySqlConnection con = new MySqlConnection(_conString);
        try
        {
            string query = "DELETE FROM materialrequests WHERE id=@id";
            MySqlCommand cmd = new MySqlCommand(query, con);
            cmd.Parameters.AddWithValue("@id", requestid);
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
    public async Task<List<Request>> GetRequests(int storemanagerid)
    {
        List<Request> requests = new List<Request>();
        MySqlConnection con = new MySqlConnection(_conString);
        try
        {
            string query = "select r.id,r.date,r.status, employees.userid from materialrequests r inner join materialrequestitems rt on r.id=rt.materialrequestid inner join employees on r.supervisorid=employees.id  where rt.storemanagerid=@empid)";
            MySqlCommand cmd = new MySqlCommand(query, con);
            cmd.Parameters.AddWithValue("@empid", storemanagerid);
            await con.OpenAsync();
            MySqlDataReader reader = cmd.ExecuteReader();
            while (await reader.ReadAsync())
            {
                int id = Int32.Parse(reader["id"].ToString());
                int userid = Int32.Parse(reader["userid"].ToString());
                DateTime date = DateTime.Parse(reader["date"].ToString());
                string status = reader["status"].ToString();

                Request request = new Request()
                {
                    Id = id,
                    Date = date,
                    Status = status,
                    UserId = userid
                };

                requests.Add(request);

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
        return requests;
    }
    public async Task<List<Request>> GetAllRequests(int empid)
    {
        List<Request> requests = new List<Request>();
        MySqlConnection con = new MySqlConnection(_conString);
        try
        {
            string query = "select employees.userid ,r.id,r.date,r.status from materialrequests r inner join employees on employees.id=r.supervisorid  inner join  departments on employees.departmentid=departments.id where departments.id =(select departmentid from employees where employees.id=@empid) ORDER BY r.id DESC";
            MySqlCommand cmd = new MySqlCommand(query, con);
            cmd.Parameters.AddWithValue("@empid", empid);
            await con.OpenAsync();
            MySqlDataReader reader = cmd.ExecuteReader();
            while (await reader.ReadAsync())
            {
                int id = Int32.Parse(reader["id"].ToString());
                int userid = Int32.Parse(reader["userid"].ToString());
                DateTime date = DateTime.Parse(reader["date"].ToString());
                string status = reader["status"].ToString();

                Request request = new Request()
                {
                    Id = id,
                    Date = date,
                    Status = status,
                    UserId = userid
                };

                requests.Add(request);

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
        return requests;
    }
    public async Task<bool> Request(int empid)
    {
        bool status = false;
        MySqlConnection con = new MySqlConnection(_conString);
        try
        {
            string query = "call CreateOrder((select id from initialrequest  where employeeid=@empid))";
            MySqlCommand cmd = new MySqlCommand(query, con);
            cmd.Parameters.AddWithValue("@empid", empid);

            await con.OpenAsync();
            int rowsAffected = cmd.ExecuteNonQuery();
            con.Close();
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

    public async Task<bool> UpdateItem(RequestDetails item)
    {
        bool status = false;
        MySqlConnection con = new MySqlConnection(_conString);
        try
        {
            string query = "update materialrequestitems set quantity=@quantity where id=@id";
            MySqlCommand cmd = new MySqlCommand(query, con);
            cmd.Parameters.AddWithValue("@id", item.Id);
            cmd.Parameters.AddWithValue("@quantity", item.Quantity);
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
    public async Task<bool> DeleteItem(int id)
    {
        bool status = false;
        MySqlConnection con = new MySqlConnection(_conString);
        try
        {
            string query = "DELETE FROM materialrequestitems WHERE id=@id";
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

    public async Task<bool> CancelRequest(int requestid)
    {
        bool status = false;
        MySqlConnection con = new MySqlConnection(_conString);
        try
        {
            string query = " Update  materialrequests set status=7 WHERE id=@id";
            MySqlCommand cmd = new MySqlCommand(query, con);
            cmd.Parameters.AddWithValue("@id", requestid);
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
  
    public async Task<List<RequestReport>> WeeklyRequests(int empid,Period period)
    {
        List<RequestReport> requests = new List<RequestReport>();
        MySqlConnection con = new MySqlConnection(_conString);
        try
        {
            string query = "SELECT DAYNAME(date) AS day, COUNT(*) AS requests FROM materialrequests WHERE date >= @FromDate AND date <= @ToDate and materialrequests.supervisorid=@empid GROUP BY DAYNAME(date) ORDER BY DAYNAME(date)";
            MySqlCommand cmd = new MySqlCommand(query, con);
            cmd.Parameters.AddWithValue("@empid", empid);
            cmd.Parameters.AddWithValue("@FromDate", period.FromDate);
            cmd.Parameters.AddWithValue("@ToDate", period.ToDate);
            await con.OpenAsync();
            MySqlDataReader reader = cmd.ExecuteReader();
            while (await reader.ReadAsync())
            {
                int therequest = Int32.Parse(reader["requests"].ToString());
                string theperiod = reader["day"].ToString();

                RequestReport request = new RequestReport()
                {
                    Period=theperiod,
                    Requests=therequest
                };

                requests.Add(request);

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
        return requests;
    }


    public async Task<List<RequestReport>> MonthlyRequests(int empid,Period period)
    {
       List<RequestReport> requests = new List<RequestReport>();
        MySqlConnection con = new MySqlConnection(_conString);
        try
        {
            string query = "SELECT WEEK(date) AS week, COUNT(*) AS requests_count FROM  materialrequests WHERE date >=@FromDate AND date <= @ToDate AND supervisorid = @empid GROUP BY YEAR(date), WEEK(date);";
            MySqlCommand cmd = new MySqlCommand(query, con);
            cmd.Parameters.AddWithValue("@empid", empid);
            cmd.Parameters.AddWithValue("@FromDate", period.FromDate);
            cmd.Parameters.AddWithValue("@ToDate", period.ToDate);
            await con.OpenAsync();
            MySqlDataReader reader = cmd.ExecuteReader();
            while (await reader.ReadAsync())
            {
                int therequest = Int32.Parse(reader["requests_count"].ToString());
                string theperiod = reader["week"].ToString();

                RequestReport request = new RequestReport()
                {
                    Period=theperiod,
                    Requests=therequest
                };
                requests.Add(request);

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

        return requests;
    }
 
}