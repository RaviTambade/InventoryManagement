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

    public IEnumerable<Shipping> GetShipments(int empid)=> _repo.GetShipments(empid);

}