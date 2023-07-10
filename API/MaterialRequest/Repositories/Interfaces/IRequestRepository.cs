using System.Threading.Tasks;
using System.Collections;
using System.Net.Http.Headers;
using MaterialRequest.Models;
namespace MaterialRequest.Repositories.Interfaces;
public interface IRequestRepository
{
    // Task<bool> DeleteRequest(int requestid);
    // Task<CartItem> GetCartItemFromRequest(int orderId);
    Task<List<Request>> GetAllRequests(int empid);
    Task<List<Request>> GetRequests(int storemanagerid);
    Task<bool> Request(int empid);

    // Task<IEnumerable<RequestDetails>> GetAllRequest(int empid);
    // Task<IEnumerable<Request>> GetRequestDetails(int requestid);
    // Task<bool> UpdateQuantityOfRequestedCartItme(CartItem item);
    // Task<IEnumerable<Request>> GetRequestId(int empid);

}