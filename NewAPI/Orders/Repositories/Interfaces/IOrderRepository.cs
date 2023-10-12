using System.Collections.Generic;
using System.Threading.Tasks;
using System.Collections;
using System.Net.Http.Headers;
using Transflower.InventoryManagement.Orders.Models;
namespace Transflower.InventoryManagement.Orders.Repositories.Interfaces;
public interface IOrderRepository
{
    Task<IEnumerable<Request>> GetOrders(int empid);
    Task<IEnumerable<Request>> GetCompletedOrders(int empid);
    Task<IEnumerable<OrderDetails>> GetOrderDetails(int requestid);
    Task<bool> Approve(int id,int quantity);
    // Task<IEnumerable<OrderDetails>> GetAllOrders(int empid);
    // Task<IEnumerable<OrderDetails>> GetOrderDetailsForStore(int reqid);
    // //Task< IEnumerable<Order>> OrderedMaterialsInADay();
    // // Task<IEnumerable<Order>> GetOrders(Period date);
    // Task<bool> Order(int empid);
    // Task<bool> DeleteOrder(int orderid);
    // Task<IEnumerable<RequestDetails>> GetRequestDetails(int[] id);

}