using Transflower.Orders.Models;
namespace Transflower.Orders.Repositories.Interfaces;
public interface IOrderRepository
{
    Task<IEnumerable<Order>> GetOrders(int employeeId);
    Task<IEnumerable<Order>> GetCompletedOrders(int employeeId);
    Task<IEnumerable<OrderDetails>> GetOrderDetails(int requestId,int storemanagerId);
    Task<bool> Approve(int id,int quantity);

}