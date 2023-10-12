using Transflower.InventoryManagement.BIService.Models;

namespace Transflower.InventoryManagement.BIService.Repositories.Interfaces;

public interface IBIRepository
{
    Task<RequestCount> GetRequestCount(DateTime date, int supervisorId);
    Task<OrderCount> GetOrderCount(DateTime date, int storeManagerId);

}
