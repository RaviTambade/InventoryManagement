using System.Threading.Tasks;
using System.Collections;
using System.Net.Http.Headers;
using MaterialRequest.Models;
namespace MaterialRequest.Repositories.Interfaces;
public interface IOrderRepository
{
    Task<IEnumerable<Request>> GetOrders(int empid);
    Task<IEnumerable<OrderDetails>> GetOrderDetails(int requestid,int storemanagerid);
    // Task<IEnumerable<OrderDetails>> GetAllOrders(int empid);
    // Task<IEnumerable<OrderDetails>> GetOrderDetailsForStore(int reqid);
    // //Task< IEnumerable<Order>> OrderedMaterialsInADay();
    // // Task<IEnumerable<Order>> GetOrders(Period date);
    // Task<bool> Order(int empid);
    // Task<bool> DeleteOrder(int orderid);
    // Task<IEnumerable<RequestDetails>> GetRequestDetails(int[] id);

}