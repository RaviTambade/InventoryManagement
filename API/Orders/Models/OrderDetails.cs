namespace Transflower.Orders.Models;
public class OrderDetails{
    public int Id{get;set;}
    public int MaterialId{get;set;}
    public DateTime OrderDate{get;set;}
    public string? Name{get;set;}
    public string? Category{get;set;}
    public int Quantity{get;set;}
    public int AvailableQuantity{get;set;}
    public string? Status{get;set;}
    public bool ItemStatus{get;set;}
    public string Department{get;set;}    
    public int UserId{get;set;}
    public string ImageUrl{get;set;}

}