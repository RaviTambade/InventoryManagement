using System.Data;
using System.Collections.Generic;
using System.Collections;
using System.Threading.Tasks;
using Shipments.Models;
using Shipments.Repositories.Interfaces;
using Shipments.Services.Interfaces;
namespace Shipments.Services;
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

}