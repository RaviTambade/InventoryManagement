using System.Collections.Generic;
using System.Threading.Tasks;
using System.Collections;
using System.Net.Http.Headers;
using MaterialRequest.Models;
namespace MaterialRequest.Repositories.Interfaces;
public interface IRequestRepository
{
    Task<bool> DeleteRequest(int requestid);
    Task<bool> CancelRequest(int requestid);

    Task<RequestDetails> GetItem(int id);
    Task<List<Request>> GetAllRequests(int empid);
    Task<List<Request>> GetRequests(int storemanagerid);
    Task<bool> Request(int empid);
    Task<bool> UpdateItem(RequestDetails item);
    Task<bool> DeleteItem(int id);
    Task<List<RequestDetails>> GetRequestDetails(int requestid);
    Task<List<RequestReport>> WeeklyRequests(int id,Period period);
    Task<List<RequestReport>> MonthlyRequests(int id,Period period);
    Task<List<RequestReport>> YearlyRequests(int id,string year);

    // Task<IEnumerable<RequestDetails>> GetAllRequest(int empid);
    // Task<IEnumerable<Request>> GetRequestId(int empid);

}