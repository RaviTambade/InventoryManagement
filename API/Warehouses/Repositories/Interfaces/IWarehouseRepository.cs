using System.Collections;
using Warehouses.Models;
namespace Warehouses.Repositories.Interfaces;
public interface IWarehouseRepository
{
    Task<IEnumerable<Warehouse>> GetAll();
    Task <Warehouse> GetById(int id);
    Task <bool> Insert(Warehouse warehouse);
    Task <bool> Update(Warehouse warehouse);
    Task <bool> Delete(int id);

}