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

    public IEnumerable<Order> OrdersHistory(int id)=> _repo.OrdersHistory(id);
    public IEnumerable<Order> AllOrdersHistory()=> _repo.AllOrdersHistory();
    // public IEnumerable<OrderDetails> Task()=> _repo.AllOrdersHistory();
    // public IEnumerable<OrderDetails> TaskHistory(int id)=> _repo.AllOrdersHistory(id);

}