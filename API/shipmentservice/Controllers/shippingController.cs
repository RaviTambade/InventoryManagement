using System.Collections.Generic;
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
    public async Task<Shipping> GetAll(int empid)
    {
        Shipping shipment = await _shipsvc.GetShipments(empid);
        return shipment;
    }

    [HttpGet]
    [Route("getshipped/{empid}")]
    public async Task<List<Shipping>> GetShipped(int empid)
    {
        List<Shipping> shipment = await _shipsvc.GetShipped(empid);
        return shipment;
    }


    [HttpGet]
    [Route("getshippingdetails/{taskid}")]
    public async Task<List<ShippingDetails>> GetDetails(int taskid)
    {
        List<ShippingDetails> shippingDetails = await _shipsvc.GetShippingDetails(taskid);
        return shippingDetails;
    }

    [HttpGet]
    [Route("updatestatus/{id}")]
    public async Task<bool> UpdateStatus(int id)
    {
        bool status = await _shipsvc.UpdateStatus(id);
        return status;
    }

        [HttpGet]
    [Route("deliver/{id}")]
    public async Task<bool> ShipmentDeliver(int id)
    {
        bool status = await _shipsvc.ShipmentDeliver(id);
        return status;
    }
}
