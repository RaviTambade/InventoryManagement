using Microsoft.AspNetCore.Mvc;
using MaterialRequest.Models;
using MaterialRequest.Services.Interfaces;

namespace MaterialRequest.Controllers;

[ApiController]
[Route("/api/[controller]")]
public class RequestController : ControllerBase
{

    private readonly IRequestService _reqsvs;
    public RequestController(IRequestService reqsvs)
    {
        _reqsvs = reqsvs;
    }

        //get request history of department 
    [HttpGet]
    [Route("requests/{empid}")]
    public async Task<List<Request>> GetAllRequests(int empid)
    {
        List<Request> requests =await _reqsvs.GetAllRequests(empid);
        return requests;
    }

    [HttpGet]
    [Route("requests/{storemanagerid}")]
    public async Task<List<Request>> GetAllRequests(int storemanagerid)
    {
        List<Request> requests =await _reqsvs.GetAllRequests(storemanagerid);
        return requests;
    }
    [HttpGet]
    [Route("request/{empid}")]
    public async Task<bool> Request(int empid)
    {
       bool status =await _reqsvs.Request(empid);
       return status;
    }

    // [HttpPut]
    // [Route("request/cart")]
    // public async Task<bool> updateCartItemFromRequest(CartItem cartItem)
    // {
    //     bool status =await _reqsvs.UpdateQuantityOfRequestedCartItme(cartItem);
    //     return status;
    // }


    // //get request history of supervisors
    // [HttpGet]
    // [Route("request/{empid}")]
    // public async Task<IEnumerable<RequestDetails>> GetAllRequest(int empid)
    // {
    //     IEnumerable<RequestDetails> requests =await _reqsvs.GetAllRequest(empid);
    //     return requests;
    // }
    // //request IDs for Store Manager
    // [HttpGet]
    // [Route("requestid/{empid}")]
    // public async Task<IEnumerable<Request>> GetRequestId(int empid)
    // {
    //     IEnumerable<Request> requests =await _reqsvs.GetRequestId(empid);
    //     return requests;
    // }
  
    // //request details for supervisor
    // [HttpGet]
    // [Route("requestdetails/{requestid}")]
    // public async Task<IEnumerable<Request>> GetRequestDetails(int requestid)
    // {
    //     IEnumerable<Request> requests =await _reqsvs.GetRequestDetails(requestid);
    //     return requests;
    // }
  
    // //remove request
    // [HttpDelete]
    // [Route("delete/request/{requestid}")]
    // public async Task<bool> DeleteRequest(int requestid)
    // {
    //     bool status =await _reqsvs.DeleteRequest(requestid);
    //     return status;
    // }

    // [HttpGet]
    // [Route("request/cart/{cartId}")]
    // public async Task<CartItem> GetCartItem(int cartId)
    // {
    //     CartItem cartItems=await _reqsvs.GetCartItemFromRequest(cartId);
    //     return cartItems;
    // }


}
