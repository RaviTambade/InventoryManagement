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
    public CartItem GetCartItem(int cartId)=> _repo.GetCartItem(cartId);
    public CartItem GetCartItemFromRequest(int orderid)=> _repo.GetCartItemFromRequest(orderid);

    public bool UpdateQuantityOfRequestedCartItme(CartItem item)=> _repo.UpdateQuantityOfRequestedCartItme(item);

    public bool AddItem(CartItem cartItem)=> _repo.AddItem(cartItem);
    public bool Delete(int id)=> _repo.Delete(id);
    public bool DeleteRequest(int requestid)=> _repo.DeleteRequest(requestid);

    public IEnumerable<Request> GetAllRequests(int empid)=> _repo.GetAllRequests(empid);
    public IEnumerable<Request> GetRequestDetails(int requestid)=> _repo.GetRequestDetails(requestid);
    public bool EmptyCart(int employeeid)=> _repo.EmptyCart(employeeid);
    public bool UpdateQuantity(CartItem item)=> _repo.UpdateQuantity(item);
    public bool ChangeStatus(ChangeStatus status)=> _repo.ChangeStatus(status);


}