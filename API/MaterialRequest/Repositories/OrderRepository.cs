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
            string query = "select s.id,s.date,r.status,r.supervisorid as userid from shipments s inner join materialrequests r on r.id=s.materialrequestid inner join shippingdetails sd on sd.shipmentid=s.id where sd.storemanagerid=@empid";
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

        public async Task<IEnumerable<Request>> GetCompletedOrders(int empid)
    {

        List<Request> requests = new List<Request>();
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

   
    public async Task<IEnumerable<OrderDetails>> GetOrderDetails(int requestid)
    {
        List<OrderDetails> orderdetails = new List<OrderDetails>();
        MySqlConnection con = new MySqlConnection(_conString);
         try
        {
            string query = "select mri.id, m.quantity as availablequantity,q.shipperid as userid ,s.status as itemstatus, d.department,m.imageurl, c.category,m.title, mr.date,mri.quantity,mr.status from materialrequestitems mri inner join materialrequests mr on mr.id=mri.materialrequestid inner join shipments q on q.materialrequestid=mr.id inner join employees e on e.id=mr.supervisorid inner join departments d on e.departmentid=d.id inner join materials m on m.id=mri.materialid inner join categories c on c.id=mri.categoryid inner join shippingdetails s on s.itemid=mri.id where mri.materialrequestid=@requestId";
            MySqlCommand cmd = new MySqlCommand(query, con);
            cmd.Parameters.AddWithValue("@requestId", requestid);

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
                bool itemStatus = bool.Parse(reader["itemstatus"].ToString());
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
                    ItemStatus=itemStatus
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