namespace Transflower.Orders.Models;
public class Request
{
    public int Id { get; set; }
    public DateTime Date { get; set; }
    public string? Status { get; set; }
    public int UserId{get;set;}
}