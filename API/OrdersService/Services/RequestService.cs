using System.Collections;
using System.Threading.Tasks;
using OrdersService.Models;
using OrdersService.Repositories.Interfaces;
using OrdersService.Services.Interfaces;
namespace OrdersService.Services;
public class RequestService : IRequestService
{
    private readonly IRequestRepository _repo;
    public RequestService(IRequestRepository repo)
    {
        _repo = repo;
    }

    public bool UpdateQuantityOfRequestedCartItme(CartItem item) => _repo.UpdateQuantityOfRequestedCartItme(item);
    public bool DeleteRequest(int requestid) => _repo.DeleteRequest(requestid);

    public IEnumerable<RequestDetails> GetAllRequests(int empid) => _repo.GetAllRequests(empid);
    public IEnumerable<RequestDetails> GetAllRequest(int empid) => _repo.GetAllRequest(empid);
    public IEnumerable<Request> GetRequestDetails(int requestid) => _repo.GetRequestDetails(requestid);
    public CartItem GetCartItemFromRequest(int orderid)=> _repo.GetCartItemFromRequest(orderid);

    public IEnumerable<Request> GetRequestId(int empid) => _repo.GetRequestId(empid);
}