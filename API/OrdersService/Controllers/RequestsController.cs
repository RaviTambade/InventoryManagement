using System.Collections.Generic;
using Microsoft.AspNetCore.Mvc;
using OrdersService.Models;
using OrdersService.Services.Interfaces;
namespace OrdersService.Controllers;

[ApiController]
[Route("/api/[controller]")]
public class RequestsController : ControllerBase
{
    private readonly IRequestService _reqsvs;
    public RequestsController(IRequestService reqsvs)
    {
        _reqsvs = reqsvs;
    }
    [HttpPut]
    [Route("request/cart")]
    public async Task<bool> updateCartItemFromRequest(CartItem cartItem)
    {
        bool status =await _reqsvs.UpdateQuantityOfRequestedCartItme(cartItem);
        return status;
    }

    //get request history of department 
    [HttpGet]
    [Route("requests/{empid}")]
    public async Task<IEnumerable<RequestDetails>> GetAllRequests(int empid)
    {
        IEnumerable<RequestDetails> requests =await _reqsvs.GetAllRequests(empid);
        return requests;
    }
    //get request history of supervisors
    [HttpGet]
    [Route("request/{empid}")]
    public async Task<IEnumerable<RequestDetails>> GetAllRequest(int empid)
    {
        IEnumerable<RequestDetails> requests =await _reqsvs.GetAllRequest(empid);
        return requests;
    }
    //request IDs for Store Manager
    [HttpGet]
    [Route("requestid/{empid}")]
    public async Task<IEnumerable<Request>> GetRequestId(int empid)
    {
        IEnumerable<Request> requests =await _reqsvs.GetRequestId(empid);
        return requests;
    }
  
    //request details for supervisor
    [HttpGet]
    [Route("requestdetails/{requestid}")]
    public async Task<IEnumerable<Request>> GetRequestDetails(int requestid)
    {
        IEnumerable<Request> requests =await _reqsvs.GetRequestDetails(requestid);
        return requests;
    }
  
    //remove request
    [HttpDelete]
    [Route("delete/request/{requestid}")]
    public async Task<bool> DeleteRequest(int requestid)
    {
        bool status =await _reqsvs.DeleteRequest(requestid);
        return status;
    }

    [HttpGet]
    [Route("request/cart/{cartId}")]
    public async Task<CartItem> GetCartItem(int cartId)
    {
        CartItem cartItems=await _reqsvs.GetCartItemFromRequest(cartId);
        return cartItems;
    }


    

}