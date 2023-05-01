using System.Runtime.InteropServices.ComTypes;
using System.Collections;
using System.Data;
using InventoryManagement.Models;
using WarehouseService.Repositories.Interfaces;
using MySql.Data.MySqlClient;
namespace WarehouseService.Repositories;
public class WarehouseRepository : IWarehouseRepository
{
    
    public WarehouseRepository()
    {

    }
    public  IEnumerable<Material> GetAll()
    {
       List<Material> materials = new List<Material>();
       return materials;
    }
    public Material GetById(int materialId)
    {
       Material material = new Material();
       return material;
    }
    public bool Insert(Material material)
    {
        bool status = false;
        return status;
    }
    public bool Update(Material material)
    {
        bool status = false;
        return status;
    }
    public bool Delete(int materialId)
    {
        bool status = false;
        return status;
    }

}