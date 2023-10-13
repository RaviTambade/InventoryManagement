using Microsoft.AspNetCore.Mvc;
using Transflower.InventoryManagement.BIService.Models;
using Transflower.InventoryManagement.BIService.Services.Interfaces;

namespace Transflower.InventoryManagement.BIService.Controllers
{
    [ApiController]
    [Route("api/bi")]
    public class BIController : ControllerBase
    {
        private readonly IBIService _service;

        public BIController(IBIService svc)
        {
            _service = svc;
        }

        [HttpGet("requestcount/{date}/{supervisorId}")]
        public async Task<RequestCount> GetRequestCount(DateTime date, int supervisorId)
        {
            return await _service.GetRequestCount(date, supervisorId);
        }

        [HttpGet("ordercount/{date}/{storeManagerId}")]
        public async Task<OrderCount> GetOrderCount(DateTime date, int storeManagerId)
        {
            return await _service.GetOrderCount(date, storeManagerId);
        }

        [HttpGet("taskcount/{date}/{storeWorkerId}")]
        public async Task<TaskCount> GetTaskCount(DateTime date, int storeWorkerId)
        {
            return await _service.GetTaskCount(date, storeWorkerId);
        }

        [HttpGet("requests")]
        public async Task<Request> GetRequestByStatus()
        {
            return await _service.GetRequestByStatus();
        }

        [HttpGet("supervisors")]
        public async Task<Supervisor> GetSupervisors()
        {
            return await _service.GetSupervisors();
        }

        [HttpGet("materials")]
        public async Task<Material> GetMaterials()
        {
            return await _service.GetMaterials();
        }

        [HttpGet("supervisorRequest/{supervisorId}")]
        public async Task<SupervisorRequest> GetMaterialRequestBySupervisor(int supervisorId)
        {
            return await _service.GetMaterialRequestBySupervisor(supervisorId);
        }
    }
}
