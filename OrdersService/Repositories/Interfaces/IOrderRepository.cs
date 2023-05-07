using System.Collections;
using System.Net.Http.Headers;
using OrdersService.Models;
namespace OrdersService.Repositories.Interfaces;
public interface IOrderRepository
{
    IEnumerable<Order> OrdersHistory(int empid);
    IEnumerable<Order> AllOrdersHistory();
    IEnumerable<Task> TaskDetails();
}