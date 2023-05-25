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
        [Route("orders/History")]
        public IEnumerable<Order> GetAll()
        {
            IEnumerable<Order> orders = _ordsvs.OrdersHistory();
            return orders;
        }

        [HttpGet]
        [Route("orders/History/{id}")]
        public IEnumerable<Order> Get(int id)
        {
            IEnumerable<Order> orders = _ordsvs.OrdersHistory(id);
            return orders;
        }
    

}

