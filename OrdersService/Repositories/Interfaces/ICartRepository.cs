using System.Collections;
using System.Net.Http.Headers;
using OrdersService.Models;
namespace OrdersService.Repositories.Interfaces;
public interface ICartRepository
{
    IEnumerable<CartItem> GetAll(int empid);
    CartItem GetCartItem(int cartId);

    bool AddItem(CartItem item);
    bool Delete(int id);
    bool DeleteRequest(int requestid);

    CartItem GetCartItemFromRequest(int orderId);
    IEnumerable<Request> GetAllRequests(int empid);
    IEnumerable<Request> GetRequestDetails(int requestid);
    bool EmptyCart(int employeeid);
    bool UpdateQuantity(CartItem item);
    bool ChangeStatus(ChangeStatus status);

    bool UpdateQuantityOfRequestedCartItme(CartItem item);
}