namespace OrdersService.Models;
public class Request{
    public int RequestId{get;set;}
    public DateTime Date{get;set;}
    public string Status{get;set;}

    public int MaterialId{get;set;}
    public string Category{get;set;}
    public int Quantity{get;set;}
}