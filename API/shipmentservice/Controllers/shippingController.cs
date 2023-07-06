using Microsoft.AspNetCore.Mvc;
using shipmentservice.Models;
using shipmentservice.Services.Interfaces;

namespace shipmentservice.Controllers;

[ApiController]
[Route("/api/[controller]")]
public class ShippingController : ControllerBase
{
    private readonly IShippingService _shipsvc;
    public ShippingController(IShippingService svc)
    {
        _shipsvc=svc;
    }

        [HttpGet]
    [Route("getshipments/{empid}")]
    public  IEnumerable<Shipping> GetAll(int empid)
    {
         IEnumerable<Shipping> shipment = _shipsvc.GetShipments(empid);
        return shipment;
    }
}
