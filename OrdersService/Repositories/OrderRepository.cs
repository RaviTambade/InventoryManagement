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

    public IEnumerable<Order> OrdersHistory(int id)
    {
        List<Order> orders = new List<Order>();
         MySqlConnection connection = new MySqlConnection(_conString);
        try
        {
            string query = "select orders.order_id, employees.empfirst_name,employees.emplast_name, orders.order_date, orders.status, materials.material_id, materials.material_name, materials.material_type, orderdetails.quantity from orders inner join materials on orders.orderdetails_id = materials.material_id inner join orderdetails on orders.orderdetails_id = orderdetails.orderdetails_id inner join employees on employees.employee_id = orders.employee_id  where employees.employee_id=@employeeId; ";
            MySqlCommand command = new MySqlCommand(query, connection);
            command.Parameters.AddWithValue("@employeeId", id);
            connection.Open();
            MySqlDataReader reader = command.ExecuteReader();
            while (reader.Read())
            {
                int orderid = Int32.Parse(reader["order_id"].ToString());
                string? empfirstname = reader["empfirst_name"].ToString();
                string? emplastname = reader["emplast_name"].ToString();
                DateTime orderdate = DateTime.Parse(reader["order_date"].ToString());
                string? status = reader["status"].ToString();
                int materialid = Int32.Parse(reader["material_id"].ToString());
                string? materialname = reader["material_name"].ToString();
                string? matrialtype = reader["material_type"].ToString();
                int quantity = Int32.Parse(reader["quantity"].ToString());
                
                Order order = new Order()
                {
                    OrderId=orderid,
                    EmployeeFirstName=empfirstname,
                    EmployeeLastName=emplastname,
                    OrderDate=orderdate,
                    status=status,
                    MaterialId=materialid,
                    MaterialName=materialname,
                    MaterialType=matrialtype,
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
            connection.Close();
        }
        return orders;
    }

    public IEnumerable<Order> AllOrdersHistory()
    {
        List<Order> orders = new List<Order>();
         MySqlConnection connection = new MySqlConnection(_conString);
        try
        {
            string query = "select orders.order_id, employees.empfirst_name,employees.emplast_name, orders.order_date, orders.status, materials.material_id, materials.material_name, materials.material_type, orderdetails.quantity from orders inner join materials on orders.orderdetails_id = materials.material_id inner join orderdetails on orders.orderdetails_id = orderdetails.orderdetails_id inner join employees on employees.employee_id = orders.employee_id ";
            MySqlCommand command = new MySqlCommand(query, connection);
            connection.Open();
            MySqlDataReader reader = command.ExecuteReader();
            while (reader.Read())
            {
                int orderid = Int32.Parse(reader["order_id"].ToString());
                string? empfirstname = reader["empfirst_name"].ToString();
                string? emplastname = reader["emplast_name"].ToString();
                DateTime orderdate = DateTime.Parse(reader["order_date"].ToString());
                string? status = reader["status"].ToString();
                int materialid = Int32.Parse(reader["material_id"].ToString());
                string? materialname = reader["material_name"].ToString();
                string? matrialtype = reader["material_type"].ToString();
                int quantity = Int32.Parse(reader["quantity"].ToString());
                
                Order order = new Order()
                {
                    OrderId=orderid,
                    EmployeeFirstName=empfirstname,
                    EmployeeLastName=emplastname,
                    OrderDate=orderdate,
                    status=status,
                    MaterialId=materialid,
                    MaterialName=materialname,
                    MaterialType=matrialtype,
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
            connection.Close();
        }
        return orders;
    }

    public TheTask TaskDetails()
    {
         TheTask task =new TheTask();
         MySqlConnection connection = new MySqlConnection(_conString);
        try
        {
            string query = "select orders.order_id, employees.empfirst_name,employees.emplast_name, orders.order_date, orders.status, materials.material_id, materials.material_name, materials.material_type, orderdetails.quantity from orders inner join materials on orders.orderdetails_id = materials.material_id inner join orderdetails on orders.orderdetails_id = orderdetails.orderdetails_id inner join employees on employees.employee_id = orders.employee_id ";
            MySqlCommand command = new MySqlCommand(query, connection);
            connection.Open();
            MySqlDataReader reader = command.ExecuteReader();
            while (reader.Read())
            {
                int orderid = Int32.Parse(reader["order_id"].ToString());
                string? empfirstname = reader["empfirst_name"].ToString();
                string? emplastname = reader["emplast_name"].ToString();
                string? status = reader["status"].ToString();
                int materialid = Int32.Parse(reader["material_id"].ToString());
                string? materialname = reader["material_name"].ToString();
                string? matrialtype = reader["material_type"].ToString();
                int quantity = Int32.Parse(reader["quantity"].ToString());
                
                 task = new TheTask()
                {
                    EmployeeFirstName=empfirstname,
                    EmployeeLastName=emplastname,
                    MaterialId=materialid,
                    MaterialName=materialname,
                    MaterialType=matrialtype,
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
            connection.Close();
        }
        return task;
    }

    public IEnumerable<TheTask> AllTasks(int id)
    {
        List<TheTask> tasks =new List<TheTask>();
         MySqlConnection connection = new MySqlConnection(_conString);
        try
        {
            string query ="Select  employees.empfirst_name,employees.emplast_name, materials.material_id, materials.material_name, materials.material_type, orderdetails.quantity from orderdetails   inner join materials on orderdetails.material_id = materials.material_id  inner join employees on orderdetails.assigned_worker_id = employees.employee_id where employees.employee_id=@employeeId";
            MySqlCommand command = new MySqlCommand(query, connection);
            command.Parameters.AddWithValue("@employeeId", id);
            connection.Open();
            MySqlDataReader reader = command.ExecuteReader();
            while (reader.Read())
            {
                string? empfirstname = reader["empfirst_name"].ToString();
                string? emplastname = reader["emplast_name"].ToString();
                int materialid = Int32.Parse(reader["material_id"].ToString());
                string? materialname = reader["material_name"].ToString();
                string? matrialtype = reader["material_type"].ToString();
                int quantity = Int32.Parse(reader["quantity"].ToString());
                
                TheTask task = new TheTask()
                {
                    EmployeeFirstName=empfirstname,
                    EmployeeLastName=emplastname,
                    MaterialId=materialid,
                    MaterialName=materialname,
                    MaterialType=matrialtype,
                    Quantity=quantity
                };
                tasks.Add(task);
            }
            reader.Close();
        }
        catch (Exception e)
        {
            throw e;
        }
        finally
        {
            connection.Close();
        }
        return tasks;
    }

}