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
        public IEnumerable<Order> GetOrders(int empid)
    {

        List<Order> orders = new List<Order>();
        MySqlConnection con = new MySqlConnection(_conString);
        try
        {
            string query = " select o.id,o.date,o.status, employees.firstname,employees.lastname from orders o inner join orderdetails on o.id=orderdetails.orderid inner join employees on orderdetails.storemanagerid=employees.id  where orderdetails.storemanagerid=@empid";
            MySqlCommand cmd = new MySqlCommand(query, con);
            cmd.Parameters.AddWithValue("@empid", empid);

            con.Open();
            MySqlDataReader reader = cmd.ExecuteReader();
            while (reader.Read())
            {
                int id = Int32.Parse(reader["id"].ToString());
                string? empfirstname = reader["firstname"].ToString();
                string? emplastname = reader["lastname"].ToString();
                DateTime orderdate = DateTime.Parse(reader["date"].ToString());
                string status = reader["status"].ToString();

                Order theOrder = new Order
                {
                    Id = id,
                    OrderDate = orderdate,
                    FirstName = empfirstname,
                    LastName = emplastname,
                    Status = status,
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

    public  IEnumerable<OrderDetails> GetOrderDetails(int orderid)
    {
        List<OrderDetails> orderdetails = new List<OrderDetails>();
        MySqlConnection con = new MySqlConnection(_conString);
         try
        {
            string query = "select orderdetails.id, orders.date,orders.status,materials.quantity as availablequantity, orderdetails.quantity,materials.title, categories.category,departments.department,employees.firstname, employees.lastname,materials.imageurl  from orderdetails   inner join orders on orders.id = orderdetails.orderid   inner join materials on orderdetails.materialid=materials.id   inner join categories on materials.categoryid=categories.id  inner join employees  on orders.supervisorid = employees.id inner join departments on departments.id= employees.departmentid  where  orders.id=@orderid";
            MySqlCommand cmd = new MySqlCommand(query, con);
            cmd.Parameters.AddWithValue("@orderid", orderid);
            ;
            con.Open();
            MySqlDataReader reader = cmd.ExecuteReader();
            while (reader.Read())
            {
                int id = Int32.Parse(reader["id"].ToString());
                DateTime orderdate = DateTime.Parse(reader["date"].ToString());
                string? status = reader["status"].ToString();
                string? materialname = reader["title"].ToString();
                string? category = reader["category"].ToString();
                int quantity = Int32.Parse(reader["quantity"].ToString());
                int availablequantity = Int32.Parse(reader["availablequantity"].ToString());
                string department = reader["department"].ToString();
                string firstname = reader["firstname"].ToString();
                string lastname = reader["lastname"].ToString();
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
                    EmployeeFirstName=firstname,
                    EmployeeLastName=lastname,
                    ImageUrl=imgurl,
                    AvailableQuantity=availablequantity
                };
                orderdetails.Add(order);
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
        return orderdetails;
    }

    //order history of store 
    public IEnumerable<OrderDetails> GetOrderDetailsForStore(int reqid)
    {
        List<OrderDetails> orders = new List<OrderDetails>();
        MySqlConnection con = new MySqlConnection(_conString);
        try
        {
            string query = "select orders.id, materials.quantity as availablequntity, orders.date,orders.status,orderdetails.materialid, orderdetails.quantity,materials.title, categories.category,departments.department,employees.firstname, employees.lastname,materials.imageurl  from orders inner join orderdetails on orders.orderdetailid = orderdetails.id    inner join materials on materials.id = orderdetails.materialid inner join employees on orderdetails.employeeid = employees.id inner join categories on categories.id = materials.categoryid  inner join departments on departments.id= employees.departmentid inner join requests on requests.id = orderdetails.requestid where  requestid=@requestid";
            MySqlCommand cmd = new MySqlCommand(query, con);
            cmd.Parameters.AddWithValue("@requestid", reqid);
            ;
            con.Open();
            MySqlDataReader reader = cmd.ExecuteReader();
            while (reader.Read())
            {
                int orderid = Int32.Parse(reader["id"].ToString());
                int materialid = Int32.Parse(reader["materialid"].ToString());
                DateTime orderdate = DateTime.Parse(reader["date"].ToString());
                string? status = reader["status"].ToString();
                string? materialname = reader["title"].ToString();
                string? category = reader["category"].ToString();
                int quantity = Int32.Parse(reader["quantity"].ToString());
                int availablequantity = Int32.Parse(reader["availablequntity"].ToString());
                string department = reader["department"].ToString();
                string firstname = reader["firstname"].ToString();
                string lastname = reader["lastname"].ToString();
                string imgurl = reader["imageurl"].ToString();

                

                OrderDetails orderdetails = new OrderDetails()
                {
                    Id = orderid,
                    MaterialId=materialid,
                    OrderDate = orderdate,
                    Status = status,
                    Name = materialname,
                    Category = category,
                    Quantity = quantity,
                    AvailableQuantity=availablequantity,
                    Department=department,
                    EmployeeFirstName=firstname,
                    EmployeeLastName=lastname,
                    ImageUrl=imgurl
                };

                orders.Add(orderdetails);

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

    

    //order history of supervisors 
    public IEnumerable<OrderDetails> GetAllOrders(int empid)
    {
        List<OrderDetails> orders = new List<OrderDetails>();
        MySqlConnection con = new MySqlConnection(_conString);
        try
        {
                string query = "select orders.id, orders.date,orders.status, orderdetails.quantity,materials.title, categories.category,departments.department,employees.firstname, employees.lastname,materials.imageurl from orders inner join orderdetails on orders.orderdetailid = orderdetails.id   inner join materials on orderdetails.materialid=materials.id    inner join categories on materials.categoryid=categories.id    inner join employees on orderdetails.employeeid = employees.id  inner join departments on departments.id= employees.departmentid inner join employees e2 on orders.employeeid = e2.id where  orders.employeeid=@empid";
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
                string? category = reader["category"].ToString();
                int quantity = Int32.Parse(reader["quantity"].ToString());
                string department = reader["department"].ToString();
                string firstname = reader["firstname"].ToString();
                string lastname = reader["lastname"].ToString();
                string imgurl = reader["imageurl"].ToString();

                

                OrderDetails orderdetails = new OrderDetails()
                {
                    Id = orderid,
                    OrderDate = orderdate,
                    Status = status,
                    Name = materialname,
                    Category = category,
                    Quantity = quantity,
                    Department=department,
                    EmployeeFirstName=firstname,
                    EmployeeLastName=lastname,
                    ImageUrl=imgurl
                };

                orders.Add(orderdetails);

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

    public bool Order(int empid)
    {
        bool status = false;

        MySqlConnection con = new MySqlConnection(_conString);
        try
        {
            string query = "call CreateOrder((select id from carts  where employeeid=@empid))";
            MySqlCommand cmd = new MySqlCommand(query, con);
            cmd.Parameters.AddWithValue("@empid", empid);

            con.Open();
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
            con.Close();
        }
        return status;
    }

   public bool DeleteOrder(int orderid)
    {
        bool status = false;

        MySqlConnection con = new MySqlConnection(_conString);
        try
        {
            string query = "delete from orderdetails where id=@id";
            MySqlCommand cmd = new MySqlCommand(query, con);
            cmd.Parameters.AddWithValue("@id", orderid);

            con.Open();
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
            con.Close();
        }
        return status;
    }

     public IEnumerable<RequestDetails> GetRequestDetails(int[] id)
    {
        List<RequestDetails> requests = new List<RequestDetails>();
        MySqlConnection con = new MySqlConnection(_conString);
        try
        {
            foreach(int rid in id ){
            string query = "select employees.firstname, employees.lastname ,requests.id,requests.date,requests.status from requests inner join employees on employees.id=requests.employeeid  inner join  departments on employees.departmentid=departments.id where requests.id =@reqid";
            MySqlCommand cmd = new MySqlCommand(query, con);
            cmd.Parameters.AddWithValue("@reqid", rid);
            con.Open();
            MySqlDataReader reader = cmd.ExecuteReader();
              while (reader.Read())
            {
                int reqid = Int32.Parse(reader["id"].ToString());
                DateTime orderdate = DateTime.Parse(reader["date"].ToString());
                string firstname = reader["firstname"].ToString();
                string lastname = reader["lastname"].ToString();
                string status = reader["status"].ToString();

                RequestDetails requestDetails = new RequestDetails()
                {
                    RequestId = reqid,
                    Date = orderdate,
                    Status = status,
                    EmployeeFirstName=firstname,
                    EmployeeLastName=lastname,
                };
              requests.Add(requestDetails);
            } 
             reader.Close();
            con.Close();


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
        return requests;
    }


    // public IEnumerable<Order> OrderedMaterialsInADay()
    // {
    //     List<Order> orders = new List<Order>();
    //     MySqlConnection con = new MySqlConnection(_conString);
    //     try
    //     {
    //         string query = "select orders.id,employees.firstname,employees.lastname, materials.id, materials.title, categories.category, orderdetails.quantity, orders.status  from orders  inner join materials on orders.orderdetailid = materials.id inner join categories on materials.categoryid = categories.id inner join employees on employees.id = orders.employeeid  inner join orderdetails on orders.orderdetailid=orderdetails.id WHERE orders.date >= CAST(CURRENT_TIMESTAMP AS date)";
    //         MySqlCommand cmd = new MySqlCommand(query, con);
    //         con.Open();
    //         MySqlDataReader reader = cmd.ExecuteReader();
    //         while (reader.Read())
    //         {
    //             int id = Int32.Parse(reader["id"].ToString());
    //             int materialId = Int32.Parse(reader["id"].ToString());
    //             string? empfirstname = reader["firstname"].ToString();
    //             string? emplastname = reader["lastname"].ToString();
    //             string? name = reader["title"].ToString();
    //             string? category = reader["category"].ToString();
    //             int quantity = Int32.Parse(reader["quantity"].ToString());
    //             string status = reader["status"].ToString();

    //             Order theOrder = new Order
    //             {
    //                 Id = id,
    //                 Name = name,
    //                 Category = category,
    //                 Quantity = quantity,
    //                 Status = status
    //             };
    //             orders.Add(theOrder);
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

    // public IEnumerable<Order> GetOrders(Period date)
    // {
    //     string fromDate = date.FromDate.ToString("yyyy-MM-dd");
    //     string toDate = date.ToDate.ToString("yyyy-MM-dd");
    //     List<Order> orders = new List<Order>();
    //     MySqlConnection con = new MySqlConnection(_conString);
    //     try
    //     {
    //         string query = "select orders.id, employees.firstname,employees.lastname, orders.date, orders.status, materials.id as materialid, materials.title, categories.category, orderdetails.quantity from orders inner join materials on orders.orderdetailid = materials.id  inner join employees on employees.id = orders.employeeid   inner join categories on categories.id = materials.categoryid  inner join orderdetails on orders.orderdetailid = orderdetails.id  WHERE (date BETWEEN @fromDate AND @ToDate)";
    //         MySqlCommand cmd = new MySqlCommand(query, con);
    //         cmd.Parameters.AddWithValue("@FromDate", fromDate);
    //         cmd.Parameters.AddWithValue("@ToDate", toDate);
    //         con.Open();
    //         MySqlDataReader reader = cmd.ExecuteReader();
    //         while (reader.Read())
    //         {
    //             int id = Int32.Parse(reader["id"].ToString());
    //             int materialId = Int32.Parse(reader["materialid"].ToString());
    //             string? name = reader["title"].ToString();
    //             string? category = reader["category"].ToString();
    //             string? empfirstname = reader["firstname"].ToString();
    //             string? emplastname = reader["lastname"].ToString();
    //             int quantity = Int32.Parse(reader["quantity"].ToString());
    //             DateTime orderdate = DateTime.Parse(reader["date"].ToString());
    //             string status = reader["status"].ToString();

    //             Order theOrder = new Order
    //             {
    //                 Id = id,
    //                 Name = name,
    //                 Category = category,
    //                 Quantity = quantity,
    //                 Status = status,
    //             };
    //             orders.Add(theOrder);
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


}