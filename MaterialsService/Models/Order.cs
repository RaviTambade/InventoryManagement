namespace MaterialsService.Models;
public class Order{
     public int Id{get;set;}
    public string FirstName{get;set;}
    public string LastName{get;set;}
    public DateTime OrderDate{get;set;}
    public string status{get;set;}
    public int MaterialId{get;set;}
    public string MateralName{get;set;}
    public string MaterialType{get;set;}
    public int Quantity{get;set;}
    
}