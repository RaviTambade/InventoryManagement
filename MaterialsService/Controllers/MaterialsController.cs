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
        [Route("locations")]
        public  IEnumerable<Location> GetLocation()
        {
             IEnumerable<Location> location =_matsrv.GetLocation();
            return location;
        }



        //Get all materials based on material type
        [HttpGet]
        [Route("catagory/{id}")]
        public IEnumerable<Material> GetMaterials(int id)
        {
            IEnumerable<Material> materials = _matsrv.GetMaterials(id);
            return materials;
        }

        //Get out of stock  materials list
        [HttpGet]
        [Route("materials/outofstock")]
        public IEnumerable<Material> GetOutOfStockMaterials()
        {
            IEnumerable<Material> materials = _matsrv.GetOutOfStockMaterials();
            return materials;
        }

     
    }
} 