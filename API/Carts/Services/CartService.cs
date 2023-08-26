using System.Collections;
using System.Threading.Tasks;
using Transflower.Carts.Models;
using Transflower.Carts.Repositories.Interfaces;
using Transflower.Carts.Services.Interfaces;
namespace Transflower.Carts.Services;
public class CartService : ICartService
{
    private readonly ICartRepository _repo;
    public CartService(ICartRepository repo)
    {
        _repo = repo;
    }

    public async Task<List<Cart>> GetAll(int empid)=>await _repo.GetAll(empid);
    public async Task<Cart> GetById(int cartId)=>await _repo.GetById(cartId);
    public async Task<bool> Insert(Cart cartItem)=>await _repo.Insert(cartItem);
    public async Task<bool> Delete(int id)=>await _repo.Delete(id);

    public async Task<bool> RemoveAll(int employeeid)=>await _repo.RemoveAll(employeeid);
    public async Task<bool> UpdateQuantity(Cart item)=>await _repo.UpdateQuantity(item);
    public async Task<bool> ChangeStatus(ChangeStatus status)=>await _repo.ChangeStatus(status);


}