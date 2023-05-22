using System.Collections.Generic;
using System.IO;
using System.Runtime.InteropServices.ComTypes;
using System.Collections;
using System.Data;
using AuthService.Models;
using AuthService.Repositories.Interfaces;
using MySql.Data.MySqlClient;
namespace AuthService.Repositories;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using AuthAPI.Context;
using AuthService.Helpers;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Options;
using Microsoft.IdentityModel.Tokens;
public class LoginRepository : ILoginRepository
{
    private IConfiguration _configuration;
    private string _conString;
    private readonly AppSetting _appsettings;
    public LoginRepository(IConfiguration configuration,  IOptions<AppSetting> appsettings) 
    {
         _appsettings = appsettings.Value;
        _configuration = configuration;
        _conString = this._configuration.GetConnectionString("DefaultConnection");
    }
 
    public async Task<AuthenticateResponse> Authenticate(AuthenticateRequest request)
    {
        Console.WriteLine("authenticate method is called");
        Employee employee = await  GetUser(request);
        Console.WriteLine(employee);

        // return null if user not found
        if (employee == null) { return null; }
        // authentication successful so generate jwt token
        var token = await generateJwtToken(employee);
        return new AuthenticateResponse(employee, token);
    }

    private async Task<string> generateJwtToken(Employee employee)

    {
        // generate token that is valid for 7 days
        var tokenHandler = new JwtSecurityTokenHandler();
        var key = System.Text.Encoding.ASCII.GetBytes(_appsettings.Secret);
        var tokenDescriptor = new SecurityTokenDescriptor
        {
        Subject = new ClaimsIdentity(new[] { new Claim("id", employee.EmployeeId.ToString()) }),
             Expires = DateTime.UtcNow.AddDays(7),
            SigningCredentials = new SigningCredentials(new SymmetricSecurityKey(key),
       SecurityAlgorithms.HmacSha256Signature)
        };
        var token = tokenHandler.CreateToken(tokenDescriptor);
        return tokenHandler.WriteToken(token);
    }

    // private async Task<List<Claim>> AllClaims(Employee employee)
    // {
    //     List<Claim> claims = new List<Claim>();
    //     //you can add custom Claims here
    //     claims.Add(new Claim("userId", employee.EmployeeId.ToString()));
    //     List<string> roles = await GetRolesOfEmployees(employee.EmployeeId);
    //     foreach (string role in roles)
    //     {
    //         claims.Add(new Claim("role", role));
    //     }

    //     foreach (string role in roles)
    //     {
    //         if (role == "incharge")
    //         {
    //             int farmerId = await GetIdOfFarmer(user.UserId);
    //             if (farmerId != 0)
    //             {
    //                 claims.Add(new Claim("farmerId", farmerId.ToString()));
    //             }
    //         }

    //         if (role == "admin")
    //         {
    //             int adminId = await GetIdOfAdmin(user.UserId);
    //             if (adminId != 0)
    //             {
    //                 claims.Add(new Claim("adminId", adminId.ToString()));
    //             }
    //         }

    //         if (role == "transport")
    //         {
    //             int transportId = await GetIdOfTransport(user.UserId);
    //             if (transportId != 0)
    //             {
    //                 claims.Add(new Claim("transportId", transportId.ToString()));
    //             }
    //         }

    //         if (role == "employee")
    //         {
    //             int employeeId = await GetIdOfEmployee(user.UserId);
    //             if (employeeId != 0)
    //             {
    //                 claims.Add(new Claim("employeeId", employeeId.ToString()));
    //             }
    //         }

    //         if (role == "merchant")
    //         {
    //             int merchantId = await GetIdOfMerchant(user.UserId);
    //             if (merchantId != 0)
    //             {
    //                 claims.Add(new Claim("merchantId", merchantId.ToString()));
    //             }
    //         }
    //     }
    //     return claims;
    // }

      public async Task<Employee> GetUser(AuthenticateRequest request)
    {
        using (var context = new UserContext(_configuration))
        {
            var employee = await context.employees.FirstOrDefaultAsync(u => u.ContactNumber == request.ContactNumber && u.password == request.Password);
            return employee;
        }
    }

//   private async Task<List<string>> GetRolesOfEmployees(int empid)
//     {
//         try
//         {
//             using (var context = new UserContext(_configuration))
//             {
//                 var roles = await (from employees in context.employees
//                                    join userRole in context.UserRoles on role.RoleId equals userRole.RoleId
//                                    where userRole.UserId == userId
//                                    select role.RoleName).ToListAsync();

//                 foreach (var role in roles)
//                 {
//                     Console.WriteLine(role);
//                 }
//                 return roles;
//             }
//         }
//         catch (Exception e)
//         {
//             throw e;
//         }
//     }


}