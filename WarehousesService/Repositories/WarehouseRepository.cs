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
            string query = "select warehouses.warehouse_id, sections.section_id,floors.floor_id,materials.material_id, materials.material_type  FROM warehouses  INNER JOIN sections ON  warehouses.sections_id=  sections.section_id INNER JOIN floors ON  sections.floors_id=  floors.floor_id INNER JOIN materials ON  floors.mid = materials.material_id ";
            MySqlCommand cmd = new MySqlCommand(query, con);
            con.Open();
            MySqlDataReader reader = cmd.ExecuteReader();
            while (reader.Read())
            {
                int warehouse = Int32.Parse(reader["warehouse_id"].ToString());
                int section = Int32.Parse(reader["section_id"].ToString());
                int floor = Int32.Parse(reader["floor_id"].ToString());
                string material = reader["material_id"].ToString();
                int id = Int32.Parse(reader["material id "].ToString());

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