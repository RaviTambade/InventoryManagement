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

    public async Task<Shipping> GetShipments(int employeeId)=>await _repo.GetShipments(employeeId);
    public async Task<List<Shipping>> GetShipped(int employeeId)=>await _repo.GetShipped(employeeId);
    public async Task<int> GetTotalTasks(int employeeId)=>await _repo.GetTotalTasks(employeeId);

    public async Task<List<ShippingDetails>> GetShippingDetails(int taskId)=>await _repo.GetShippingDetails(taskId);
    public async Task<bool> UpdateStatus(int id)=>await _repo.UpdateStatus(id);
    public async Task<bool> ShipmentDeliver(int id)=>await _repo.ShipmentDeliver(id);

}