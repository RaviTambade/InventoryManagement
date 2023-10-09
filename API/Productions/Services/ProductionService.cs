using Transflower.Productions.Models;
using Transflower.Productions.Repositories.Interfaces;
using Transflower.Productions.Services.Interfaces;
namespace Transflower.Productions.Services;
public class ProductionService : IProductionService
{
    private readonly IProductionRepository _repo;
    public ProductionService(IProductionRepository repo)
    {
        _repo = repo;
    }
    public async Task<IEnumerable<ProductionStaff>> GetAll() => await _repo.GetAll();
}