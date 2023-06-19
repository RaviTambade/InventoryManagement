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
        [HttpGet]
        [Route("request/cart/{cartId}")]
        public CartItem GetCartItem(int cartId)
        {
            CartItem cartItems= _crtsvs.GetCartItemFromRequest(cartId);
            return cartItems;
        }

        [HttpPut]
        [Route("request/cart")]
        public bool updateCartItemFromRequest(CartItem cartItem)
        {
            bool status= _crtsvs.UpdateQuantityOfRequestedCartItme(cartItem);
            return status;
        }


        //get request history of employee
        [HttpGet]
        [Route("requests/{empid}")]
        public IEnumerable<Request> GetAllRequests(int empid)
        {
            IEnumerable<Request> requests= _crtsvs.GetAllRequests(empid);
            return requests;
        }

        [HttpGet]
        [Route("requestdetails/{requestid}")]
        public IEnumerable<Request> GetRequestDetails(int requestid)
        {
            IEnumerable<Request> requests= _crtsvs.GetRequestDetails(requestid);
            return requests;
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

        //remove request
        [HttpDelete]
        [Route("delete/request/{requestid}")]
        public bool DeleteRequest( int requestid)
        {
            bool status=  _crtsvs.DeleteRequest(requestid);
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


}