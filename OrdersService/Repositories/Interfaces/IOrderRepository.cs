using System.Collections;
using System.Net.Http.Headers;
using OrdersService.Models;
namespace OrdersService.Repositories.Interfaces;
public interface IOrderRepository
{
    Order OrdersHistory(int orderid);
    // IEnumerable<Order> OrdersHistory();
    IEnumerable<Order> OrderedMaterialsInADay();
    IEnumerable<Order> GetOrders(Period date);
}