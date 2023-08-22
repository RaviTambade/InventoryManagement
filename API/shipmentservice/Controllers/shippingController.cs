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

    [HttpPost]
    [Route("weeklyreport/{empid}")]
    public async Task<List<TaskReport>> GetWeeklyReports(int empid,Period period)
    {
        List<TaskReport> reports = await _shipsvc.GetWeeklyReports(empid,period);
        return reports;
    }
    [HttpPost]
    [Route("monthlyreport/{empid}")]
    public async Task<List<TaskReport>> GetMonthlyReports(int empid,Period period)
    {
        List<TaskReport> reports = await _shipsvc.GetMonthlyReports(empid,period);
        return reports;
    }

    [HttpGet]
    [Route("yearlyreport/{empid}/{year}")]
    public async Task<List<TaskReport>> GetYearlyReports(int empid,string year)
    {
        List<TaskReport> reports = await _shipsvc.GetYearlyReports(empid,year);
        return reports;
    }
}
