using System.Collections;
using System.Threading.Tasks;
using WarehousesService.Models;
using WarehousesService.Repositories.Interfaces;
using WarehousesService.Services.Interfaces;
namespace WarehousesService.Services;
public class WarehouseService : IWarehouseService
{
    private readonly IWarehouseRepository _repo;
    public WarehouseService(IWarehouseRepository repo)
    {
        _repo = repo;
    }

}