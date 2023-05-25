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
        [Route("materials")]
        public IEnumerable<Material> GetAllMaterials()
        {
            IEnumerable<Material> Materials = _matsrv.GetAll();
            return Materials;
        }

        [HttpGet]
        [Route("material/{id}")]
        public Material GetMaterial(int id)
        {
            Material material = _matsrv.GetById(id);
            return material;
        }

        [HttpPut]
        [Route("material/{id}")]
        public bool UpdateMaterial([FromBody] Material material)
        {
            bool status = _matsrv.Update(material);
            return status;
        }

        [HttpPost]
        [Route("material")]
        public bool InsertMaterial([FromBody] Material material)
        {
            bool status = _matsrv.Insert(material);
            return status;
        }

        [HttpDelete]
        [Route("material/{id}")]
        public bool DeleteMaterial(int id)
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

        [HttpGet]
        [Route("MaterialByCatagory")]
        public IEnumerable<Material> GetMaterialByType([FromBody] string type)
        {
            IEnumerable<Material> materials = _matsrv.GetByType(type);
            return materials;
        }

    }
} 