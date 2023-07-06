using System.Threading.Tasks;
using System.Collections;
using System.Net.Http.Headers;
using OrdersService.Models;
namespace OrdersService.Repositories.Interfaces;
public interface IRequestRepository
{
    Task<bool> DeleteRequest(int requestid);
    Task<CartItem> GetCartItemFromRequest(int orderId);
    Task<IEnumerable<RequestDetails>> GetAllRequests(int empid);
    Task<IEnumerable<RequestDetails>> GetAllRequest(int empid);
    Task<IEnumerable<Request>> GetRequestDetails(int requestid);
    Task<bool> UpdateQuantityOfRequestedCartItme(CartItem item);
    Task<IEnumerable<Request>> GetRequestId(int empid);

}