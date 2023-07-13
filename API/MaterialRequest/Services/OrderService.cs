using System.Collections.Generic;
using System.Collections;
using System.Threading.Tasks;
using MaterialRequest.Models;
using MaterialRequest.Repositories.Interfaces;
using MaterialRequest.Services.Interfaces;
namespace MaterialRequest.Services;
public class OrderService : IOrderService
{
    private readonly IOrderRepository _repo;
    public OrderService(IOrderRepository repo)
    {
        _repo = repo;
    }
    public async Task<IEnumerable<Request>> GetOrders(int empid)=>await _repo.GetOrders(empid);

    public  async Task<IEnumerable<OrderDetails>> GetOrderDetails(int requestid,int storemanagerid)=>await _repo.GetOrderDetails(requestid,storemanagerid);
    public  async Task<bool> Approve(List<OrderDetails> orderDetails)=>await _repo.Approve(orderDetails);

    // public async Task<IEnumerable<OrderDetails>> GetAllOrders(int empid)=>await _repo.GetAllOrders(empid);
    // public async Task<IEnumerable<OrderDetails>> GetOrderDetailsForStore(int reqid)=>await _repo.GetOrderDetailsForStore(reqid);

    // public async Task<IEnumerable<Order>> OrderedMaterialsInADay()=>await _repo.OrderedMaterialsInADay();
    // public async Task<IEnumerable<Order>> GetOrders(Period date)=>await _repo.GetOrders(date);
    // public async Task<bool> Order(int empid)=>await _repo.Order(empid);
    // public async Task<bool> DeleteOrder(int orderid)=>await _repo.DeleteOrder(orderid);

    // public async Task<IEnumerable<RequestDetails>> GetRequestDetails(int[]id)=>await _repo.GetRequestDetails(id);

}