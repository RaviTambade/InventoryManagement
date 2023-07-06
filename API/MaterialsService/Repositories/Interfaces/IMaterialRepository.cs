using System.Collections;
using System.Net.Http.Headers;
using MaterialsService.Models;
namespace MaterialsService.Repositories.Interfaces;
public interface IMaterialRepository
{
    IEnumerable<Material> GetAll();
    Material Get(int materialId);
    string GetImage(int materialId);

    bool Insert(Material material);
    bool Update(Material material);
    bool Delete(int materialId);
     IEnumerable<Location> GetLocations();

    Location GetLocation(int materialId);

    IEnumerable<Material> GetMaterials(int id);
    IEnumerable<Material>GetOutOfStockMaterials();
    
    IEnumerable<Material>GetCategories();

}