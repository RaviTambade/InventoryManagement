using System.Collections.Generic;
using System.Collections;
using System.Net.Http.Headers;
using shipmentservice.Models;
namespace shipmentservice.Repositories.Interfaces;
public interface IShippingRepository
{
    Task <Shipping> GetShipments(int empid);
    Task<List<Shipping>> GetShipped(int empid);
    Task<List<ShippingDetails>> GetShippingDetails(int taskid);
    Task<bool> UpdateStatus(int id);
    Task<bool> ShipmentDeliver(int id);
    Task<List<TaskReport>> GetWeeklyReports(int empid,Period period);
    Task<List<TaskReport>> GetMonthlyReports(int empid,Period period);
    Task<List<TaskReport>> GetYearlyReports(int empid,string year);

}