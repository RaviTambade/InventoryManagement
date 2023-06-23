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
    public string GetImage(int materialId) => _repo.GetImage(materialId);

    public bool Insert(Material material) => _repo.Insert(material);
    public bool Update(Material material) => _repo.Update(material);
    public bool Delete(int materialId) => _repo.Delete(materialId);
    public  IEnumerable<Location> GetLocations()=> _repo.GetLocations();

    public  Location GetLocation(int materialid)=> _repo.GetLocation(materialid);

    public IEnumerable<Material> GetMaterials(int id)=> _repo.GetMaterials(id);
    public IEnumerable<Material> GetOutOfStockMaterials()=> _repo.GetOutOfStockMaterials();
    public IEnumerable<Material> GetCategories()=> _repo.GetCategories();
    
}