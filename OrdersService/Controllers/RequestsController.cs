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
    public bool updateCartItemFromRequest(CartItem cartItem)
    {
        bool status = _reqsvs.UpdateQuantityOfRequestedCartItme(cartItem);
        return status;
    }

    //get request history of department 
    [HttpGet]
    [Route("requests/{empid}")]
    public IEnumerable<RequestDetails> GetAllRequests(int empid)
    {
        IEnumerable<RequestDetails> requests = _reqsvs.GetAllRequests(empid);
        return requests;
    }
    //get request history of supervisors
    [HttpGet]
    [Route("request/{empid}")]
    public IEnumerable<RequestDetails> GetAllRequest(int empid)
    {
        IEnumerable<RequestDetails> requests = _reqsvs.GetAllRequest(empid);
        return requests;
    }

    [HttpGet]
    [Route("requestdetails/{requestid}")]
    public IEnumerable<Request> GetRequestDetails(int requestid)
    {
        IEnumerable<Request> requests = _reqsvs.GetRequestDetails(requestid);
        return requests;
    }
    //remove request
    [HttpDelete]
    [Route("delete/request/{requestid}")]
    public bool DeleteRequest(int requestid)
    {
        bool status = _reqsvs.DeleteRequest(requestid);
        return status;
    }

        [HttpGet]
        [Route("request/cart/{cartId}")]
        public CartItem GetCartItem(int cartId)
        {
            CartItem cartItems= _reqsvs.GetCartItemFromRequest(cartId);
            return cartItems;
        }

}