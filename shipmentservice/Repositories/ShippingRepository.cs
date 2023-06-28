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
    public IEnumerable<Shipping> GetShipments(int empid)
    {
        List<Shipping> shippings = new List<Shipping>();

        return shippings;
    }


}