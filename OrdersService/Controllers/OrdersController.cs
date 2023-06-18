using System.Collections.Generic;
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
        //get order history of store managers
        [HttpGet]
        [Route("History/{empid}")]
        public IEnumerable<Order> GetAll(int empid)
        {
            IEnumerable<Order> orders = _ordsvs.GetOrdersHistory(empid);
            return orders;
        }

        [HttpGet]
        [Route("details/{orderid}")]
        public Order GetOrderDetails(int orderid)
        {
            Order orders = _ordsvs.GetOrderDetails(orderid);
            return orders;
        }
    
         //Get list of materials ordered in a day
        [HttpGet]
        [Route("orderedInADay")]
        public IEnumerable<Order> OrderedMaterialsInADay()
        {
            IEnumerable<Order> orders= _ordsvs.OrderedMaterialsInADay();
            return orders;
        }

        //Get list of materials ordered from date to to date
        [HttpPost]
        [Route("orderedFromDateToDate")]
        public IEnumerable<Order> GetOrders( [FromBody] Period date)
        {
            IEnumerable<Order> orders= _ordsvs.GetOrders(date);
            return orders;
        }




}

