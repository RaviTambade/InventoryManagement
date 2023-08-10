using System.Data;
using System.Collections.Generic;
using System.Collections;
using System.Threading.Tasks;
using shipmentservice.Models;
using shipmentservice.Repositories.Interfaces;
using shipmentservice.Services.Interfaces;
namespace shipmentservice.Services;
public class ShippingService : IShippingService
{
    private readonly IShippingRepository _repo;
    public ShippingService(IShippingRepository repo)
    {
        _repo = repo;
    }

    public async Task<Shipping> GetShipments(int empid)=>await _repo.GetShipments(empid);
    public async Task<List<Shipping>> GetShipped(int empid)=>await _repo.GetShipped(empid);

    public async Task<List<ShippingDetails>> GetShippingDetails(int taskid)=>await _repo.GetShippingDetails(taskid);
    public async Task<bool> UpdateStatus(int id)=>await _repo.UpdateStatus(id);
    public async Task<bool> ShipmentDeliver(int id)=>await _repo.ShipmentDeliver(id);
    public async Task<List<TaskReport>> GetWeeklyReports(int empid,Period period)=>await _repo.GetWeeklyReports(empid,period);
    public async Task<List<TaskReport>> GetMonthlyReports(int empid,Period period)=>await _repo.GetMonthlyReports(empid,period);
    public async Task<List<TaskReport>> GetYearlyReports(int empid,string year)=>await _repo.GetYearlyReports(empid,year);

}