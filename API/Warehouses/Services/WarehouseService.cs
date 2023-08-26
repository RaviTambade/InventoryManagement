using Transflower.Warehouses.Models;
using Transflower.Warehouses.Repositories.Interfaces;
using Transflower.Warehouses.Services.Interfaces;
namespace Transflower.Warehouses.Services;
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
    public async Task<bool> Update(WarehouseStaff  warehouse) =>await _repo.Update(warehouse);
    public async Task<bool> UpdateStaff(List<WarehouseStaff> warehouse) =>await _repo.UpdateStaff(warehouse);
    public async Task<bool> Delete(int id) =>await _repo.Delete(id);
 
}