using System.Collections.Generic;
using System.Threading.Tasks;
using System.Collections;
using System.Net.Http.Headers;
using Orders.Models;
namespace Orders.Repositories.Interfaces;
public interface IOrderRepository
{
    Task<IEnumerable<Order>> GetOrders(int empid);
    Task<IEnumerable<Order>> GetCompletedOrders(int empid);
    Task<IEnumerable<OrderDetails>> GetOrderDetails(int requestid,int storemanagerid);
    Task<bool> Approve(int id,int quantity);

}