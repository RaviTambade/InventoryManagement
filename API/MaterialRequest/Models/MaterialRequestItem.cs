namespace OrdersService.Models;
public class OrderDetails{
    public int Id{get;set;}
    public int MaterialId{get;set;}
    public DateTime OrderDate{get;set;}
    public string? Title{get;set;}
    public string? Category{get;set;}
    public int Quantity{get;set;}
    public int AvailableQuantity{get;set;}
    public string? Status{get;set;}
    public string Department{get;set;}    
    public string FirstName{get;set;}   
    public string LastName{get;set;}    
    public string ImageUrl{get;set;}

}