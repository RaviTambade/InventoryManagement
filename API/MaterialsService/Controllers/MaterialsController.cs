using MaterialsService.Models;
using MaterialsService.Services.Interfaces;
using Microsoft.AspNetCore.Mvc;
using System.Net.Http.Headers;

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
        public async Task<IEnumerable<Material>> GetAll()
        {
            IEnumerable<Material> Materials = await _matsrv.GetAll();
            return Materials;
        }

        [HttpGet]
        [Route("materials/{id}")]
        public async Task<Material> Get(int id)
        {
            Material material = await _matsrv.Get(id);
            return material;
        }

        [HttpGet]
        [Route("image/{materialid}")]
        public async Task<string> GetImage(int materialid)
        {
            string imgUrl = await _matsrv.GetImage(materialid);
            return imgUrl;
        }

        [HttpPut]
        [Route("material/{id}")]
        public async Task<bool> Update(int id, [FromBody] int quantity)
        {
            bool status = await _matsrv.Update(id,quantity);
            return status;
        }

        [HttpPost]
        [Route("materials")]
        public async Task<bool> Insert([FromBody] Material material)
        {
            bool status = await _matsrv.Insert(material);
            return status;
        }

        [HttpDelete]
        [Route("materials/{id}")]
        public async Task<bool> Delete(int id)
        {
            bool status = await _matsrv.Delete(id);
            return status;
        }

        //get location of materials
        [HttpGet]
        [Route("locations")]
        public async Task<IEnumerable<Location>> GetLocations()
        {
            IEnumerable<Location> locations = await _matsrv.GetLocations();
            return locations;
        }

        [HttpGet]
        [Route("location/{id}")]
        public async Task<Location> GetLocation(int id)
        {
            Location location = await _matsrv.GetLocation(id);
            return location;
        }


        //Get all materials based on material type
        [HttpGet]
        [Route("catagory/{id}")]
        public async Task<IEnumerable<Material>> GetMaterials(int id)
        {
            IEnumerable<Material> materials = await _matsrv.GetMaterials(id);
            return materials;
        }

        //Get out of stock  materials list
        [HttpGet]
        [Route("materials/outofstock")]
        public async Task<IEnumerable<Material>> GetOutOfStockMaterials()
        {
            IEnumerable<Material> materials = await _matsrv.GetOutOfStockMaterials();
            return materials;
        }

        [HttpGet]
        [Route("stockreports/{empid}")]
        public async Task<IEnumerable<StockReport>> GetReport(int empid)
        {
            IEnumerable<StockReport> reports = await _matsrv.GetStockReports(empid);
            return reports;
        }
       
       
        [HttpGet]
        [Route("stockreports")]
        public async Task<IEnumerable<StockReport>> GetAllReports()
        {
            IEnumerable<StockReport> reports = await _matsrv.GetAllStockReports();
            return reports;
        }

        [HttpGet]
        [Route("categories")]
        public async Task<IEnumerable<Material>> GetCategories()
        {
            IEnumerable<Material> materials = await _matsrv.GetCategories();
            return materials;
        }


    [HttpPost, DisableRequestSizeLimit]
    public IActionResult Upload()
    {
        try
        {
            var file = Request.Form.Files[0];
            var folderName = Path.Combine("Resources", "Images");
            var pathToSave = Path.Combine(Directory.GetCurrentDirectory(), folderName);
            if (file.Length > 0)
            {
                var fileName = ContentDispositionHeaderValue.Parse(file.ContentDisposition).FileName.Trim('"');
                var fullPath = Path.Combine(pathToSave, fileName);
                var dbPath = Path.Combine(folderName, fileName);
                using (var stream = new FileStream(fullPath, FileMode.Create))
                {
                    file.CopyTo(stream);
                }
                return Ok(new { dbPath });
            }
            else
            {
                return BadRequest();
            }
        }
        catch (Exception ex)
        {
            return StatusCode(500, $"Internal server error: {ex}");
        }
    }

    }
}