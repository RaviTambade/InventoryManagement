using WarehouseService.Models;
using WarehouseService.Services.Interfaces;
using Microsoft.AspNetCore.Mvc;

namespace WarehouseService.Controllers
{
    [ApiController]
    [Route("/api/[controller]")]
    public class WarehousesController : ControllerBase
    {
        private readonly IWarehousesService _warehousesrv;
        public WarehousesController(IWarehousesService warhousesvr)
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

        [HttpGet]
        [Route("getlocation/{id}")]
        public Location GetLocation(int id)
        {
            Location location =_warehousesrv.GetLocation(id);
            return location;
        }

    }
} 