using Transflower.InventoryManagement.BIService.Models;
using Transflower.InventoryManagement.BIService.Repositories.Interfaces;
using Transflower.InventoryManagement.BIService.Services.Interfaces;

namespace Transflower.InventoryManagement.BIService.Services;

public class BIServices : IBIService
{
    private readonly IBIRepository _repository;

    public BIServices(IBIRepository repository)
    {
        _repository = repository;
    }

    public async Task<RequestCount> GetRequestCount(DateTime date, int supervisorId)
    {
        return await _repository.GetRequestCount(date, supervisorId);
    }

    public async Task<OrderCount> GetOrderCount(DateTime date, int storeManagerId)
    {
        return await _repository.GetOrderCount(date, storeManagerId);
    }

    public async Task<TaskCount> GetTaskCount(DateTime date, int storeWorkerId)
    {
        return await _repository.GetTaskCount(date, storeWorkerId);
    }

    public async Task<Request> GetRequestByStatus()
    {
        return await _repository.GetRequestByStatus();
    }

    public async Task<Supervisor> GetSupervisors()
    {
        return await _repository.GetSupervisors();
    }

    public async Task<Material> GetMaterials()
    {
        return await _repository.GetMaterials();
    }

    public async Task<SupervisorRequest> GetMaterialRequestBySupervisor(int supervisorId)
    {
        return await _repository.GetMaterialRequestBySupervisor(supervisorId);
    }
}
