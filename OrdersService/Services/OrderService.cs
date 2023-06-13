using System.Collections;
using System.Threading.Tasks;
using OrdersService.Models;
using OrdersService.Repositories.Interfaces;
using OrdersService.Services.Interfaces;
namespace OrdersService.Services;
public class OrderService : IOrderService
{
    private readonly IOrderRepository _repo;
    public OrderService(IOrderRepository repo)
    {
        _repo = repo;
    }

    public Order OrdersHistory(int orderid)=> _repo.OrdersHistory(orderid);
     public IEnumerable<Order> GetOrdersHistory(int empid)=> _repo.GetOrdersHistory(empid);
    public IEnumerable<Order> OrderedMaterialsInADay()=> _repo.OrderedMaterialsInADay();
    public IEnumerable<Order> GetOrders(Period date)=> _repo.GetOrders(date);

    public bool Order(Order order)=> _repo.Order(order);

}