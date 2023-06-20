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
        public IEnumerable<CartItem> GetAll(int empid)
        {
            IEnumerable<CartItem> cartItems= _crtsvs.GetAll(empid);
            return cartItems;
        }

        //get cart details
        [HttpGet]
        [Route("cart/{cartId}")]
        public CartItem Get(int cartId)
        {
            CartItem cartItems= _crtsvs.GetCartItem(cartId);
            return cartItems;
        }


        [HttpPost]
        [Route("addtocart")]
        public bool AddItem( [FromBody] CartItem item)
        {
            bool status=  _crtsvs.AddItem(item);
            return status;
        }

        //delete cartitem
        [HttpDelete]
        [Route("delete/{id}")]
        public bool Delete( int id)
        {
            bool status=  _crtsvs.Delete(id);
            return status;
        }

        //remove all items from cart 
        [HttpDelete]
        [Route("Emptycart/{employeeid}")]
        public bool EmptyCart( int employeeid)
        {
            bool status= _crtsvs.EmptyCart(employeeid);
            return status;
        }

        //update quantity 
        [HttpPut]
        [Route("updatequantity")]
        public bool EmptyCart(CartItem item)
        {
            bool status= _crtsvs.UpdateQuantity(item);
            return status;
        }

        [HttpGet]
        [Route("ChangeStatus")]
        public bool ChangeStatus(ChangeStatus changeStatus){
            bool status= _crtsvs.ChangeStatus(changeStatus);
            return status;  
        }


}