using System.Security.Cryptography.X509Certificates;
using System.Collections.Generic;
using System.IO;
using System.Runtime.InteropServices.ComTypes;
using System.Collections;
using System.Data;
using OrdersService.Models;
using OrdersService.Repositories.Interfaces;
using MySql.Data.MySqlClient;
namespace OrdersService.Repositories;
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
    public IEnumerable<Request> GetRequestDetails(int requestid)
    {
        List<Request> requests = new List<Request>();
        MySqlConnection con = new MySqlConnection(_conString);
        try
        {
            string query = "select orderdetails.id,o.requestid,requests.date, requests.status, orderdetails.materialid, categories.category, orderdetails.quantity from orders o inner join requests on requests.id=o.requestid inner join orderdetails on orderdetails.orderid= o.id inner join categories on categories.id=orderdetails.categoryid where o.requestid =@requestid";
            MySqlCommand cmd = new MySqlCommand(query, con);
            cmd.Parameters.AddWithValue("@requestid", requestid);
            
            con.Open();
            MySqlDataReader reader = cmd.ExecuteReader();
            while (reader.Read())
            {
                int orderid = Int32.Parse(reader["id"].ToString());
                int reqid = Int32.Parse(reader["requestid"].ToString());
                DateTime date = DateTime.Parse(reader["date"].ToString());
                int materialid = Int32.Parse(reader["materialid"].ToString());
                string category = reader["category"].ToString();
                int quantity = Int32.Parse(reader["quantity"].ToString());
                string status = reader["status"].ToString();

                Request request = new Request()
                {
                    OrderId = orderid,
                    RequestId = reqid,
                    Date = date,
                    MaterialId = materialid,
                    Category = category,
                    Quantity = quantity,
                    Status = status
                };

                requests.Add(request);

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
        return requests;
    }

    public CartItem GetCartItemFromRequest(int orderid)
    {
        CartItem cartItem = null;
        MySqlConnection con = new MySqlConnection(_conString);
        try
        {
            string query = "	select o.id, o.materialid, categories.category, o.quantity from orderdetails o inner join categories on categories.id=o.categoryid where o.id=@orderid";
            MySqlCommand cmd = new MySqlCommand(query, con);
            cmd.Parameters.AddWithValue("@orderid", orderid);
            con.Open();
            MySqlDataReader reader = cmd.ExecuteReader();
            while (reader.Read())
            {
                int id = Int32.Parse(reader["id"].ToString());
                int materialid = Int32.Parse(reader["materialid"].ToString());
                string category = reader["category"].ToString();
                int quantity = Int32.Parse(reader["quantity"].ToString());

                cartItem = new CartItem()
                {
                    Id = id,
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
        return cartItem;
    }

    public bool DeleteRequest(int requestid)
    {
        bool status = false;
        MySqlConnection con = new MySqlConnection(_conString);
        try
        {
            string query = "DELETE FROM requests WHERE id=@id";
            MySqlCommand cmd = new MySqlCommand(query, con);
            cmd.Parameters.AddWithValue("@id", requestid);
            con.Open();
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
            con.Close();
        }
        return status;
    }
    public IEnumerable<RequestDetails> GetAllRequests(int empid)
    {
        List<RequestDetails> requests = new List<RequestDetails>();
        MySqlConnection con = new MySqlConnection(_conString);
        try
        {
            string query = "select employees.firstname, employees.lastname ,requests.id,requests.date,requests.status from requests inner join employees on employees.id=requests.employeeid inner join  departments on employees.departmentid=departments.id where departments.id =(select departmentid from employees where employees.id=@empid)";
            MySqlCommand cmd = new MySqlCommand(query, con);
            cmd.Parameters.AddWithValue("@empid", empid);
            ;
            con.Open();
            MySqlDataReader reader = cmd.ExecuteReader();
            while (reader.Read())
            {
                int id = Int32.Parse(reader["id"].ToString());
                DateTime date = DateTime.Parse(reader["date"].ToString());
                string status = reader["status"].ToString();
                string firstname = reader["firstname"].ToString();
                string lastname = reader["lastname"].ToString();


                RequestDetails request = new RequestDetails()
                {
                    RequestId = id,
                    Date = date,
                    Status = status,
                    EmployeeFirstName = firstname,
                    EmployeeLastName = lastname
                };

                requests.Add(request);

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
        return requests;
    }

    
public IEnumerable<RequestDetails> GetAllRequest(int empid)
{
    List<RequestDetails> requests = new List<RequestDetails>();
    MySqlConnection con = new MySqlConnection(_conString);
    try
    {
        string query = "select employees.firstname, employees.lastname ,requests.id,requests.date,requests.status from requests inner join employees on employees.id=requests.employeeid inner join  departments on employees.departmentid=departments.id where employees.id=@empid;";
        MySqlCommand cmd = new MySqlCommand(query, con);
        cmd.Parameters.AddWithValue("@empid", empid);
        ;
        con.Open();
        MySqlDataReader reader = cmd.ExecuteReader();
        while (reader.Read())
        {
            int id = Int32.Parse(reader["id"].ToString());
            DateTime date = DateTime.Parse(reader["date"].ToString());
            string status = reader["status"].ToString();
            string firstname = reader["firstname"].ToString();
            string lastname = reader["lastname"].ToString();


            RequestDetails request = new RequestDetails()
            {
                RequestId = id,
                Date = date,
                Status = status,
                EmployeeFirstName = firstname,
                EmployeeLastName = lastname
            };

            requests.Add(request);

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
    return requests;
}
public bool UpdateQuantityOfRequestedCartItme(CartItem item)
{
    bool status = false;
    MySqlConnection con = new MySqlConnection(_conString);
    try
    {
        string query = "update orderdetails set quantity=@quantity where id=@id";
        MySqlCommand cmd = new MySqlCommand(query, con);
        cmd.Parameters.AddWithValue("@id", item.Id);
        cmd.Parameters.AddWithValue("@quantity", item.Quantity);
        con.Open();
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
        con.Close();
    }
    return status;
}

public IEnumerable<Request> GetRequestId(int empid)
{
    List<Request> requests = new List<Request>();
    MySqlConnection con = new MySqlConnection(_conString);
    try
    {
        string query = "SELECT DISTINCT C.requestid from orderdetails C inner join orders o on C.id= o.orderdetailid inner join employees e on o.employeeid=e.id where e.id=@empid";
        MySqlCommand cmd = new MySqlCommand(query, con);
        cmd.Parameters.AddWithValue("@empid", empid);
        ;
        con.Open();
        MySqlDataReader reader = cmd.ExecuteReader();
        while (reader.Read())
        {
            int reqid = Int32.Parse(reader["requestid"].ToString());


            Request request = new Request()
            {
                RequestId = reqid
            };

            requests.Add(request);

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
    return requests;
}


}