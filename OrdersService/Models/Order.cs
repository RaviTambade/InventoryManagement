namespace OrdersService.Models;
public class Order
{
    public int Id { get; set; }
    public DateTime OrderDate { get; set; }
    public string? Status { get; set; }
    public string? FirstName { get; set; }
    public string? LastName { get; set; }

}