using Transflower.Shipments.Models;
namespace Transflower.Shipments.Repositories.Interfaces;
public interface IShippingRepository
{
    Task <Shipping> GetShipments(int employeeId);
    Task<List<Shipping>> GetShipped(int employeeId);
    Task<List<ShippingDetails>> GetShippingDetails(int taskId);
    Task<bool> UpdateStatus(int id);
    Task<int> GetTotalTasks(int employeeId);
    Task<bool> ShipmentDeliver(int id);
}