using Microsoft.AspNetCore.Mvc;
using OrdersService.Models;
using OrdersService.Services.Interfaces;
namespace OrdersService.Controllers;

[ApiController]
[Route("/api/[controller]")]
public class OrdersController : ControllerBase
{
    private readonly IOrderService _ordsvs;
    public OrdersController(IOrderService ordsvs)
    {
        _ordsvs = ordsvs;
    }
        [HttpGet]
        [Route("ordershistory/{id}")]
        public IEnumerable<Order> OrdersHistoryOfEmployee(int id)
        {
            IEnumerable<Order> orders = _ordsvs.OrdersHistory(id);
            return orders;
        }

        [HttpGet]
        [Route("allordershistory")]
        public IEnumerable<Order> AllOrdersHistoryOfEmployees()
        {
            IEnumerable<Order> orders = _ordsvs.AllOrdersHistory();
            return orders;
        }
    
          [HttpGet]
        [Route("Task")]
        public TheTask Task()
        {
            TheTask task = _ordsvs.TaskDetails();
            return task;
        }

          [HttpGet]
        [Route("Taskshistory/{id}")]
        public IEnumerable<TheTask> TasksHistory(int id)
        {
            IEnumerable<TheTask> tasks = _ordsvs.AllTasks(id);
            return tasks;
        }
}

