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
    public bool Delete(int id)=> _repo.Delete(id);
    public IEnumerable<Request> GetAllRequests(int empid)=> _repo.GetAllRequests(empid);
    public IEnumerable<Request> GetRequestDetails(int requestid)=> _repo.GetRequestDetails(requestid);

}