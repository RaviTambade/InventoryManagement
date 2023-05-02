using System.Collections;
using System.Threading.Tasks;
using InventoryManagement.Models;
using InventoryManagement.Repositories.Interfaces;
using InventoryManagement.Services.Interfaces;
namespace InventoryManagement.Services;
public class WarehouseService : IWarehouseService
{
    private readonly IWarehouseRepository _repo;
    public WarehouseService(IWarehouseRepository repo)
    {
        _repo = repo;
    }
    public IEnumerable<Material> GetAll() =>_repo.GetAll();
    public Material GetById(int materialId) => _repo.GetById(materialId);
    public bool Insert(Material material) => _repo.Insert(material);
    public bool Update(int materialId,Material material) => _repo.Update(materialId,material);
    public bool Delete(int materialId) => _repo.Delete(materialId);

}