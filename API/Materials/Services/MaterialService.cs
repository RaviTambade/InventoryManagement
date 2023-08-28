using Transflower.Materials.Models;
using Transflower.Materials.Repositories.Interfaces;
using Transflower.Materials.Services.Interfaces;
namespace Transflower.Materials.Services;
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
    public async Task<bool> Update(int id,Material material) =>await _repo.Update(id, material);
    public async Task<bool> UpdateStock(int id,int quantity) =>await _repo.UpdateStock(id, quantity);
    public async Task<bool> Delete(int materialId) =>await _repo.Delete(materialId);
    public async Task<IEnumerable<Material>> GetMaterials(int id)=>await _repo.GetMaterials(id);
    public async Task<IEnumerable<Material>> GetOutOfStockMaterials()=>await _repo.GetOutOfStockMaterials();
    public async Task<IEnumerable<StockReport>> GetStockReports(int employeeId)=>await _repo.GetStockReports(employeeId);
    public async Task<IEnumerable<StockReport>> GetAllStockReports()=>await _repo.GetAllStockReports();
    public async Task<List<string>> GetCategories()=>await _repo.GetCategories();
    
}