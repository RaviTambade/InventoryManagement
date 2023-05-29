namespace OrdersService.Models;
public class Order{
     public int Id{get;set;}
    public int MaterialId{get;set;}
    public string Name{get;set;}
    public string Type{get;set;}
    public int Quantity{get;set;}
    public string Status{get;set;}
    
}