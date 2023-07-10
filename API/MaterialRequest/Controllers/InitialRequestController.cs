using Microsoft.AspNetCore.Mvc;
using MaterialRequest.Models;
using MaterialRequest.Services.Interfaces;

namespace MaterialRequest.Controllers;

[ApiController]
[Route("/api/[controller]")]
public class InitialRequestController : ControllerBase
{

    private readonly IInitialRequestService _svs;
    public InitialRequestController(IInitialRequestService svs)
    {
        _svs = svs;
    }
    [HttpGet]
    [Route("items/{empid}")]
    public async Task<List<InitialRequestItem>> GetAll(int empid)
    {
        List<InitialRequestItem> items =await _svs.GetAll(empid);
        return items;
    }

    [HttpGet]
    [Route("item/{cartId}")]
    public async Task<InitialRequestItem> Get(int cartId)
    {
        InitialRequestItem item =await _svs.GetById(cartId);
        return item;
    }


    [HttpPost]
    [Route("item")]
    public async Task<bool> Insert([FromBody] InitialRequestItem item)
    {
        bool status =await _svs.Insert(item);
        return status;
    }

    [HttpDelete]
    [Route("item/{id}")]
    public async Task<bool> Delete(int id)
    {
        bool status =await _svs.Delete(id);
        return status;
    }

    //remove all items from cart 
    [HttpDelete]
    [Route("items/{employeeid}")]
    public async Task<bool> EmptyCart(int employeeid)
    {
        bool status =await _svs.RemoveAll(employeeid);
        return status;
    }

    //update quantity 
    [HttpPut]
    [Route("item")]
    public async Task<bool> UpdateQuantity(InitialRequestItem item)
    {
        bool status =await _svs.UpdateQuantity(item);
        return status;
    }

    [HttpPut]
    [Route("ChangeStatus")]
    public async Task<bool> ChangeStatus(ChangeStatus changeStatus)
    {
        bool status =await _svs.ChangeStatus(changeStatus);
        return status;
    }

}
