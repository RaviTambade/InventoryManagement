namespace EmployeesService.Models;
public class Employee{
    public int Id{get;set;}
    public string FirstName{get;set;}
    public string LastName{get;set;}
    public string BirthDate{get;set;}
    public string HireDate{get;set;}
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