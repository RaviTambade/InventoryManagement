using System.Collections;
using System.Net.Http.Headers;
using OrdersService.Models;
namespace OrdersService.Repositories.Interfaces;
public interface IOrderRepository
{
    Order GetOrderDetails(int orderid);
    IEnumerable<Order> GetOrdersHistory(int empid);
    IEnumerable<Order> OrderedMaterialsInADay();
    IEnumerable<Order> GetOrders(Period date);

}