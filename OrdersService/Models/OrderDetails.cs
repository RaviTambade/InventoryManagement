namespace OrdersService.Models;
public class OrderDetails{
    public int Id{get;set;}
    public DateTime OrderDate{get;set;}
    public string? Name{get;set;}
    public string? Category{get;set;}
    public int Quantity{get;set;}
    public string? Status{get;set;}
    public string Department{get;set;}    
    public string EmployeeFirstName{get;set;}   
    public string EmployeeLastName{get;set;}    
 
    public string ImageUrl{get;set;}

}