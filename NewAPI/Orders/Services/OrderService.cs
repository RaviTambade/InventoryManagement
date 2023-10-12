using System.Collections.Generic;
using System.Collections;
using System.Threading.Tasks;
using Transflower.InventoryManagement.Orders.Models;
using Transflower.InventoryManagement.Orders.Repositories.Interfaces;
using Transflower.InventoryManagement.Orders.Services.Interfaces;
namespace Transflower.InventoryManagement.Orders.Services;
public class OrderService : IOrderService
{
    private readonly IOrderRepository _repo;
    public OrderService(IOrderRepository repo)
    {
        _repo = repo;
    }
    public async Task<IEnumerable<Request>> GetOrders(int empid)=>await _repo.GetOrders(empid);
    public async Task<IEnumerable<Request>> GetCompletedOrders(int empid)=>await _repo.GetCompletedOrders(empid);

    public  async Task<IEnumerable<OrderDetails>> GetOrderDetails(int requestid)=>await _repo.GetOrderDetails(requestid);
    public  async Task<bool> Approve(int id,int quantity)=>await _repo.Approve(id,quantity);

    // public async Task<IEnumerable<OrderDetails>> GetAllOrders(int empid)=>await _repo.GetAllOrders(empid);
    // public async Task<IEnumerable<OrderDetails>> GetOrderDetailsForStore(int reqid)=>await _repo.GetOrderDetailsForStore(reqid);

    // public async Task<IEnumerable<Order>> OrderedMaterialsInADay()=>await _repo.OrderedMaterialsInADay();
    // public async Task<IEnumerable<Order>> GetOrders(Period date)=>await _repo.GetOrders(date);
    // public async Task<bool> Order(int empid)=>await _repo.Order(empid);
    // public async Task<bool> DeleteOrder(int orderid)=>await _repo.DeleteOrder(orderid);

    // public async Task<IEnumerable<RequestDetails>> GetRequestDetails(int[]id)=>await _repo.GetRequestDetails(id);

}