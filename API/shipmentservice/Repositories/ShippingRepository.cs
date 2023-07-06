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
    public async Task<IEnumerable<Shipping>> GetShipments(int empid)
    {
        List<Shipping> shippings = new List<Shipping>();
        MySqlConnection con = new MySqlConnection(_conString);
        try
        {
            string query = "select s.id,s.date,departments.department from shipments s inner join employees on employees.id=s.supervisorid inner join departments on employees.departmentid=departments.id where s.shipperid=@empid";
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


}