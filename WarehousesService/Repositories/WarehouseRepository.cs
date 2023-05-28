using WarehousesService.Models;
using WarehousesService.Repositories.Interfaces;
using MySql.Data.MySqlClient;
using Microsoft.AspNetCore.Mvc;

namespace WarehousesService.Repositories;

[ApiController]
[Route("/api/[controller]")]
public class WarehousesRepository : IWarehouseRepository
{
    private IConfiguration _configuration;
    private string _conString;
    public WarehousesRepository(IConfiguration configuration)
    {
        _configuration = configuration;
        _conString = this._configuration.GetConnectionString("DefaultConnection");
    }

    [HttpGet]
    [Route("warehouses")]
    public IEnumerable<Warehouse> Get()
    {
        List<Warehouse> warehouses = new List<Warehouse>();
        MySqlConnection con = new MySqlConnection(_conString);
        try
        {
            string query = "select warehouses.id, sections.id,floors.id,materials.id, materials.type  FROM warehouses  INNER JOIN sections ON  warehouses.sectionsid=  sections.id INNER JOIN floors ON  sections.floorsid= floors.id INNER JOIN materials ON  floors.materialid = materials.id ";
            MySqlCommand cmd = new MySqlCommand(query, con);
            con.Open();
            MySqlDataReader reader = cmd.ExecuteReader();
            while (reader.Read())
            {
                int warehouse = Int32.Parse(reader["warehouseid"].ToString());
                int section = Int32.Parse(reader["sectionid"].ToString());
                int floor = Int32.Parse(reader["floorid"].ToString());
                string material = reader["materialid"].ToString();
                int id = Int32.Parse(reader[" id "].ToString());

                Warehouse TheWarehouse = new Warehouse
                {
                    warehouseId = warehouse,
                    SectionId = section,
                    FloorId = floor,
                    Material = material,
                    MaterialId = id
                };

                warehouses.Add(TheWarehouse);
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

        return warehouses;
    }
}