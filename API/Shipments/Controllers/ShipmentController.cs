using Microsoft.AspNetCore.Mvc;
using Transflower.Shipments.Models;
using Transflower.Shipments.Services.Interfaces;

namespace Transflower.Shipments.Controllers;

[ApiController]
[Route("/api/[controller]")]
public class ShipmentController : ControllerBase
{
    private readonly IShippingService _shipsvc;
    public ShipmentController(IShippingService svc)
    {
        _shipsvc=svc;
    }

    [HttpGet]
    [Route("shipments/{employeeId}")]
    public async Task<List<Shipping>> GetAll(int employeeId)
    {
        List<Shipping> shipment = await _shipsvc.GetShipments(employeeId);
        return shipment;
    }

    
         [HttpGet]
    [Route("totaltasks/{id}")]
    public async Task<int> GetTotalTasks(int employeeId)
    {
        int requests=await _shipsvc.GetTotalTasks(employeeId);
        return requests;
    }

    [HttpGet]
    [Route("shippingdetails/{taskId}")]
    public async Task<List<ShippingDetails>> GetDetails(int taskId)
    {
        List<ShippingDetails> shippingDetails = await _shipsvc.GetShippingDetails(taskId);
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
    public async Task<bool> Deliver(int id)
    {
        bool status = await _shipsvc.ShipmentDeliver(id);
        return status;
    }
}
