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
    //get cart items  of supervisors by sending request id
    // public async Task<IEnumerable<Request>> GetRequestDetails(int requestid)
    // {
    //     List<Request> requests = new List<Request>();
    //     MySqlConnection con = new MySqlConnection(_conString);
    //     try
    //     {
    //         string query = "select orderdetails.id, r.id as requestid,r.date, r.status, orderdetails.materialid, categories.category, orderdetails.quantity from requests r  inner join orderdetails on orderdetails.requestid= r.id  inner join categories on categories.id=orderdetails.categoryid  where r.id =@requestid";
    //         MySqlCommand cmd = new MySqlCommand(query, con);
    //         cmd.Parameters.AddWithValue("@requestid", requestid);
    //         await con.OpenAsync();
    //         MySqlDataReader reader = cmd.ExecuteReader();
    //         while (await reader.ReadAsync())
    //         {
    //             int orderid = Int32.Parse(reader["id"].ToString());
    //             int reqid = Int32.Parse(reader["requestid"].ToString());
    //             DateTime date = DateTime.Parse(reader["date"].ToString());
    //             int materialid = Int32.Parse(reader["materialid"].ToString());
    //             string category = reader["category"].ToString();
    //             int quantity = Int32.Parse(reader["quantity"].ToString());
    //             string status = reader["status"].ToString();

    //             Request request = new Request()
    //             {
    //                 OrderId = orderid,
    //                 RequestId = reqid,
    //                 Date = date,
    //                 MaterialId = materialid,
    //                 Category = category,
    //                 Quantity = quantity,
    //                 Status = status
    //             };

    //             requests.Add(request);

    //         }
    //         await reader.CloseAsync();
    //     }
    //     catch (Exception e)
    //     {
    //         throw e;
    //     }
    //     finally
    //     {
    //         await con.CloseAsync();
    //     }
    //     return requests;
    // }

    // public async Task<CartItem> GetCartItemFromRequest(int orderid)
    // {
    //     CartItem cartItem = null;
    //     MySqlConnection con = new MySqlConnection(_conString);
    //     try
    //     {
    //         string query = "	select o.id, o.materialid, categories.category, o.quantity from orderdetails o inner join categories on categories.id=o.categoryid where o.id=@orderid";
    //         MySqlCommand cmd = new MySqlCommand(query, con);
    //         cmd.Parameters.AddWithValue("@orderid", orderid);
    //         await con.OpenAsync();
    //         MySqlDataReader reader = cmd.ExecuteReader();
    //         while (await reader.ReadAsync())
    //         {
    //             int id = Int32.Parse(reader["id"].ToString());
    //             int materialid = Int32.Parse(reader["materialid"].ToString());
    //             string category = reader["category"].ToString();
    //             int quantity = Int32.Parse(reader["quantity"].ToString());

    //             cartItem = new CartItem()
    //             {
    //                 Id = id,
    //                 MaterialId = materialid,
    //                 Category = category,
    //                 Quantity = quantity,
    //             };
    //         }
    //         reader.Close();
    //     }
    //     catch (Exception e)
    //     {
    //         throw e;
    //     }
    //     finally
    //     {
    //         con.Close();
    //     }
    //     return cartItem;
    // }

    // public async Task<bool> DeleteRequest(int requestid)
    // {
    //     bool status = false;
    //     MySqlConnection con = new MySqlConnection(_conString);
    //     try
    //     {
    //         string query = "DELETE FROM requests WHERE id=@id";
    //         MySqlCommand cmd = new MySqlCommand(query, con);
    //         cmd.Parameters.AddWithValue("@id", requestid);
    //         await con.OpenAsync();
    //         int rowsAffected = cmd.ExecuteNonQuery();
    //         if (rowsAffected > 0)
    //         {
    //             status = true;
    //         }
    //     }
    //     catch (Exception e)
    //     {
    //         throw e;
    //     }
    //     finally
    //     {
    //         await con.CloseAsync();
    //     }
    //     return status;
    // }
   
   
    public async Task<List<Request>> GetAllRequests(int empid)
    {
        List<Request> requests = new List<Request>();
        MySqlConnection con = new MySqlConnection(_conString);
        try
        {
            string query = "select employees.userid ,r.id,r.date,r.status from materialrequests r inner join employees on employees.id=r.supervisorid  inner join  departments on employees.departmentid=departments.id where departments.id =(select departmentid from employees where employees.id=@empid)";
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

    
// public async Task<IEnumerable<RequestDetails>> GetAllRequest(int empid)
// {
//     List<RequestDetails> requests = new List<RequestDetails>();
//     MySqlConnection con = new MySqlConnection(_conString);
//     try
//     {
//         string query = "select employees.firstname, employees.lastname ,requests.id,requests.date,requests.status from requests inner join employees on employees.id=requests.supervisorid inner join  departments on employees.departmentid=departments.id where employees.id=@empid;";
//         MySqlCommand cmd = new MySqlCommand(query, con);
//         cmd.Parameters.AddWithValue("@empid", empid);
//         await con.OpenAsync();
//         MySqlDataReader reader = cmd.ExecuteReader();
//         while (await reader.ReadAsync())
//         {
//             int id = Int32.Parse(reader["id"].ToString());
//             DateTime date = DateTime.Parse(reader["date"].ToString());
//             string status = reader["status"].ToString();
//             string firstname = reader["firstname"].ToString();
//             string lastname = reader["lastname"].ToString();

//             RequestDetails request = new RequestDetails()
//             {
//                 RequestId = id,
//                 Date = date,
//                 Status = status,
//                 EmployeeFirstName = firstname,
//                 EmployeeLastName = lastname
//             };

//             requests.Add(request);

//         }
//         await reader.CloseAsync();
//     }
//     catch (Exception e)
//     {
//         throw e;
//     }
//     finally
//     {
//         await con.CloseAsync();
//     }
//     return requests;
// }

// public async Task<bool> UpdateQuantityOfRequestedCartItme(CartItem item)
// {
//     bool status = false;
//     MySqlConnection con = new MySqlConnection(_conString);
//     try
//     {
//         string query = "update orderdetails set quantity=@quantity where id=@id";
//         MySqlCommand cmd = new MySqlCommand(query, con);
//         cmd.Parameters.AddWithValue("@id", item.Id);
//         cmd.Parameters.AddWithValue("@quantity", item.Quantity);
//         await con.OpenAsync();
//         int rowsAffected = cmd.ExecuteNonQuery();
//         if (rowsAffected > 0)
//         {
//             status = true;
//         }
//     }
//     catch (Exception e)
//     {
//         throw e;
//     }
//     finally
//     {
//         await con.CloseAsync();
//     }
//     return status;
// }

// public async Task<IEnumerable<Request>> GetRequestId(int empid)
// {
//     List<Request> requests = new List<Request>();
//     MySqlConnection con = new MySqlConnection(_conString);
//     try
//     {
//         string query = "SELECT DISTINCT C.requestid from orderdetails C inner join orders o on C.id= o.orderdetailid inner join employees e on o.employeeid=e.id where e.id=@empid";
//         MySqlCommand cmd = new MySqlCommand(query, con);
//         cmd.Parameters.AddWithValue("@empid", empid);
//         await con.OpenAsync();
//         MySqlDataReader reader = cmd.ExecuteReader();
//         while (await reader.ReadAsync())
//         {
//             int reqid = Int32.Parse(reader["requestid"].ToString());

//             Request request = new Request()
//             {
//                 RequestId = reqid
//             };

//             requests.Add(request);

//         }
//         await reader.CloseAsync();
//     }
//     catch (Exception e)
//     {
//         throw e;
//     }
//     finally
//     {
//         await con.CloseAsync();
//     }
//     return requests;
// }


}