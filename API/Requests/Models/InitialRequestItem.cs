namespace Requests.Models;
public class InitialRequestItem{
    public int Id{get;set;}
    public int RequestId{get;set;}
    public int MaterialId{get;set;}
    public string? Category{get;set;}
    public int Quantity{get;set;}  
    public int EmployeeId{get;set;}  
}
