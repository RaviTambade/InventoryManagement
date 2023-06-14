namespace OrdersService.Models;
public class CartItem{
     public int CartId{get;set;}
    public int MaterialId{get;set;}
    public string? Category{get;set;}
    public int Quantity{get;set;}  
    public int EmployeeId{get;set;}
}