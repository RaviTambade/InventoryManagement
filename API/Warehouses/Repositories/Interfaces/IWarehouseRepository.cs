using Transflower.Warehouses.Models;
namespace Transflower.Warehouses.Repositories.Interfaces;
public interface IWarehouseRepository
{
    Task<IEnumerable<WarehouseStaff>> GetAll();
    Task<List<int>> GetAllStoreManagers();
    Task <WarehouseStaff> GetById(int id);
    Task <bool> Insert(WarehouseStaff warehouse);
    Task <bool> Update(UpdateWarehouse  warehouse);
    Task <bool> UpdateStaff(List<WarehouseStaff> warehouse);
    Task <bool> Delete(int id);
}