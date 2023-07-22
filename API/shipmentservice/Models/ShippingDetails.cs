namespace shipmentservice.Models;
public class ShippingDetails
{
    public int OrderId { get; set; }
    public int TaskId { get; set; }
    public string Section { get; set; }
    public string Department { get; set; }
    public string Status {get;set;}
}