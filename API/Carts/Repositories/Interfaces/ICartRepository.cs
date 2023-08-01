using System.Threading.Tasks;
using System.Collections;
using System.Net.Http.Headers;
using Carts.Models;
namespace Carts.Repositories.Interfaces;
public interface ICartRepository
{
    Task<List<Cart>> GetAll(int empid);
    Task<Cart> GetById(int cartId);
    Task<bool> Insert(Cart item);
    Task<bool> Delete(int id);
    Task<bool> RemoveAll(int employeeid);
    Task<bool> UpdateQuantity(Cart item);
    Task<bool> ChangeStatus(ChangeStatus status);

}