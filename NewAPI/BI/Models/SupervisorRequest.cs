namespace Transflower.InventoryManagement.BIService.Models;

public class SupervisorRequest
{
    public int TotalRequestCount { get; set; }
    public int FrequentlyRequestedMaterial{ get; set; }
    public int HighestRequestInADay { get; set; }  
}