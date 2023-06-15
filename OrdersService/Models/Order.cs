namespace OrdersService.Models;
public class Order{
     public int Id{get;set;}
    public DateTime OrderDate{get;set;}
    public string? Name{get;set;}
    public string? Category{get;set;}
    public int Quantity{get;set;}
    public string? Status{get;set;}
    public int EmployeeId{get;set;}
    public int MaterialId{get;set;}
    
}