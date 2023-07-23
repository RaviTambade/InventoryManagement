using Materials.Models;
using Materials.Repositories.Interfaces;
using Materials.Services.Interfaces;
namespace Materials.Services;
public class MaterialService : IMaterialService
{
    private readonly IMaterialRepository _repo;
    public MaterialService(IMaterialRepository repo)
    {
        _repo = repo;
    }
    public async Task<IEnumerable<Material>> GetAll() =>await _repo.GetAll();
    public async Task<Material> Get(int materialId) =>await _repo.Get(materialId);
    public async Task<string> GetImage(int materialId) =>await _repo.GetImage(materialId);

    public async Task<bool> Insert(Material material) =>await _repo.Insert(material);
    public async Task<bool> Update(Material material) =>await _repo.Update(material);
    public async Task<bool> Delete(int materialId) =>await _repo.Delete(materialId);
    public  async Task<IEnumerable<Location>> GetLocations()=>await _repo.GetLocations();

    public async Task<Location> GetLocation(int materialid)=> await _repo.GetLocation(materialid);

    public async Task<IEnumerable<Material>> GetMaterials(int id)=>await _repo.GetMaterials(id);
    public async Task<IEnumerable<Material>> GetOutOfStockMaterials()=>await _repo.GetOutOfStockMaterials();
    public async Task<IEnumerable<Material>> GetCategories()=>await _repo.GetCategories();
    
}