namespace AuthService.Models

{

    public class AuthenticateResponse{

     public int UserId {get;set;}

     public string ContactNumber{get;set;}

     public string Password{get;set;}


     public string Token {get;set;}



    public AuthenticateResponse(Employee employee, string token){
      UserId =employee.EmployeeId;
      ContactNumber= employee.ContactNumber;
      Password=employee.password;
      Token=token;
    }

    }
    
}