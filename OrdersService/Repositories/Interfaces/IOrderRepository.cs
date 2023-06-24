using System.Collections;
using System.Net.Http.Headers;
using OrdersService.Models;
namespace OrdersService.Repositories.Interfaces;
public interface IOrderRepository
{
    OrderDetails GetOrderDetails(int orderid);
    IEnumerable<OrderDetails> GetAllOrders(int empid);
    IEnumerable<OrderDetails> GetOrderDetailsForStore(int reqid);
    IEnumerable<Order> OrderedMaterialsInADay();
    IEnumerable<Order> GetOrders(Period date);
    bool Order(int empid);
    bool DeleteOrder(int orderid);
    IEnumerable<RequestDetails> GetRequestDetails(int[] id);

}