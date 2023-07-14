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

    public async Task<List<Shipping>> GetShipments(int empid)=>await _repo.GetShipments(empid);
    public async Task<List<ShippingDetails>> GetShippingDetails(int taskid)=>await _repo.GetShippingDetails(taskid);

}