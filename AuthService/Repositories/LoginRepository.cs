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
}