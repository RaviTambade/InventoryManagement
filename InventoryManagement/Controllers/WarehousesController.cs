using InventoryManagement.Models;
using InventoryManagement.Services.Interfaces;
using Microsoft.AspNetCore.Mvc;

namespace InventoryManagement.Controllers
{
    [ApiController]
    [Route("/api/[controller]")]
    public class WarehousesController : ControllerBase
    {
        private readonly IWarehouseService _warehousesrv;
        public WarehousesController(IWarehouseService warhousesvr)
        {
            _warehousesrv = warhousesvr;
        }

        [HttpGet]
        [Route("getallmaterials")]
        public IEnumerable<Material> GetAllMaterials()
        {
            IEnumerable<Material> allMaterials = _warehousesrv.GetAll();
            return allMaterials;
        }

        [HttpGet]
        [Route("getmaterial/{id}")]
        public Material GetMaterial(int id)
        {
            Material material = _warehousesrv.GetById(id);
            return material;
        }

        [HttpPut]
        [Route("updateMaterial/{id}")]
        public bool Update(int id, [FromBody] Material material)
        {
            bool status = _warehousesrv.Update(id, material);
            return status;
        }

        [HttpPost]
        [Route("addmaterial")]
        public bool Insert([FromBody] Material material)
        {
            bool status = _warehousesrv.Insert(material);
            return status;
        }

        [HttpDelete]
        [Route("deletematerial/{id}")]
        public bool Delete(int id)
        {
            bool status = _warehousesrv.Delete(id);
            return status;
        }

        public Location getLocation(int mid)
        {
            Location location =_warehousesrv.GetLocation(mid);
        }

    }
} 