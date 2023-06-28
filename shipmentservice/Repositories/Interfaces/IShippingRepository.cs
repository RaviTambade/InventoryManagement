using System.Collections;
using System.Net.Http.Headers;
using shipmentservice.Models;
namespace shipmentservice.Repositories.Interfaces;
public interface IShippingRepository
{
    IEnumerable<Shipping> GetShipments(int empid);

}