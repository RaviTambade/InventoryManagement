namespace Transflower.InventoryManagement.InitialRequests.Models;
public class InitialRequestItem{
    public int Id{get;set;}
    public int RequestId{get;set;}
    public string? Name{get;set;}
    public string? Category{get;set;}
    public string? ImageUrl{get;set;}
    public int Quantity{get;set;}  
    public int EmployeeId{get;set;}  
}
