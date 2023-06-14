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

     public IEnumerable<CartItem> GetAll(int empid)=> _repo.GetAll(empid);
    public bool AddItem(CartItem cartItem)=> _repo.AddItem(cartItem);

}