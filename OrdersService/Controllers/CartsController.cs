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
        [Route("cart/{empid}")]
        public IEnumerable<CartItem> GetAll(int empid)
        {
            IEnumerable<CartItem> cartItems= _crtsvs.GetAll(empid);
            return cartItems;
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

        //remove all items from cart 
        [HttpDelete]
        [Route("Emptycart/{employeeid}")]
        public bool EmptyCart( int employeeid)
        {
            bool status= _crtsvs.EmptyCart(employeeid);
            return status;
        }


}