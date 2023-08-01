using System.Threading.Tasks;
using System.Collections;
using System.Net.Http.Headers;
using Requests.Models;
namespace Requests.Repositories.Interfaces;
public interface IInitialRequestRepository
{
    Task<List<InitialRequestItem>> GetAll(int empid);
    Task<InitialRequestItem> GetById(int cartId);
    Task<bool> Insert(InitialRequestItem item);
    Task<bool> Delete(int id);
    Task<bool> RemoveAll(int employeeid);
    Task<bool> UpdateQuantity(InitialRequestItem item);
    Task<bool> ChangeStatus(ChangeStatus status);

}