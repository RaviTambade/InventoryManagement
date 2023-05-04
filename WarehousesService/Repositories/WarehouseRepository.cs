using System.IO;
using System.Runtime.InteropServices.ComTypes;
using System.Collections;
using System.Data;
using WarehousesService.Models;
using WarehousesService.Repositories.Interfaces;
using MySql.Data.MySqlClient;
namespace WarehousesService.Repositories;
public class WarehouseRepository : IWarehouseRepository
{
    private IConfiguration _configuration;
    private string _conString;
    public WarehouseRepository(IConfiguration configuration)
    {
        _configuration = configuration;
        _conString = this._configuration.GetConnectionString("DefaultConnection");
    }

}