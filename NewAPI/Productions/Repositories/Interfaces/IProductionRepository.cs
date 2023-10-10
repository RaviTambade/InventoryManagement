using Transflower.Productions.Models;
namespace Transflower.Productions.Repositories.Interfaces;
public interface IProductionRepository
{
    Task<IEnumerable<ProductionStaff>> GetAll();
    

}