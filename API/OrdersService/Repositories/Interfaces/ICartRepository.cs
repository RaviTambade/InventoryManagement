using System.Threading.Tasks;
using System.Collections;
using System.Net.Http.Headers;
using OrdersService.Models;
namespace OrdersService.Repositories.Interfaces;
public interface ICartRepository
{
    Task<IEnumerable<CartItem>> GetAll(int empid);
    Task<CartItem> GetCartItem(int cartId);

    Task<bool> AddItem(CartItem item);
    Task<bool> Delete(int id);


    Task<bool> EmptyCart(int employeeid);
    Task<bool> UpdateQuantity(CartItem item);
    Task<bool> ChangeStatus(ChangeStatus status);

}