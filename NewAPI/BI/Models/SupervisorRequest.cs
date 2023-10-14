namespace Transflower.InventoryManagement.BIService.Models;

public class SupervisorRequest
{
    public int TotalRequestCount { get; set; }
    public string FrequentlyRequestedMaterial{ get; set; }
    public int HighestRequestInADay { get; set; }  
}