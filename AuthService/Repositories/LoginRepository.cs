using System.Collections.Generic;
using System.IO;
using System.Runtime.InteropServices.ComTypes;
using System.Collections;
using System.Data;
using AuthService.Models;
using AuthService.Repositories.Interfaces;
using MySql.Data.MySqlClient;
namespace AuthService.Repositories;
public class LoginRepository : ILoginRepository
{
    private IConfiguration _configuration;
    private string _conString;
    public LoginRepository(IConfiguration configuration)
    {
        _configuration = configuration;
        _conString = this._configuration.GetConnectionString("DefaultConnection");
    }
}