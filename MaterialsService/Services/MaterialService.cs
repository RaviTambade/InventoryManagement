using MaterialsService.Models;
using MaterialsService.Repositories.Interfaces;
using MaterialsService.Services.Interfaces;
namespace MaterialsService.Services;
public class MaterialService : IMaterialService
{
    private readonly IMaterialRepository _repo;
    public MaterialService(IMaterialRepository repo)
    {
        _repo = repo;
    }
    public IEnumerable<Material> GetAll() =>_repo.GetAll();
    public Material Get(int materialId) => _repo.Get(materialId);
    public bool Insert(Material material) => _repo.Insert(material);
    public bool Update(Material material) => _repo.Update(material);
    public bool Delete(int materialId) => _repo.Delete(materialId);
    public Location GetLocation(int mid)=> _repo.GetLocation(mid);
    public IEnumerable<Material> GetByType(string type)=> _repo.GetByType(type);

}