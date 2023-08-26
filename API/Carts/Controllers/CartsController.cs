using Microsoft.AspNetCore.Mvc;
using Transflower.Carts.Models;
using Transflower.Carts.Services.Interfaces;

namespace Transflower.Carts.Controllers;

[ApiController]
[Route("/api/[controller]")]
public class CartsController : ControllerBase
{

    private readonly ICartService _svs;
    public CartsController(ICartService svs)
    {
        _svs = svs;
    }
    [HttpGet]
    [Route("items/{empid}")]
    public async Task<List<Cart>> GetAll(int empid)
    {
        List<Cart> items =await _svs.GetAll(empid);
        return items;
    }

    [HttpGet]
    [Route("item/{cartId}")]
    public async Task<Cart> Get(int cartId)
    {
        Cart item =await _svs.GetById(cartId);
        return item;
    }


    [HttpPost]
    [Route("item")]
    public async Task<bool> Insert([FromBody]Cart item)
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
    public async Task<bool> UpdateQuantity(Cart item)
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
