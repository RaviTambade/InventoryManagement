namespace MaterialRequest.Models;
public class RequestDetails{
    
    public int Id{get;set;}
    public DateTime Date{get;set;}
    public string Status{get;set;}
    public string Name{get;set;}
    public string Category{get;set;}
    public int Quantity{get;set;}

    public int ShipperId{get;set;}
}
