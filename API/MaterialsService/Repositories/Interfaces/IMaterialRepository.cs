using System.Threading.Tasks;
using System.Collections;
using System.Net.Http.Headers;
using MaterialsService.Models;
namespace MaterialsService.Repositories.Interfaces;
public interface IMaterialRepository
{
    Task<IEnumerable<Material>> GetAll();
    Task<Material> Get(int materialId);
    Task<string> GetImage(int materialId);

    Task<bool> Insert(Material material);
    Task<bool> Update(int id, int quantity);
    Task<bool> Delete(int materialId);
    Task<IEnumerable<Location>> GetLocations();

    Task<Location> GetLocation(int materialId);

    Task<IEnumerable<Material>> GetMaterials(int id);
    Task<IEnumerable<Material>> GetOutOfStockMaterials();
    Task<IEnumerable<StockReport>> GetStockReports(int empid);
    
    Task<IEnumerable<Material>> GetCategories();

}