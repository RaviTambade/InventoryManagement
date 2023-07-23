using System.Collections.Generic;
using Microsoft.AspNetCore.Mvc;
using Orders.Models;
using Orders.Services.Interfaces;

namespace Orders.Controllers;

[ApiController]
[Route("/api/[controller]")]
public class OrderController : ControllerBase
{
    private readonly IOrderService _ordsvs;
    public OrderController(IOrderService ordsvs)
    {
        _ordsvs = ordsvs;
    }
        //get order history of store managers
    
    [HttpGet]
    [Route("orders/{empid}")]
        public async Task<IEnumerable<Order>> GetOrders(int empid)
    {
        IEnumerable<Order> orders =await _ordsvs.GetOrders(empid);
        return orders;
    }

    [HttpGet]
    [Route("completed/orders/{empid}")]
        public async Task<IEnumerable<Order>> GetCompletedOrders(int empid)
    {
        IEnumerable<Order> orders =await _ordsvs.GetCompletedOrders(empid);
        return orders;
    }

    [HttpGet]
    [Route("orders/details/{requestid}/{storemanagerid}")]
    public  async Task<IEnumerable<OrderDetails>> GetOrderDetails(int requestid,int storemanagerid)
    {
        IEnumerable<OrderDetails> orders =await _ordsvs.GetOrderDetails(requestid,storemanagerid);
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
