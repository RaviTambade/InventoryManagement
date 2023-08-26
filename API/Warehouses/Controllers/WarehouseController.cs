using Microsoft.AspNetCore.Mvc;
using Transflower.Warehouses.Models;
using Transflower.Warehouses.Services.Interfaces;

namespace Transflower.Warehouses.Controllers;

[ApiController]
[Route("/api/[controller]")]
public class WarehouseController : ControllerBase
{
    private readonly IWarehouseService _srv;

        public WarehouseController(IWarehouseService svr)
        {
            _srv = svr;
        }

        [HttpGet]
        [Route("warehouses")]
        public async Task<IEnumerable<WarehouseStaff>> GetAll()
        {
            IEnumerable<WarehouseStaff> warehouses =await _srv.GetAll();
            return warehouses;
        }

        [HttpGet]
        [Route("storemanagers")]
        public async Task<List<int>> GetAllStoreManagers()
        {
            List<int> storemanagers =await _srv.GetAllStoreManagers();
            return storemanagers;
        }

        [HttpGet]
        [Route("warehouse/{id}")]
        public async Task<WarehouseStaff> GetById(int id)
        {
            WarehouseStaff warehouse = await _srv.GetById(id);
            return warehouse;
        }
 
        [HttpPost]
        [Route("warehouse")]
        public async Task<bool> Insert([FromBody] WarehouseStaff warehouse)
        {
            bool status = await _srv.Insert(warehouse);
            return status;
        }


        [HttpPut]
        [Route("warehouse")]
        public async Task<bool> Update([FromBody] WarehouseStaff warehouse)
        {
            bool status = await _srv.Update(warehouse);
            return status;
        }

        [HttpPut]
        [Route("staff")]
        public async Task<bool> UpdateStaff([FromBody] List<WarehouseStaff> warehouse)
        {
            bool status = await _srv.UpdateStaff(warehouse);
            return status;
        }


        [HttpDelete]
        [Route("{id}")]
        public async Task<bool> Delete(int id)
        {
            bool status = await _srv.Delete(id);
            return status;
        }
        
    }
    


