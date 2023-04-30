using Microsoft.AspNetCore.Mvc;
using InventoryManagement.Models;
namespace InventoryManagement.Controllers;

[ApiController]
[Route("[controller]")]
public class WarehousesController : ControllerBase
{
    public IEnumerable<Material> GetAll()
    {
        
    }     

}
