using System.Security.Cryptography.X509Certificates;
using System.Collections.Generic;
using System.IO;
using System.Runtime.InteropServices.ComTypes;
using System.Collections;
using System.Data;
using shipmentservice.Models;
using shipmentservice.Repositories.Interfaces;
using MySql.Data.MySqlClient;
namespace shipmentservice.Repositories;
public class ShippingRepository : IShippingRepository
{
    private IConfiguration _configuration;
    private string _conString;
    public ShippingRepository(IConfiguration configuration)
    {
        _configuration = configuration;
        _conString = this._configuration.GetConnectionString("DefaultConnection");
    }


    //get cart Items of supervisors by sending supervisor's id
    public async Task<Shipping> GetShipments(int empid)
    {
        Shipping shipping = null;
        MySqlConnection con = new MySqlConnection(_conString);
        try
        {
            string query = "select s.id,s.date,departments.department ,r.id from shipments s inner join employees on employees.id=s.supervisorid inner join departments on employees.departmentid=departments.id inner join materialrequests r on s.materialrequestid=r.id where s.shipperid=@empid and r.status=3 or r.status=4 ORDER BY s.id DESC LIMIT 1";
            MySqlCommand cmd = new MySqlCommand(query, con);
            cmd.Parameters.AddWithValue("@empid", empid);
            await con.OpenAsync();
            MySqlDataReader reader = cmd.ExecuteReader();
            while (await reader.ReadAsync())
            {
                int id = Int32.Parse(reader["id"].ToString());
                DateTime date = DateTime.Parse(reader["date"].ToString());
                string department = reader["department"].ToString();

  
                shipping = new Shipping()
                {
                    Id = id,
                    Department = department,
                    Date = date,
                };

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
    
        return shipping;
    }

    public async Task<List<Shipping>> GetShipped(int empid)
    {
        List<Shipping> shippings = new List<Shipping>();
        MySqlConnection con = new MySqlConnection(_conString);
        try
        {
            string query = "select s.id,s.date,departments.department ,r.id from shipments s inner join employees on employees.id=s.supervisorid inner join departments on employees.departmentid=departments.id inner join materialrequests r on s.materialrequestid=r.id where  r.status=6 and s.shipperid=@empid";
            MySqlCommand cmd = new MySqlCommand(query, con);
            cmd.Parameters.AddWithValue("@empid", empid);
            await con.OpenAsync();
            MySqlDataReader reader = cmd.ExecuteReader();
            while (await reader.ReadAsync())
            {
                int id = Int32.Parse(reader["id"].ToString());
                DateTime date = DateTime.Parse(reader["date"].ToString());
                string department = reader["department"].ToString();

                Shipping shipping = new Shipping()
                {
                    Id = id,
                    Department = department,
                    Date = date,
                };

                shippings.Add(shipping);

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
    
        return shippings;
    }


    public async Task<List<ShippingDetails>> GetShippingDetails(int taskid)
    {
        List<ShippingDetails> shippingdetails = new List<ShippingDetails>();
        MySqlConnection con = new MySqlConnection(_conString);
        try
        {
            string query = "select sd.id as orderid,s.supervisorid ,s.id as taskid , sd.storemanagerid, materialrequests.status, warehousestaff.section,departments.department from shipments s inner join shippingdetails sd on s.id=sd.shipmentid inner join materialrequests on materialrequests.id=s.id inner join warehousestaff on warehousestaff.categoryid=sd.categoryid inner join employees on employees.id=s.supervisorid inner join departments on employees.departmentid=departments.id where s.id=@taskid";
            MySqlCommand cmd = new MySqlCommand(query, con);
            cmd.Parameters.AddWithValue("@taskid", taskid);
            await con.OpenAsync();
            MySqlDataReader reader = cmd.ExecuteReader();
            while (await reader.ReadAsync())
            {
                int orderid = Int32.Parse(reader["orderid"].ToString());
                int id = Int32.Parse(reader["taskid"].ToString());
                string section = reader["section"].ToString();
                string department = reader["department"].ToString();
                string status= reader["status"].ToString();
                int supervisorid = Int32.Parse(reader["supervisorid"].ToString());
                int storemanagerid = Int32.Parse(reader["storemanagerid"].ToString());              
  
                ShippingDetails details = new ShippingDetails()
                {
                    OrderId = orderid,
                    TaskId=id,
                    Department = department,
                    Section = section,
                    Status=status,
                    SupervisorId=supervisorid,
                    StoreManagerId=storemanagerid
                };

                shippingdetails.Add(details);

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
    
        return shippingdetails;
    }

        public async Task<bool> UpdateStatus(int id){
        bool status = false;
        MySqlConnection con = new MySqlConnection(_conString);
        try
        {
            string query = " update materialrequests set status=4 where id=@id";
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

        public async Task<bool> ShipmentDeliver(int id){
        bool status = false;
        MySqlConnection con = new MySqlConnection(_conString);
        try
        {
            string query = " update materialrequests set status=6 where id=@id";
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

        public async Task<List<TaskReport>> GetTaskReports(int empid,Period period){
         List<TaskReport> reports = new List<TaskReport>();
        MySqlConnection con = new MySqlConnection(_conString);
        try
        {
            string query = "select DAYNAME(date) AS date, COUNT(*) AS tasks from shipments  WHERE date >= @fromdate AND date <= @todate and shipments.shipperid=@empid GROUP BY DAYNAME(date) ORDER BY DAYNAME(date);";
            MySqlCommand cmd = new MySqlCommand(query, con);
            cmd.Parameters.AddWithValue("@empid", empid);
            cmd.Parameters.AddWithValue("@fromdate", period.FromDate);
            cmd.Parameters.AddWithValue("@todate", period.ToDate);
            await con.OpenAsync();
            MySqlDataReader reader = cmd.ExecuteReader();
            while (await reader.ReadAsync())
            {
                int tasks = Int32.Parse(reader["tasks"].ToString());
                string date = reader["date"].ToString();

                TaskReport report = new TaskReport()
                {
                    Tasks=tasks,
                    Date = date
                };

                reports.Add(report);

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
    
        return reports;
    }

}