using System.Collections;
using System.Net.Http.Headers;
using InventoryManagement.Models;
namespace InventoryManagement.Repositories.Interfaces;
public interface IWarehouseRepository
{
    IEnumerable<Material> GetAll();
    Material GetById(int materialId);
    bool Insert(Material material);
    bool Update(int materialId,Material material);
    bool Delete(int materialId);
}