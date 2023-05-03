using System.Collections;
using System.Threading.Tasks;
using WarehouseService.Models;
using WarehouseService.Repositories.Interfaces;
using WarehouseService.Services.Interfaces;
namespace WarehouseService.Services;
public class WarehousesService : IWarehousesService
{
    private readonly IWarehouseRepository _repo;
    public WarehousesService(IWarehouseRepository repo)
    {
        _repo = repo;
    }
    public IEnumerable<Material> GetAll() =>_repo.GetAll();
    public Material GetById(int materialId) => _repo.GetById(materialId);
    public bool Insert(Material material) => _repo.Insert(material);
    public bool Update(int materialId,Material material) => _repo.Update(materialId,material);
    public bool Delete(int materialId) => _repo.Delete(materialId);
    public Location GetLocation(int mid)=> _repo.GetLocation(mid);

}