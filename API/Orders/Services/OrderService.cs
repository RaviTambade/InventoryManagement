using System.Collections.Generic;
using System.Collections;
using System.Threading.Tasks;
using Orders.Models;
using Orders.Repositories.Interfaces;
using Orders.Services.Interfaces;
namespace Orders.Services;
public class OrderService : IOrderService
{
    private readonly IOrderRepository _repo;
    public OrderService(IOrderRepository repo)
    {
        _repo = repo;
    }
    public async Task<IEnumerable<Order>> GetOrders(int empid)=>await _repo.GetOrders(empid);
    public async Task<IEnumerable<Order>> GetCompletedOrders(int empid)=>await _repo.GetCompletedOrders(empid);

    public  async Task<IEnumerable<OrderDetails>> GetOrderDetails(int requestid,int storemanagerid)=>await _repo.GetOrderDetails(requestid,storemanagerid);
    public  async Task<bool> Approve(int id,int quantity)=>await _repo.Approve(id,quantity);


}