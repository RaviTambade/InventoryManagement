using System.Collections;
using System.Net.Http.Headers;
using InventoryManagement.Models;
namespace WarehouseService.Repositories.Interfaces;
public interface IWarehouseRepository
{
    IEnumerable<Material> GetAll();
    Material GetById(int materialId);
    bool Insert(Material material);
    bool Update(Material material);
    bool Delete(int materialId);
}