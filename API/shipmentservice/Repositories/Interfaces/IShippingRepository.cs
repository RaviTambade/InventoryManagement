using System.Collections.Generic;
using System.Collections;
using System.Net.Http.Headers;
using shipmentservice.Models;
namespace shipmentservice.Repositories.Interfaces;
public interface IShippingRepository
{
    Task<List<Shipping>> GetShipments(int empid);
    Task<List<ShippingDetails>> GetShippingDetails(int taskid);
    Task<bool> UpdateStatus(int id);
}