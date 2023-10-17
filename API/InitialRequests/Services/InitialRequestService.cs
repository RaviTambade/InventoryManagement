using System.Collections;
using System.Threading.Tasks;
using Transflower.InventoryManagement.InitialRequests.Models;
using Transflower.InventoryManagement.InitialRequests.Repositories.Interfaces;
using Transflower.InventoryManagement.InitialRequests.Services.Interfaces;
namespace Transflower.InventoryManagement.InitialRequests.Services;
public class InitialRequestService : IInitialRequestService
{
    private readonly IInitialRequestRepository _repo;
    public InitialRequestService(IInitialRequestRepository repo)
    {
        _repo = repo;
    }

    public async Task<List<InitialRequestItem>> GetAll(int empid)=>await _repo.GetAll(empid);
    public async Task<InitialRequestItem> GetById(int cartId)=>await _repo.GetById(cartId);
    public async Task<bool> Insert(InitialRequestItem cartItem)=>await _repo.Insert(cartItem);
    public async Task<bool> Delete(int id)=>await _repo.Delete(id);

    public async Task<bool> RemoveAll(int employeeid)=>await _repo.RemoveAll(employeeid);
    public async Task<bool> UpdateQuantity(InitialRequestItem item)=>await _repo.UpdateQuantity(item);
    public async Task<bool> ChangeStatus(ChangeStatus status)=>await _repo.ChangeStatus(status);


}