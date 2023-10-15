using Transflower.Materials.Models;
namespace Transflower.Materials.Repositories.Interfaces;
public interface IMaterialRepository
{
    Task<IEnumerable<Material>> GetAll();
    Task<int> GetTotalMaterialCount();
    Task<int> GetTotalCategoryCount();
    Task<Material> Get(int materialId);
    Task<string> GetImage(int materialId);

    Task<bool> Insert(Material material);
    Task<bool> Update(int id, Material material);
    Task<bool> UpdateStock(int id, int quantity);
    Task<bool> Delete(int materialId);
    Task<IEnumerable<Material>> GetMaterials(int id);
    Task<IEnumerable<Material>> GetOutOfStockMaterials(); 
    Task<List<string>> GetCategories();
    Task<IEnumerable<StockReport>> GetStockReports(int employeeId);
    Task<IEnumerable<StockReport>> GetAllStockReports();  

}