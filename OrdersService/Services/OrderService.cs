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

    public Order GetOrderDetails(int orderid)=> _repo.GetOrderDetails(orderid);

    public IEnumerable<OrderDetails> GetAllOrders(int empid)=> _repo.GetAllOrders(empid);

    public IEnumerable<Order> OrderedMaterialsInADay()=> _repo.OrderedMaterialsInADay();
    public IEnumerable<Order> GetOrders(Period date)=> _repo.GetOrders(date);
    public bool Order(int empid)=> _repo.Order(empid);
    public bool DeleteOrder(int orderid)=> _repo.DeleteOrder(orderid);

}