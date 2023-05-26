using System.Collections;
using System.Net.Http.Headers;
using MaterialsService.Models;
namespace MaterialsService.Repositories.Interfaces;
public interface IMaterialRepository
{
    IEnumerable<Material> GetAll();
    Material Get(int materialId);
    bool Insert(Material material);
    bool Update(Material material);
    bool Delete(int materialId);
    Location GetLocation(int mid);
    IEnumerable<Material> GetByType(string type);
    IEnumerable<Material>GetOutOfStockMaterials();
    IEnumerable<Order>OrderedMaterialsInADay();
}