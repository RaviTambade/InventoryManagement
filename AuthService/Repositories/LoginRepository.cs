using AuthService.Models;
using AuthService.Repositories.Interfaces;
using AuthService.Context;
using AuthService.Helpers;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Options;
using Microsoft.IdentityModel.Tokens;

namespace AuthService.Repositories;
public class LoginRepository : ILoginRepository
{
    private IConfiguration _configuration;
    private readonly AppSettings _appsettings;
    public LoginRepository(IConfiguration configuration, IOptions<AppSettings> appsettings)
    {
        _appsettings = appsettings.Value;
        _configuration = configuration;

    }
    public async Task<AuthenticateResponse> Authenticate(AuthenticateRequest request)
    {
        Employee employee = await Get(request);
        // return null if user not found
        if (employee == null) { return null; }
        // authentication successful so generate jwt token
        var token = await generateJwtToken(employee);
        return new AuthenticateResponse(token);
    }

    public async Task<Employee> Get(AuthenticateRequest request)
    {
        using (var context = new UserContext(_configuration))
        {
            var employee = await context.employees.FirstOrDefaultAsync(u => u.ContactNumber == request.contactnumber && u.Password == request.password);
            return employee;
        }
    }
    
    private async Task<string> generateJwtToken(Employee employee)
    {
        // generate token that is valid for 7 days
        var tokenHandler = new JwtSecurityTokenHandler();
        var key = System.Text.Encoding.ASCII.GetBytes(_appsettings.Secret);
        var tokenDescriptor = new SecurityTokenDescriptor
        {
            Subject = new ClaimsIdentity(await Claims(employee)),
            Expires = DateTime.UtcNow.AddDays(7),
            SigningCredentials = new SigningCredentials(new SymmetricSecurityKey(key),
       SecurityAlgorithms.HmacSha256Signature)
        };
        var token = tokenHandler.CreateToken(tokenDescriptor);
        return tokenHandler.WriteToken(token);
    }

    private async Task<List<Claim>> Claims(Employee employee)
    {
        List<Claim> claims = new List<Claim>();
        //you can add custom Claims here
        claims.Add(new Claim("empId", employee.EmployeeId.ToString()));
        List<string> roles = await GetRolesOfEmployee(employee.EmployeeId);
        foreach (string role in roles)
        {
            claims.Add(new Claim("role", role));
        }
        return claims;
    }
    private async Task<List<string>> GetRolesOfEmployee(int empid){
        try
        {
            using (var context = new UserContext(_configuration)){
                var roles = await (from role in context.Roles
                                   join employees in context.employees on role.RoleId equals employees.RoleId
                                   where employees.EmployeeId == empid
                                   select role.RoleName).ToListAsync();
                return roles;
            }
        }
        catch (Exception e)
        {
            throw e;
        }
    }

}