using System.Security.Cryptography.X509Certificates;
using System.Collections.Generic;
using System.IO;
using System.Runtime.InteropServices.ComTypes;
using System.Collections;
using System.Data;
using Orders.Models;
using Orders.Repositories.Interfaces;
using MySql.Data.MySqlClient;
namespace Orders.Repositories;
public class OrderRepository : IOrderRepository
{

    private IConfiguration _configuration;
    private string _conString;
    public OrderRepository(IConfiguration configuration)
    {
        _configuration = configuration;
        _conString = this._configuration.GetConnectionString("DefaultConnection");
    }
    public async Task<IEnumerable<Order>> GetOrders(int empid)
    {

        List<Order> orders = new List<Order>();
        MySqlConnection con = new MySqlConnection(_conString);
        try
        {
            string query = "select min(r.id) as id,r.date,r.status, employees.userid from materialrequests r inner join materialrequestitems ri on r.id=ri.materialrequestid inner join shippingdetails s on ri.id =s.itemid inner join employees on r.supervisorid=employees.id  where r.status=1 and s.status=0 and ri.storemanagerid=@empid group by r.id;";
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

                Order order = new Order()
                {
                    Id = id,
                    Date = date,
                    Status = status,
                    UserId = userid
                };
                orders.Add(order);
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
        return orders;
    }

        public async Task<IEnumerable<Order>> GetCompletedOrders(int empid)
    {

        List<Order> orders = new List<Order>();
        MySqlConnection con = new MySqlConnection(_conString);
        try
        {
            string query = "select min(r.id) as id,s.date,r.status, employees.userid   from materialrequests r inner join materialrequestitems ri on r.id=ri.materialrequestid  inner join shipments s on s.id= r.id  inner join employees on r.supervisorid=employees.id  where r.status<>1 and ri.storemanagerid=@empid group by r.id ORDER BY r.id DESC";
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

                Order order = new Order()
                {
                    Id = id,
                    Date = date,
                    Status = status,
                    UserId = userid
                };
                orders.Add(order);
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
        return orders;
    }

   
    public async Task<IEnumerable<OrderDetails>> GetOrderDetails(int requestid,int storemanagerid)
    {
        List<OrderDetails> orderdetails = new List<OrderDetails>();
        MySqlConnection con = new MySqlConnection(_conString);
         try
        {
            string query = " select ri.id, s.status as itemstatus, r.date,r.status, materials.quantity as availablequantity, ri.quantity,materials.title, categories.category,departments.department,employees.userid,materials.imageurl  from materialrequestitems ri inner join materialrequests r on r.id = ri.materialrequestid  inner join materials on ri.materialid=materials.id  inner join categories on materials.categoryid=categories.id  inner join employees  on r.supervisorid = employees.id  inner join employees e on ri.storemanagerid= e.id  inner join shippingdetails s on ri.id = s.itemid inner join departments on departments.id= employees.departmentid  where r.id=@requestid and ri.storemanagerid=@empid";
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
                bool itemstatus = bool.Parse(reader["itemstatus"].ToString());
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
                    AvailableQuantity=availablequantity,
                    ItemStatus=itemstatus
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

 
     public async Task<bool> Approve(int id,int quantity)
    {
        bool status = false;
        MySqlConnection con = new MySqlConnection(_conString);
        try
        {
            string query = " update shippingdetails set status=1,quantity=@quantity where itemid=@itemid";
            MySqlCommand cmd = new MySqlCommand(query, con);
            cmd.Parameters.AddWithValue("@quantity", quantity);
            cmd.Parameters.AddWithValue("@itemid", id);
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