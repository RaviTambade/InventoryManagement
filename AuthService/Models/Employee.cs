using System.ComponentModel.DataAnnotations.Schema;
using System.Reflection.PortableExecutable;
namespace AuthService.Models;
public class Employee{
    
    [Column("employee_id")]
    public int EmployeeId{get;set;}

    [Column("empfirst_name")]
    public string EmployeeFirstName{get;set;}

    [Column("emplast_name")]
    public string EmployeeLastName{get;set;} 

    [Column("contact_number")]
    public string ContactNumber{get;set;}

    [Column("birth_date")]
    public string BirthDate{get;set;}

    [Column("hire_date")]
    public string HireDate{get;set;}

    [Column("email")]
    public string Email{get;set;}

    [Column("password")]
    public string Password{get;set;}

    [Column("photo")]
    public string ImgUrl{get;set;}

[Column("department_id")]
    public Int32 DepatmentId{get;set;}

    [Column("role_id")]
    public Int32 RoleId{get;set;}

    [Column("gender_id")]
    public Int32 GenderId{get;set;}
}