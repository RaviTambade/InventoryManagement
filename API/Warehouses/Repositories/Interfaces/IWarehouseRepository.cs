using System.Collections;
using Warehouses.Models;
namespace Warehouses.Repositories.Interfaces;
public interface IWarehouseRepository
{
    Task<IEnumerable<WarehouseStaff>> GetAll();
    Task<List<int>> GetAllStoreManagers();
    Task <WarehouseStaff> GetById(int id);
    Task <bool> Insert(WarehouseStaff warehouse);
    Task <bool> Update(WarehouseStaff warehouse);
    Task <bool> Delete(int id);

}