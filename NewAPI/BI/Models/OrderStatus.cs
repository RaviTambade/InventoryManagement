namespace Transflower.InventoryManagement.BIService.Models;

public class OrderStatus
{
    public int TotalOrders { get; set; }
    public int TodaysOrders { get; set; }
    public int PendingOrders { get; set; }
    public int CompletedOrders { get; set; }
    public int CancelledOrders { get; set; }
}