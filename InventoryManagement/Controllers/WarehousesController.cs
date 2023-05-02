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
        public  IEnumerable<Material> GetAllMaterials()
        {
            Console.WriteLine("getall");
            IEnumerable<Material> allMaterials= _warehousesrv.GetAll();
            return allMaterials;
        }

        [HttpGet]
        [Route("getmaterial/{id}")]
        public Material GetById(int id)
        {
            Material material = _warehousesrv.GetById(id);
            return material;
        }

        [HttpPut]
        [Route("update/{id}")]
        public bool Update(int id, [FromBody] Material material)
        {
            bool status =_warehousesrv.Update(id, material);
            return status;
        }

        [HttpPost]
        [Route("addmaterial")]
        public bool Insert([FromBody] Material material)
        {
            Console.WriteLine(material.MaterialName, material.MaterialType, material.MaterialImgUrl,material.MaterialQuantity,material.MaterialUnitPrice);
            bool status= _warehousesrv.Insert(material);
            return status;
        }

        [HttpDelete]
        [Route("delete/{id}")]
        public bool Delete(int id)
        {
            bool status = false;
            return status;
        }

   
    }
}