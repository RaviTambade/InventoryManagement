using Microsoft.AspNetCore.Mvc;
using MaterialRequest.Models;
using MaterialRequest.Services.Interfaces;

namespace MaterialRequest.Controllers;

[ApiController]
[Route("[controller]")]
public class InitialRequestController : ControllerBase
{

    private readonly IInitialRequestService _svs;
    public InitialRequestController(IInitialRequestService svs)
    {
        _svs = svs;
    }
    public async Task<List<InitialRequestItem>> GetAll(int empid)
    {
        List<InitialRequestItem> items =await _svs.GetAll(empid);
        return items;
    }

    [HttpGet]
    [Route("cart/{cartId}")]
    public async Task<InitialRequestItem> Get(int cartId)
    {
        InitialRequestItem item =await _svs.GetById(cartId);
        return item;
    }


    [HttpPost]
    [Route("addtocart")]
    public async Task<bool> Insert([FromBody] InitialRequestItem item)
    {
        bool status =await _svs.Insert(item);
        return status;
    }

    [HttpDelete]
    [Route("delete/{id}")]
    public async Task<bool> Delete(int id)
    {
        bool status =await _svs.Delete(id);
        return status;
    }

    //remove all items from cart 
    [HttpDelete]
    [Route("Emptycart/{employeeid}")]
    public async Task<bool> EmptyCart(int employeeid)
    {
        bool status =await _svs.RemoveAll(employeeid);
        return status;
    }

    //update quantity 
    [HttpPut]
    [Route("updatequantity")]
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
