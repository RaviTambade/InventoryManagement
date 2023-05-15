using MaterialsService.Models;
using MaterialsService.Services.Interfaces;
using Microsoft.AspNetCore.Mvc;

namespace MaterialsService.Controllers
{
    [ApiController]
    [Route("/api/[controller]")]
    public class MaterialsController : ControllerBase
    {
        private readonly IMaterialService _matsrv;
        public MaterialsController(IMaterialService matsrv)
        {
            _matsrv = matsrv;
        }

        [HttpGet]
        [Route("getallmaterials")]
        public IEnumerable<Material> GetAllMaterials()
        {
            IEnumerable<Material> allMaterials = _matsrv.GetAll();
            return allMaterials;
        }

        [HttpGet]
        [Route("getmaterial/{id}")]
        public Material GetMaterial(int id)
        {
            Material material = _matsrv.GetById(id);
            return material;
        }

        [HttpPut]
        [Route("updateMaterial/{id}")]
        public bool Update([FromBody] Material material)
        {
            Console.WriteLine(material.MaterialId);
            Console.WriteLine(material.MaterialName);
            Console.WriteLine(material.MaterialType);
            Console.WriteLine(material.MaterialQuantity);

            bool status = _matsrv.Update(material);
            return status;
        }

        [HttpPost]
        [Route("addmaterial")]
        public bool Insert([FromBody] Material material)
        {
            bool status = _matsrv.Insert(material);
            return status;
        }

        [HttpDelete]
        [Route("deletematerial/{id}")]
        public bool Delete(int id)
        {
            bool status = _matsrv.Delete(id);
            return status;
        }

        [HttpGet]
        [Route("getlocation/{id}")]
        public Location GetLocation(int id)
        {
            Location location =_matsrv.GetLocation(id);
            return location;
        }

    }
} 