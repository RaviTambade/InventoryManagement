using System.Collections.Generic;
using Microsoft.AspNetCore.Mvc;
using MaterialRequest.Models;
using MaterialRequest.Services.Interfaces;

namespace MaterialRequest.Controllers;

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
        public async Task<IEnumerable<Request>> GetOrders(int empid)
    {
        IEnumerable<Request> orders =await _ordsvs.GetOrders(empid);
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




//     [HttpGet]
//     [Route("details/{empid}")]
//     public  async Task<IEnumerable<OrderDetails>> GetAllOrders(int empid)
//     {
//         IEnumerable<OrderDetails> orders =await _ordsvs.GetAllOrders(empid);
//         return orders;
//     }



// // get order details by sending request Id (store Managers)
//     [HttpGet]
//     [Route("details/request/{reqid}")]
//     public  async Task<IEnumerable<OrderDetails>> GetOrderDetailsForStore(int reqid)
//     {
//         IEnumerable<OrderDetails> orders =await _ordsvs.GetOrderDetailsForStore(reqid);
//         return orders;
//     }

//     //Get list of materials ordered in a day
//     // [HttpGet]
//     // [Route("orderedInADay")]
//     // public async Task<IEnumerable<Order>> OrderedMaterialsInADay()
//     // {
//     //     IEnumerable<Order> orders =await _ordsvs.OrderedMaterialsInADay();
//     //     return orders;
//     // }

//      //Get list of materials ordered from date to to date
//     // [HttpPost]
//     // [Route("orderedFromDateToDate")]
//     // public  async Task<IEnumerable<Order>> GetOrders([FromBody] Period date)
//     // {
//     //     IEnumerable<Order> orders =await _ordsvs.GetOrders(date);
//     //     return orders;
//     // }

//     [HttpGet]
//     [Route("order/{empid}")]
//     public async Task<bool> AddOrder(int empid)
//     {
//         bool status =await _ordsvs.Order(empid);
//         return status;
//     }
//     [HttpDelete]
//     [Route("order/{orderid}")]
//     public async Task<bool> DeleteOrder(int orderid)
//     {
//         bool status =await _ordsvs.DeleteOrder(orderid);
//         return status;
//     }

//     //get request history For storemanagers id by sending requestids
//     [HttpPost]
//     [Route("requestdetails")]
//     public async Task<IEnumerable<RequestDetails>> GetDetails(int[]id )
//     {
//         IEnumerable<RequestDetails> requests =await _ordsvs.GetRequestDetails(id);
//         return requests;
//     }

}
