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
public class OrderRepository : IOrderRepository
{

    private IConfiguration _configuration;
    private string _conString;
    public OrderRepository(IConfiguration configuration)
    {
        _configuration = configuration;
        _conString = this._configuration.GetConnectionString("DefaultConnection");
    }
    public async Task<IEnumerable<Request>> GetOrders(int empid)
    {

        List<Request> requests = new List<Request>();
        MySqlConnection con = new MySqlConnection(_conString);
        try
        {
            string query = "select min(r.id) as id,r.date,r.status, employees.userid from materialrequests r inner join materialrequestitems ri on r.id=ri.materialrequestid inner join employees on r.supervisorid=employees.id  where ri.storemanagerid=@empid group by r.id";
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

   
    public async Task<IEnumerable<OrderDetails>> GetOrderDetails(int requestid,int storemanagerid)
    {
        List<OrderDetails> orderdetails = new List<OrderDetails>();
        MySqlConnection con = new MySqlConnection(_conString);
         try
        {
            string query = "    select ri.id, r.date,r.status,materials.quantity as availablequantity, ri.quantity,materials.title, categories.category,departments.department,employees.userid,materials.imageurl from materialrequestitems ri inner join materialrequests r on r.id = ri.materialrequestid inner join materials on ri.materialid=materials.id inner join categories on materials.categoryid=categories.id  inner join employees  on r.supervisorid = employees.id inner join employees e on ri.storemanagerid= e.id inner join departments on departments.id= employees.departmentid  where r.id=@requestid and ri.storemanagerid=@empid";
            MySqlCommand cmd = new MySqlCommand(query, con);
            cmd.Parameters.AddWithValue("@requestid", requestid);
            cmd.Parameters.AddWithValue("@empid", storemanagerid);

            await con.OpenAsync();
            MySqlDataReader reader = cmd.ExecuteReader();
            while (await reader.ReadAsync())
            {
                int id = Int32.Parse(reader["id"].ToString());
                DateTime orderdate = DateTime.Parse(reader["date"].ToString());
                string? status = reader["status"].ToString();
                string? materialname = reader["title"].ToString();
                string? category = reader["category"].ToString();
                int quantity = Int32.Parse(reader["quantity"].ToString());
                int availablequantity = Int32.Parse(reader["availablequantity"].ToString());
                string department = reader["department"].ToString();
                int userid = Int32.Parse(reader["userid"].ToString());
                string imgurl = reader["imageurl"].ToString();

                OrderDetails order = new OrderDetails()
                {
                    Id = id,
                    OrderDate = orderdate,
                    Status = status,
                    Name = materialname,
                    Category = category,
                    Quantity = quantity,
                    Department=department,
                    UserId=userid,
                    ImageUrl=imgurl,
                    AvailableQuantity=availablequantity
                };
                orderdetails.Add(order);
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
        return orderdetails;
    }

 

}