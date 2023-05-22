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
using AuthService.Helpers;
using Microsoft.Extensions.Options;
using Microsoft.IdentityModel.Tokens;
public class LoginRepository : ILoginRepository
{
    private IConfiguration _configuration;
    private string _conString;
    public LoginRepository(IConfiguration configuration)
    {
        _configuration = configuration;
        _conString = this._configuration.GetConnectionString("DefaultConnection");
    }
    public bool Login(Credential credential)
    {
        bool status = false;
        MySqlConnection con = new MySqlConnection();
        con.ConnectionString = _conString;
        try
        {
            string query = "SELECT EXISTS(SELECT * FROM employees where email='" + credential.Email + "' and password='" + credential.Password+ "')";
            con.Open();
            MySqlCommand command = new MySqlCommand(query, con);
            MySqlDataReader reader = command.ExecuteReader();
            reader.Read();
            if ((Int64)reader[0] == 1)
            {
                status = true;
            }
            reader.Close();
        }
        catch (Exception e)
        {
            throw e;
        }
        finally
        {
            con.Close();
        }
        return status;
    }


    public async Task<AuthenticateResponse> Authenticate(AuthenticateRequest request)
    {
        Console.WriteLine("authenticate method is called");
        User user =  GetUser(request);


        // return null if user not found
        if (user == null) { return null; }
        // authentication successful so generate jwt token
        var token = await generateJwtToken(user);
        return new AuthenticateResponse(user, token);
    }

    private async Task<string> generateJwtToken(User user)

    {
        // generate token that is valid for 7 days
        var tokenHandler = new JwtSecurityTokenHandler();
        var key = System.Text.Encoding.ASCII.GetBytes(_appsettings.Secret);
        var tokenDescriptor = new SecurityTokenDescriptor
        {
            Subject = new ClaimsIdentity(await AllClaims(user)),
            Expires = DateTime.UtcNow.AddDays(7),
            SigningCredentials = new SigningCredentials(new SymmetricSecurityKey(key),
       SecurityAlgorithms.HmacSha256Signature)
        };
        var token = tokenHandler.CreateToken(tokenDescriptor);
        return tokenHandler.WriteToken(token);
    }

    private async Task<List<Claim>> AllClaims(User user)
    {
        List<Claim> claims = new List<Claim>();
        //you can add custom Claims here
        claims.Add(new Claim("userId", user.UserId.ToString()));
        List<string> roles = await GetRolesOfUser(user.UserId);
        foreach (string role in roles)
        {
            claims.Add(new Claim("role", role));
        }

        foreach (string role in roles)
        {
            if (role == "farmer")
            {
                int farmerId = await GetIdOfFarmer(user.UserId);
                if (farmerId != 0)
                {
                    claims.Add(new Claim("farmerId", farmerId.ToString()));
                }
            }

            if (role == "admin")
            {
                int adminId = await GetIdOfAdmin(user.UserId);
                if (adminId != 0)
                {
                    claims.Add(new Claim("adminId", adminId.ToString()));
                }
            }

            if (role == "transport")
            {
                int transportId = await GetIdOfTransport(user.UserId);
                if (transportId != 0)
                {
                    claims.Add(new Claim("transportId", transportId.ToString()));
                }
            }

            if (role == "employee")
            {
                int employeeId = await GetIdOfEmployee(user.UserId);
                if (employeeId != 0)
                {
                    claims.Add(new Claim("employeeId", employeeId.ToString()));
                }
            }

            if (role == "merchant")
            {
                int merchantId = await GetIdOfMerchant(user.UserId);
                if (merchantId != 0)
                {
                    claims.Add(new Claim("merchantId", merchantId.ToString()));
                }
            }
        }
        return claims;
    }

      public async Task<User> GetUser(AuthenticateRequest request)
    {
        using (var context = new UserContext(_configuration))
        {
            var user = await context.Users.FirstOrDefaultAsync(u => u.ContactNumber == request.ContactNumber && u.Password == request.Password);
            return user;
        }
    }

}