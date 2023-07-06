using System.Collections.Generic;
using Microsoft.AspNetCore.Mvc;
using OrdersService.Models;
using OrdersService.Services.Interfaces;
namespace OrdersService.Controllers;

[ApiController]
[Route("/api/[controller]")]
public class CartsController : ControllerBase
{
    private readonly ICartService _crtsvs;
    public CartsController(ICartService crtsvs)
    {
        _crtsvs = crtsvs;
    }
    //get order history of supervisors
    [HttpGet]
    [Route("carts/{empid}")]
    public async Task<IEnumerable<CartItem>> GetAll(int empid)
    {
        IEnumerable<CartItem> cartItems =await _crtsvs.GetAll(empid);
        return cartItems;
    }

    //get cart details
    [HttpGet]
    [Route("cart/{cartId}")]
    public async Task<CartItem> Get(int cartId)
    {
        CartItem cartItems =await _crtsvs.GetCartItem(cartId);
        return cartItems;
    }


    [HttpPost]
    [Route("addtocart")]
    public async Task<bool> AddItem([FromBody] CartItem item)
    {
        bool status =await _crtsvs.AddItem(item);
        return status;
    }

    //delete cartitem
    [HttpDelete]
    [Route("delete/{id}")]
    public async Task<bool> Delete(int id)
    {
        bool status =await _crtsvs.Delete(id);
        return status;
    }

    //remove all items from cart 
    [HttpDelete]
    [Route("Emptycart/{employeeid}")]
    public async Task<bool> EmptyCart(int employeeid)
    {
        bool status =await _crtsvs.EmptyCart(employeeid);
        return status;
    }

    //update quantity 
    [HttpPut]
    [Route("updatequantity")]
    public async Task<bool> EmptyCart(CartItem item)
    {
        bool status =await _crtsvs.UpdateQuantity(item);
        return status;
    }

    [HttpPut]
    [Route("ChangeStatus")]
    public async Task<bool> ChangeStatus(ChangeStatus changeStatus)
    {
        bool status =await _crtsvs.ChangeStatus(changeStatus);
        return status;
    }


}