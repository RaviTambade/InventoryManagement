using System.Collections.Generic;
using Microsoft.AspNetCore.Mvc;

using Transflower.Orders.Models;
using Transflower.Orders.Services.Interfaces;

namespace MaterialRequest.Controllers;

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
    [Route("orders/{empid}")]
    public async Task<IEnumerable<Request>> GetOrdersByEmployeeId(int empid)
    {
        IEnumerable<Request> orders =await _ordsvs.GetOrders(empid);
        return orders;
    }

    [HttpGet]
    [Route("completed/orders/{empid}")]
        public async Task<IEnumerable<Request>> GetOrdersByEmployeeIdSattusCompleted(int empid)
    {
        IEnumerable<Request> orders =await _ordsvs.GetCompletedOrders(empid);
        return orders;
    }

    [HttpGet]
    [Route("orders/details/{requestid}")]
    public  async Task<IEnumerable<OrderDetails>> GetOrderByRequest(int requestid)
    {
        IEnumerable<OrderDetails> orders =await _ordsvs.GetOrderDetails(requestid);
        return orders;
    }

    [HttpGet]
    [Route("approve/{id}/{quantity}")]
    public  async Task<bool> Approve(int id,int quantity)
    {
        bool status =await _ordsvs.Approve(id,quantity);
        return status;
    }
}
