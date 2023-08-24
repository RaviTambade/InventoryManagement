using Warehouses.Models;
using Warehouses.Repositories.Interfaces;
using Warehouses.Services.Interfaces;
namespace Warehouses.Services;
public class WarehouseService : IWarehouseService
{
    private readonly IWarehouseRepository _repo;
    public WarehouseService(IWarehouseRepository repo)
    {
        _repo = repo;
    }
    public async Task<IEnumerable<WarehouseStaff>> GetAll() =>await _repo.GetAll();
    public async Task<List<int>> GetAllStoreManagers() =>await _repo.GetAllStoreManagers();
    public async Task<WarehouseStaff> GetById(int id) =>await _repo.GetById(id);

    public async Task<bool> Insert(WarehouseStaff warehouse) =>await _repo.Insert(warehouse);
    public async Task<bool> Update(WarehouseStaff warehouse) =>await _repo.Update(warehouse);
    public async Task<bool> Delete(int id) =>await _repo.Delete(id);
 
}