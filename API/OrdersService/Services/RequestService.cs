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

    public async Task<bool> UpdateQuantityOfRequestedCartItme(CartItem item) =>await _repo.UpdateQuantityOfRequestedCartItme(item);
    public async Task<bool> DeleteRequest(int requestid) =>await _repo.DeleteRequest(requestid);

    public async Task<IEnumerable<RequestDetails>> GetAllRequests(int empid) =>await _repo.GetAllRequests(empid);
    public async Task<IEnumerable<RequestDetails>> GetAllRequest(int empid) =>await _repo.GetAllRequest(empid);
    public async Task<IEnumerable<Request>> GetRequestDetails(int requestid) =>await _repo.GetRequestDetails(requestid);
    public async Task<CartItem> GetCartItemFromRequest(int orderid)=>await _repo.GetCartItemFromRequest(orderid);

    public async Task<IEnumerable<Request>> GetRequestId(int empid) =>await _repo.GetRequestId(empid);
}