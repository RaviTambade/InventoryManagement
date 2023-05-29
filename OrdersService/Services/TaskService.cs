using System.Collections;
using System.Threading.Tasks;
using OrdersService.Models;
using OrdersService.Repositories.Interfaces;
using OrdersService.Services.Interfaces;
namespace OrdersService.Services;
public class TaskService : ITaskService
{
    private readonly ITaskRepository _repo;
    public TaskService(ITaskRepository repo)
    {
        _repo = repo;
    }

    // public Tasks Task()=> _repo.Task();
    // public IEnumerable<Tasks> GetAll(int id)=> _repo.GetAll(id);

}