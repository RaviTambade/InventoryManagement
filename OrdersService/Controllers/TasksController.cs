using Microsoft.AspNetCore.Mvc;
using OrdersService.Models;
using OrdersService.Services.Interfaces;
namespace OrdersService.Controllers;

[ApiController]
[Route("/api/[controller]")]
public class TasksController : ControllerBase
{
    private readonly ITaskService _tsksvs;
    public TasksController(ITaskService tsksvs)
    {
        _tsksvs = tsksvs;
    }
         
        [HttpGet]
        [Route("Task")]
        public Tasks Get()
        {
            Tasks task = _tsksvs.Task();
            return task;
        }

          [HttpGet]
        [Route("Tasks/history/{id}")]
        public IEnumerable<Tasks> GetAll(int id)
        {
            IEnumerable<Tasks> tasks = _tsksvs.GetAll(id);
            return tasks;
        }

}
