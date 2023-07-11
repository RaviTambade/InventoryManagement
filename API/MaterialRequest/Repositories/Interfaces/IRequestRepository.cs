using System.Collections.Generic;
using System.Threading.Tasks;
using System.Collections;
using System.Net.Http.Headers;
using MaterialRequest.Models;
namespace MaterialRequest.Repositories.Interfaces;
public interface IRequestRepository
{
    Task<bool> DeleteRequest(int requestid);
    Task<RequestDetails> GetItem(int id);
    Task<List<Request>> GetAllRequests(int empid);
    Task<List<Request>> GetRequests(int storemanagerid);
    Task<bool> Request(int empid);
    Task<bool> UpdateItem(RequestDetails item);

    // Task<IEnumerable<RequestDetails>> GetAllRequest(int empid);
    Task<List<RequestDetails>> GetRequestDetails(int requestid);
    // Task<IEnumerable<Request>> GetRequestId(int empid);

}