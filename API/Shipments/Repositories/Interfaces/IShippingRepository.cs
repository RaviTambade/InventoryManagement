using System.Collections.Generic;
using System.Collections;
using System.Net.Http.Headers;
using Shipments.Models;
namespace Shipments.Repositories.Interfaces;
public interface IShippingRepository
{
    Task <Shipping> GetShipments(int empid);
    Task<List<Shipping>> GetShipped(int empid);
    Task<List<ShippingDetails>> GetShippingDetails(int taskid);
    Task<bool> UpdateStatus(int id);
    Task<bool> ShipmentDeliver(int id);

}