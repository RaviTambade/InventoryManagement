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

    // public IEnumerable<Order> OrdersHistory(int id)
    // {
    //     List<Order> orders = new List<Order>();
    //      MySqlConnection con = new MySqlConnection(_conString);
    //     try
    //     {
    //         string query = "select orders.order_id, employees.empfirst_name,employees.emplast_name, orders.order_date, orders.status, materials.material_id, materials.material_name, materials.material_type, orderdetails.quantity from orders inner join materials on orders.orderdetails_id = materials.material_id inner join orderdetails on orders.orderdetails_id = orderdetails.orderdetails_id inner join employees on employees.employee_id = orders.employee_id  where employees.employee_id=@employeeId; ";
    //         MySqlCommand command = new MySqlCommand(query, con);
    //         command.Parameters.AddWithValue("@employeeId", id);
    //         con.Open();
    //         MySqlDataReader reader = command.ExecuteReader();
    //         while (reader.Read())
    //         {
    //             int orderid = Int32.Parse(reader["order_id"].ToString());
    //             string? empfirstname = reader["empfirst_name"].ToString();
    //             string? emplastname = reader["emplast_name"].ToString();
    //             DateTime orderdate = DateTime.Parse(reader["order_date"].ToString());
    //             string? status = reader["status"].ToString();
    //             int materialid = Int32.Parse(reader["material_id"].ToString());
    //             string? materialname = reader["material_name"].ToString();
    //             string? matrialtype = reader["material_type"].ToString();
    //             int quantity = Int32.Parse(reader["quantity"].ToString());
                
    //             Order order = new Order()
    //             {
    //                 OrderId=orderid,
    //                 EmployeeFirstName=empfirstname,
    //                 EmployeeLastName=emplastname,
    //                 OrderDate=orderdate,
    //                 status=status,
    //                 MaterialId=materialid,
    //                 MaterialName=materialname,
    //                 MaterialType=matrialtype,
    //                 Quantity=quantity
    //             };

    //             orders.Add(order);

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
    //     return orders;
    // }

    // public IEnumerable<Order> OrdersHistory()
    // {
    //     List<Order> orders = new List<Order>();
    //      MySqlConnection con = new MySqlConnection(_conString);
    //     try
    //     {
    //         string query = "select orders.order_id, employees.empfirst_name,employees.emplast_name, orders.order_date, orders.status, materials.material_id, materials.material_name, materials.material_type, orderdetails.quantity from orders inner join materials on orders.orderdetails_id = materials.material_id inner join orderdetails on orders.orderdetails_id = orderdetails.orderdetails_id inner join employees on employees.employee_id = orders.employee_id ";
    //         MySqlCommand cmd = new MySqlCommand(query, con);
    //         con.Open();
    //         MySqlDataReader reader = cmd.ExecuteReader();
    //         while (reader.Read())
    //         {
    //             int orderid = Int32.Parse(reader["order_id"].ToString());
    //             string? empfirstname = reader["empfirst_name"].ToString();
    //             string? emplastname = reader["emplast_name"].ToString();
    //             DateTime orderdate = DateTime.Parse(reader["order_date"].ToString());
    //             string? status = reader["status"].ToString();
    //             int materialid = Int32.Parse(reader["material_id"].ToString());
    //             string? materialname = reader["material_name"].ToString();
    //             string? matrialtype = reader["material_type"].ToString();
    //             int quantity = Int32.Parse(reader["quantity"].ToString());
                
    //             Order order = new Order()
    //             {
    //                 OrderId=orderid,
    //                 EmployeeFirstName=empfirstname,
    //                 EmployeeLastName=emplastname,
    //                 OrderDate=orderdate,
    //                 status=status,
    //                 MaterialId=materialid,
    //                 MaterialName=materialname,
    //                 MaterialType=matrialtype,
    //                 Quantity=quantity
    //             };

    //             orders.Add(order);

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
    //     return orders;
    // }

    

       public IEnumerable<Order> OrderedMaterialsInADay(){
        List<Order> orders =new  List<Order>();
        MySqlConnection con = new MySqlConnection(_conString);
        try
        {
                string query = "select orders.id, materials.id, materials.title, categories.category, orderdetails.quantity, orders.status  from orders  inner join materials on orders.orderdetailid = materials.id inner join categories on materials.categoryid = categories.id  inner join orderdetails on orders.orderdetailid=orderdetails.id WHERE orders.date >= CAST(CURRENT_TIMESTAMP AS date)";
            MySqlCommand cmd = new MySqlCommand(query, con);
            con.Open();
            MySqlDataReader reader = cmd.ExecuteReader();
            while (reader.Read())
            {
                int id = Int32.Parse(reader["id"].ToString());
                int materialId = Int32.Parse(reader["id"].ToString());
                string? name = reader["title"].ToString();
                string? type = reader["category"].ToString();
                int quantity = Int32.Parse(reader["quantity"].ToString());
                string status =  reader["status"].ToString();
 
                Order theOrder = new Order
                {
                    Id = id,
                    MaterialId = materialId,
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
            string query = "select orders.id, employees.firstname,employees.lastname, orders.date, orders.status, materials.id, materials.title, categories.category, orderdetails.quantity from orders inner join materials on orders.orderdetailid = materials.id  inner join employees on employees.id = orders.employeeid   inner join categories on categories.id = materials.categoryid  inner join orderdetails on orders.orderdetailid = orderdetails.id  WHERE (date BETWEEN @fromDate AND @ToDate)";
            MySqlCommand cmd = new MySqlCommand(query, con);
            cmd.Parameters.AddWithValue("@FromDate", fromDate);
            cmd.Parameters.AddWithValue("@ToDate", toDate);

            con.Open();
            MySqlDataReader reader = cmd.ExecuteReader();
            while (reader.Read())
            {
                int id = Int32.Parse(reader["id"].ToString());
                int materialId = Int32.Parse(reader["id"].ToString());
                string? name = reader["title"].ToString();
                string? type = reader["category"].ToString();
                int quantity = Int32.Parse(reader["quantity"].ToString());
                string status =  reader["status"].ToString();
 
                Order theOrder = new Order
                {
                    Id = id,
                    MaterialId = materialId,
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

}