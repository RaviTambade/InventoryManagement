using Transflower.Productions.Models;
using Transflower.Productions.Services.Interfaces;
using Microsoft.AspNetCore.Mvc;

namespace Transflower.Productions.Controllers
{
    [ApiController]
    [Route("/api/[controller]")]
    public class ProductionController : ControllerBase
    {
        private readonly IProductionService _service;

        public ProductionController(IProductionService service)
        {
            _service = service;
        }

        [HttpGet]
        [Route("productionstaffs")]
        public async Task<IEnumerable<ProductionStaff>> GetAll()
        {
            IEnumerable<ProductionStaff> productionstaffs = await _service.GetAll();
            return productionstaffs;
        }
    }
}