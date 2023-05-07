using Microsoft.AspNetCore.Mvc;
using WarehousesService.Models;
namespace WarehousesService.Controllers;

[ApiController]
[Route("[controller]")]
public class WarehousesController : ControllerBase
{
 
    public WarehousesController()
    {
        
    }

     [HttpGet]
        [Route("")]
        public IEnumerable<Warehouse> GetAllWarehouses()
        {
            IEnumerable<Warehouse> warehouses = new IEnumerable<Warehouse>();
            return warehouses;
        }

        [HttpGet]
        [Route("")]
        public  GetAllSections()
        {
            
        }

          [HttpGet]
        [Route("")]
        public  GetAllFloors()
        {
            TheTask task = _ordsvs.TaskDetails();
            return task;
        }

          [HttpGet]
        [Route("")]
        public GetAllMaterials()
        {

        }
}
