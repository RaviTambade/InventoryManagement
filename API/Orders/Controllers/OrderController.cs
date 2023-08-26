using System.Collections.Generic;
using Microsoft.AspNetCore.Mvc;
using Transflower.Orders.Models;
using Transflower.Orders.Services.Interfaces;

namespace Transflower.Orders.Controllers;

[ApiController]
[Route("/api/[controller]")]
public class OrderController : ControllerBase
{
    private readonly IOrderService _ordsvs;
    public OrderController(IOrderService ordsvs)
    {
        _ordsvs = ordsvs;
    }
    
    [HttpGet]
    [Route("orders/{employeeId}")]
        public async Task<IEnumerable<Order>> GetOrders(int employeeId)
    {
        IEnumerable<Order> orders =await _ordsvs.GetOrders(employeeId);
        return orders;
    }

    [HttpGet]
    [Route("completed/orders/{employeeId}")]
        public async Task<IEnumerable<Order>> GetCompletedOrders(int employeeId)
    {
        IEnumerable<Order> orders =await _ordsvs.GetCompletedOrders(employeeId);
        return orders;
    }

    [HttpGet]
    [Route("orders/details/{requestId}/{storemanagerId}")]
    public  async Task<IEnumerable<OrderDetails>> GetOrderDetails(int requestId,int storemanagerId)
    {
        IEnumerable<OrderDetails> orders =await _ordsvs.GetOrderDetails(requestId,storemanagerId);
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
