namespace Transflower.InventoryManagement.BIService.Models;

public class OrderCount
{
    public int TodaysOrders { get; set; }
    public int YesterdaysOrders { get; set; }
    public int WeekOrders { get; set; }
    public int MonthOrders { get; set; }
}