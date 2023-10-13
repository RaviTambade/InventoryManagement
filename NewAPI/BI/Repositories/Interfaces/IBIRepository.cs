using Transflower.InventoryManagement.BIService.Models;

namespace Transflower.InventoryManagement.BIService.Repositories.Interfaces;

public interface IBIRepository
{
    Task<RequestCount> GetRequestCount(DateTime date, int supervisorId);
    Task<OrderCount> GetOrderCount(DateTime date, int storeManagerId);
    Task<TaskCount> GetTaskCount(DateTime date, int storeWorkerId);
    Task<Request> GetRequestByStatus();
    Task<Supervisor> GetSupervisors();
    Task<Material> GetMaterials();
    Task<SupervisorRequest> GetMaterialRequestBySupervisor(int supervisorId);
}
