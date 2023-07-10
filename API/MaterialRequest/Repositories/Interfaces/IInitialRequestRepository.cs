using System.Threading.Tasks;
using System.Collections;
using System.Net.Http.Headers;
using MaterialRequest.Models;
namespace MaterialRequest.Repositories.Interfaces;
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