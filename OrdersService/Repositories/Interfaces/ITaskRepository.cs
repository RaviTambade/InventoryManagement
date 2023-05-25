using System.Collections;
using System.Net.Http.Headers;
using OrdersService.Models;
namespace OrdersService.Repositories.Interfaces;
public interface ITaskRepository{
    Tasks Task();
    IEnumerable<Tasks> GetAll(int id);

}