using Microsoft.AspNetCore.Mvc;
using WarehousesService.Models;
using WarehousesService.Services.Interfaces;

namespace WarehousesService.Controllers;

[ApiController]
 [Route("/api/[controller]")]
 public class WarehousesController : ControllerBase
{
 
  private readonly IWarehouseService _svc;
  public WarehousesController(IWarehouseService svc)
  {
      _svc = svc;
  }

  [HttpGet]
    [Route("warehouses")]
    public IEnumerable<Warehouse> Warehouse()
    {
        IEnumerable<Warehouse> warehouses = _svc.Get();
        return warehouses;
    }

}
