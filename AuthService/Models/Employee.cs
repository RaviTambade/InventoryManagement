namespace AuthService.Models;
public class Employee{
    public int EmployeeId{get;set;}
    public string EmployeeFirstName{get;set;}
    public string EmployeeLastName{get;set;} 
    public string ContactNumber{get;set;}
    public string email{get;set;}
    public string password{get;set;}
    public string ImgUrl{get;set;}
    public string Gender{get;set;}  
    public string Department{get;set;}
    public string Role{get;set;}
    public int DepartmentId{get;set;}
    public int RoleId{get;set;}
    public int GenderId{get;set;}
    
}