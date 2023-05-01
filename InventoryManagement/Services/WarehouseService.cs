using System.Collections;
using System.Threading.Tasks;
using InventoryManagement.Models;
using WarehouseService.Repositories.Interfaces;
using WarehouseService.Services.Interfaces;
namespace CatalogService.Services;
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
    public bool Update(Material material) => _repo.Update(material);
    public bool Delete(int materialId) => _repo.Delete(materialId);

}