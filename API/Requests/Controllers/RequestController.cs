using System.Collections.Generic;
using Microsoft.AspNetCore.Mvc;
using Transflower.Requests.Models;
using Transflower.Requests.Services.Interfaces;

namespace Requests.Controllers;

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
    public async Task<List<Request>> GetAll(int empid)
    {
        List<Request> requests =await _reqsvs.GetAllRequests(empid);
        return requests;
    }

    [HttpGet]
    [Route("requests/store/{storemanagerid}")]
    public async Task<List<Request>> GetById(int storemanagerid)
    {
        List<Request> requests =await _reqsvs.GetRequests(storemanagerid);
        return requests;
    }
    [HttpGet]
    [Route("request/{empid}")]
    public async Task<bool> Request(int empid)
    {
       bool status =await _reqsvs.Request(empid);
       return status;
    }
    
    [HttpGet]
    [Route("request/item/{id}")]
    public async Task<RequestDetails> GetItem(int id)
    {
        RequestDetails request=await _reqsvs.GetItem(id);
        return request;
    }

    [HttpPut]
    [Route("request/item")]
    public async Task<bool> Update(RequestDetails item)
    {
        bool status =await _reqsvs.UpdateItem(item);
        return status;
    }


    //request details for supervisor
    [HttpGet]
    [Route("requestdetails/{requestid}")]
    public async Task<List<RequestDetails>> GetRequestDetails(int requestid)
    {
        List<RequestDetails> requests =await _reqsvs.GetRequestDetails(requestid);
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

        //remove request
    [HttpDelete]
    [Route("item/{id}")]
    public async Task<bool> DeleteItem(int id)
    {
        bool status =await _reqsvs.DeleteItem(id);  
        return status;
    }

    //remove request
    [HttpDelete]
    [Route("cancel/{requestid}")]
    public async Task<bool> CancelRequest(int requestid)
    {
        bool status =await _reqsvs.CancelRequest(requestid);
        return status;
    }
    [HttpPost]
    [Route("weeklyorders/{id}")]
    public async Task<List<RequestReport>> WeeklyRequests(int id, Period period)
    {
        List<RequestReport> requests =await _reqsvs.WeeklyRequests(id,period);
        return requests;
    }
}
