namespace Transflower.InventoryManagement.BIService.Models;

public class Request
{
    public int TodaysRequests { get; set; }
    public int TotalRequests { get; set; }
    public int TotalCancelled { get; set; }
    public int TotalDelivered { get; set; }
    public int TotalPending { get; set; }
}