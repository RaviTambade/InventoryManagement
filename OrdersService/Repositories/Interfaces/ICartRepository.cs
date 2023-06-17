using System.Collections;
using System.Net.Http.Headers;
using OrdersService.Models;
namespace OrdersService.Repositories.Interfaces;
public interface ICartRepository
{
    IEnumerable<CartItem> GetAll(int empid);
    bool AddItem(CartItem item);
    bool Delete(int id);
    IEnumerable<Request> GetAllRequests(int empid);
    IEnumerable<Request> GetRequestDetails(int requestid);

}