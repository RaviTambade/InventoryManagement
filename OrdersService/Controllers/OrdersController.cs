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
    [Route("details/{empid}")]
    public IEnumerable<OrderDetails> GetAllOrders(int empid)
    {
        IEnumerable<OrderDetails> orders = _ordsvs.GetAllOrders(empid);
        return orders;
    }

    [HttpGet]
    [Route("detail/{orderid}")]
    public OrderDetails GetOrderDetails(int orderid)
    {
        OrderDetails orders = _ordsvs.GetOrderDetails(orderid);
        return orders;
    }

// get order details by sending request Id (store Managers)
    [HttpGet]
    [Route("details/request/{reqid}")]
    public IEnumerable<OrderDetails> GetOrderDetailsForStore(int reqid)
    {
        IEnumerable<OrderDetails> orders = _ordsvs.GetOrderDetailsForStore(reqid);
        return orders;
    }

    //Get list of materials ordered in a day
    [HttpGet]
    [Route("orderedInADay")]
    public IEnumerable<Order> OrderedMaterialsInADay()
    {
        IEnumerable<Order> orders = _ordsvs.OrderedMaterialsInADay();
        return orders;
    }

    //Get list of materials ordered from date to to date
    [HttpPost]
    [Route("orderedFromDateToDate")]
    public IEnumerable<Order> GetOrders([FromBody] Period date)
    {
        IEnumerable<Order> orders = _ordsvs.GetOrders(date);
        return orders;
    }

    [HttpGet]
    [Route("order/{empid}")]
    public bool AddOrder(int empid)
    {
        bool status = _ordsvs.Order(empid);
        return status;
    }
    [HttpDelete]
    [Route("order/{orderid}")]
    public bool DeleteOrder(int orderid)
    {
        bool status = _ordsvs.DeleteOrder(orderid);
        return status;
    }

    //get request history For storemanagers id by sending requestids
    [HttpPost]
    [Route("requestdetails")]
    public IEnumerable<RequestDetails> GetDetails(int[]id )
    {
        IEnumerable<RequestDetails> requests = _ordsvs.GetRequestDetails(id);
        return requests;
    }

}

