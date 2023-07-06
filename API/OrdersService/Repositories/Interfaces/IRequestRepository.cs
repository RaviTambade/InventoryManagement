using System.Collections;
using System.Net.Http.Headers;
using OrdersService.Models;
namespace OrdersService.Repositories.Interfaces;
public interface IRequestRepository
{
    bool DeleteRequest(int requestid);
    CartItem GetCartItemFromRequest(int orderId);
    IEnumerable<RequestDetails> GetAllRequests(int empid);
    IEnumerable<RequestDetails> GetAllRequest(int empid);
    IEnumerable<Request> GetRequestDetails(int requestid);
    bool UpdateQuantityOfRequestedCartItme(CartItem item);
    IEnumerable<Request> GetRequestId(int empid);

}