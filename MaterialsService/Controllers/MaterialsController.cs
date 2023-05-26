using MaterialsService.Models;
using MaterialsService.Services.Interfaces;
using Microsoft.AspNetCore.Mvc;

namespace MaterialsService.Controllers
{
    [ApiController]
    [Route("/api/[controller]")]
    //each controller should be impliment with auth attribute
    public class MaterialsController : ControllerBase
    {
        private readonly IMaterialService _matsrv;
        public MaterialsController(IMaterialService matsrv)
        {
            _matsrv = matsrv;
        }

        [HttpGet]
        [Route("materials")]
        public IEnumerable<Material> GetAll()
        {
            IEnumerable<Material> Materials = _matsrv.GetAll();
            return Materials;
        }

        [HttpGet]
        [Route("materials/{id}")]
        public Material Get(int id)
        {
            Material material = _matsrv.Get(id);
            return material;
        }

        [HttpPut]
        [Route("materials/{id}")]
        public bool UpdateMaterial([FromBody] Material material)
        {
            bool status = _matsrv.Update(material);
            return status;
        }

        [HttpPost]
        [Route("materials")]
        public bool Insert([FromBody] Material material)
        {
            bool status = _matsrv.Insert(material);
            return status;
        }

        [HttpDelete]
        [Route("materials/{id}")]
        public bool Delete(int id)
        {
            bool status = _matsrv.Delete(id);
            return status;
        }

        [HttpGet]
        [Route("materials/locations/{id}")]
        public Location GetLocation(int id)
        {
            Location location =_matsrv.GetLocation(id);
            return location;
        }



        //Get all materials based on material type
        [HttpGet]
        [Route("materials/type")]
        public IEnumerable<Material> GetMaterialByType([FromBody] string type)
        {
            IEnumerable<Material> materials = _matsrv.GetByType(type);
            return materials;
        }

        //Get out of stock  materials list
        [HttpGet]
        [Route("materials/outofstock")]
        public IEnumerable<Material> GetMaterialByType()
        {
            IEnumerable<Material> materials = _matsrv.GetByType(type);
            return materials;
        }

        //Get list of materials ordered in a day




    }
} 