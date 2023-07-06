using System.Collections;
using System.Threading.Tasks;
using OrdersService.Models;
using OrdersService.Repositories.Interfaces;
using OrdersService.Services.Interfaces;
namespace OrdersService.Services;
public class CartService : ICartService
{
    private readonly ICartRepository _repo;
    public CartService(ICartRepository repo)
    {
        _repo = repo;
    }

    public async Task<IEnumerable<CartItem>> GetAll(int empid)=>await _repo.GetAll(empid);
    public async Task<CartItem> GetCartItem(int cartId)=>await _repo.GetCartItem(cartId);
    public async Task<bool> AddItem(CartItem cartItem)=>await _repo.AddItem(cartItem);
    public async Task<bool> Delete(int id)=>await _repo.Delete(id);

    public async Task<bool> EmptyCart(int employeeid)=>await _repo.EmptyCart(employeeid);
    public async Task<bool> UpdateQuantity(CartItem item)=>await _repo.UpdateQuantity(item);
    public async Task<bool> ChangeStatus(ChangeStatus status)=>await _repo.ChangeStatus(status);


}