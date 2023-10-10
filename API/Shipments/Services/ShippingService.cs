using Transflower.Shipments.Models;
using Transflower.Shipments.Repositories.Interfaces;
using Transflower.Shipments.Services.Interfaces;
namespace Transflower.Shipments.Services;
public class ShippingService : IShippingService
{
    private readonly IShippingRepository _repo;
    public ShippingService(IShippingRepository repo)
    {
        _repo = repo;
    }

    public async Task<List<Shipping>> GetShipments(int employeeId)=>await _repo.GetShipments(employeeId);
    
    public async Task<int> GetTotalTasks(int employeeId)=>await _repo.GetTotalTasks(employeeId);

    public async Task<List<ShippingDetails>> GetShippingDetails(int taskId)=>await _repo.GetShippingDetails(taskId);
    public async Task<bool> UpdateStatus(int id,string orderStatus)=>await _repo.UpdateStatus(id,orderStatus);
    

}