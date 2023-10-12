namespace Transflower.InventoryManagement.BIService.Models;

public class TaskCount
{
    public int TodaysRequests { get; set; }
    public int YesterdaysRequests { get; set; }
    public int WeekRequests { get; set; }
    public int MonthRequests { get; set; }
}