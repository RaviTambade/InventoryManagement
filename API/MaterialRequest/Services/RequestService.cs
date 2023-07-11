using System.Collections.Generic;
using System.Collections;
using System.Threading.Tasks;
using MaterialRequest.Models;
using MaterialRequest.Repositories.Interfaces;
using MaterialRequest.Services.Interfaces;
namespace MaterialRequest.Services;
public class RequestService : IRequestService
{
    private readonly IRequestRepository _repo;
    public RequestService(IRequestRepository repo)
    {
        _repo = repo;
    }

    public async Task<List<Request>> GetAllRequests(int empid) =>await _repo.GetAllRequests(empid);
    public async Task<List<Request>> GetRequests(int storemanagerid) =>await _repo.GetAllRequests(storemanagerid);
    public async Task<bool> Request(int empid) =>await _repo.Request(empid);
    public async Task<List<RequestDetails>> GetRequestDetails(int requestid) =>await _repo.GetRequestDetails(requestid);
     public async Task<bool> DeleteRequest(int requestid) =>await _repo.DeleteRequest(requestid);
     public async Task<RequestDetails> GetItem(int id)=>await _repo.GetItem(id);

    public async Task<bool> UpdateItem(RequestDetails item) =>await _repo.UpdateItem(item);
    public async Task<bool> DeleteItem(int id) =>await _repo.DeleteItem(id);

    // public async Task<IEnumerable<RequestDetails>> GetAllRequest(int empid) =>await _repo.GetAllRequest(empid);

    // public async Task<IEnumerable<Request>> GetRequestId(int empid) =>await _repo.GetRequestId(empid);
}