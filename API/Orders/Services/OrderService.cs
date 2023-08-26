using System.Collections.Generic;
using System.Collections;
using System.Threading.Tasks;
using Transflower.Orders.Models;
using Transflower.Orders.Repositories.Interfaces;
using Transflower.Orders.Services.Interfaces;
namespace Transflower.Orders.Services;
public class OrderService : IOrderService
{
    private readonly IOrderRepository _repo;
    public OrderService(IOrderRepository repo)
    {
        _repo = repo;
    }
    public async Task<IEnumerable<Order>> GetOrders(int employeeId)=>await _repo.GetOrders(employeeId);
    public async Task<IEnumerable<Order>> GetCompletedOrders(int employeeId)=>await _repo.GetCompletedOrders(employeeId);
    public  async Task<IEnumerable<OrderDetails>> GetOrderDetails(int requestId,int storemanagerId)=>await _repo.GetOrderDetails(requestId,storemanagerId);
    public  async Task<bool> Approve(int id,int quantity)=>await _repo.Approve(id,quantity);


}