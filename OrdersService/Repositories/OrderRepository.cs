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
public class OrderRepository : IOrderRepository
{
    private IConfiguration _configuration;
    private string _conString;
    public OrderRepository(IConfiguration configuration)
    {
        _configuration = configuration;
        _conString = this._configuration.GetConnectionString("DefaultConnection");
    }

    public Order OrdersHistory(int orderid)
    {
        Order order = null;
         MySqlConnection con = new MySqlConnection(_conString);
        try
        {
            string query = "select orders.id,employees.firstname,employees.lastname,orders.date, materials.id, materials.title, categories.category, orderdetails.quantity, orders.status  from orders  inner join materials on orders.orderdetailid = materials.id inner join categories on materials.categoryid = categories.id inner join employees on employees.id = orders.employeeid  inner join orderdetails on orders.orderdetailid=orderdetails.id where orders.id = @orderId ";
            MySqlCommand command = new MySqlCommand(query, con);
            command.Parameters.AddWithValue("@orderId", orderid);
            con.Open();
            MySqlDataReader reader = command.ExecuteReader();
            while (reader.Read())
            {
                int id = Int32.Parse(reader["id"].ToString());
                string? empfirstname = reader["firstname"].ToString();
                string? emplastname = reader["lastname"].ToString();
                DateTime orderdate = DateTime.Parse(reader["date"].ToString());
                string? status = reader["status"].ToString();
                int materialid = Int32.Parse(reader["id"].ToString());
                string? materialname = reader["title"].ToString();
                string? matrialtype = reader["category"].ToString();
                int quantity = Int32.Parse(reader["quantity"].ToString());
                
                order = new Order()
                {
                    Id=id,
                    Status=status,
                    Name=materialname,
                    Type=matrialtype,
                    Quantity=quantity
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
        return order;
    }


    //order history of supervisors id
    public IEnumerable<Order> GetOrdersHistory(int empid)
    {
        List<Order> orders = new List<Order>();
         MySqlConnection con = new MySqlConnection(_conString);
        try
        {
            string query = " select orderdetails.id, orders.date,orders.status, orderdetails.quantity, materials.title, categories.category from orders inner join orderdetails on orders.orderdetailid = orderdetails.id inner join materials on orderdetails.materialid=materials.id inner join categories on materials.categoryid=categories.id inner join employees on orderdetails.employeeid = employees.id where employees.id =@empid";
            MySqlCommand cmd = new MySqlCommand(query, con);
            cmd.Parameters.AddWithValue("@empid", empid);
;
            con.Open();
            MySqlDataReader reader = cmd.ExecuteReader();
            while (reader.Read())
            {
                int orderid = Int32.Parse(reader["id"].ToString());
                DateTime orderdate = DateTime.Parse(reader["date"].ToString());
                string? status = reader["status"].ToString();
                string? materialname = reader["title"].ToString();
                string? matrialtype = reader["category"].ToString();
                int quantity = Int32.Parse(reader["quantity"].ToString());
                
                Order order = new Order()
                {
                    Id=orderid,
                    OrderDate=orderdate,
                    Status=status,
                    Name=materialname,
                    Type=matrialtype,
                    Quantity=quantity
                };

                orders.Add(order);

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
        return orders;
    }

    public IEnumerable<Order> OrderedMaterialsInADay(){
        List<Order> orders =new  List<Order>();
        MySqlConnection con = new MySqlConnection(_conString);
        try
        {
            string query = "select orders.id,employees.firstname,employees.lastname, materials.id, materials.title, categories.category, orderdetails.quantity, orders.status  from orders  inner join materials on orders.orderdetailid = materials.id inner join categories on materials.categoryid = categories.id inner join employees on employees.id = orders.employeeid  inner join orderdetails on orders.orderdetailid=orderdetails.id WHERE orders.date >= CAST(CURRENT_TIMESTAMP AS date)";
            MySqlCommand cmd = new MySqlCommand(query, con);
            con.Open();
            MySqlDataReader reader = cmd.ExecuteReader();
            while (reader.Read())
            {
                int id = Int32.Parse(reader["id"].ToString());
                int materialId = Int32.Parse(reader["id"].ToString());
                string? empfirstname = reader["firstname"].ToString();
                string? emplastname = reader["lastname"].ToString();
                string? name = reader["title"].ToString();
                string? type = reader["category"].ToString();
                int quantity = Int32.Parse(reader["quantity"].ToString());
                string status =  reader["status"].ToString();
 
                Order theOrder = new Order
                {
                    Id = id,

                    Name=name,
                    Type = type,
                    Quantity = quantity,
                    Status =status
                };
                orders.Add(theOrder);
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
        return orders;
    }

    public IEnumerable<Order> GetOrders(Period date){
        string fromDate = date.FromDate.ToString("yyyy-MM-dd");   
        string toDate = date.ToDate.ToString("yyyy-MM-dd");  
        List<Order> orders =new  List<Order>();
        MySqlConnection con = new MySqlConnection(_conString);
        try
        {
            string query = "select orders.id, employees.firstname,employees.lastname, orders.date, orders.status, materials.id as materialid, materials.title, categories.category, orderdetails.quantity from orders inner join materials on orders.orderdetailid = materials.id  inner join employees on employees.id = orders.employeeid   inner join categories on categories.id = materials.categoryid  inner join orderdetails on orders.orderdetailid = orderdetails.id  WHERE (date BETWEEN @fromDate AND @ToDate)";
            MySqlCommand cmd = new MySqlCommand(query, con);
            cmd.Parameters.AddWithValue("@FromDate", fromDate);
            cmd.Parameters.AddWithValue("@ToDate", toDate);
            con.Open();
            MySqlDataReader reader = cmd.ExecuteReader();
            while (reader.Read())
            {
                int id = Int32.Parse(reader["id"].ToString());
                int materialId = Int32.Parse(reader["materialid"].ToString());
                string? name = reader["title"].ToString();
                string? type = reader["category"].ToString();
                string? empfirstname = reader["firstname"].ToString();
                string? emplastname = reader["lastname"].ToString();
                int quantity = Int32.Parse(reader["quantity"].ToString());
                DateTime orderdate = DateTime.Parse(reader["date"].ToString());
                string status =  reader["status"].ToString();
 
                Order theOrder = new Order
                {
                    Id = id,
                    Name=name,
                    Type = type,
                    Quantity = quantity,
                    Status =status,
                };
                orders.Add(theOrder);
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
        return orders;
    }
}