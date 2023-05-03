namespace InventoryManagement.Models;
public class Order{
    public int OrderId{get;set;}
    public string EmployeeFirstName{get;set;}
    public string EmployeeLastName{get;set;}
    public DateTime OrderDate{get;set;}
    public string status{get;set;}
    public int MaterialId{get;set;}
    public string MaterialName{get;set;}
    public string MaterialType{get;set;}
    public int Quantity{get;set;}

}