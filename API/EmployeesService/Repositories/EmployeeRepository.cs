using System.Collections.Generic;
using EmployeesService.Models;
using EmployeesService.Repositories.Interfaces;
using MySql.Data.MySqlClient;
namespace EmployeesService.Repositories;
public class EmployeeRepository : IEmployeeRepository
{
    private IConfiguration _configuration;
    private string _conString;
    public EmployeeRepository(IConfiguration configuration)
    {
        _configuration = configuration;
        _conString = this._configuration.GetConnectionString("DefaultConnection");
    }
    public async Task<IEnumerable<Employee>> GetAll()
    {
        List<Employee> employees = new List<Employee>();
        MySqlConnection con = new MySqlConnection(_conString);
        try
        {
            string query = "select  employees.userid,employees.imageurl,departments.department, roles.role from employees inner join departments on employees.departmentid=departments.id  inner join roles on employees.roleid=roles.id";
            MySqlCommand cmd = new MySqlCommand(query, con);
            await con.OpenAsync();
            MySqlDataReader reader = cmd.ExecuteReader();
            while (await reader.ReadAsync())
            {
                int id = Int32.Parse(reader["userid"].ToString());
                string? imgurl = reader["imageurl"].ToString();
                string? department = reader["department"].ToString();
                string? role = reader["role"].ToString();
                Employee TheEmployee = new Employee
                {
                    UserId = id,
                    Department = department,
                    ImageUrl = imgurl,
                    Role = role,

                };

                employees.Add(TheEmployee);
            }
            await reader.CloseAsync();
        }
        catch (Exception e)
        {
            throw e;
        }
        finally
        {
            await con.CloseAsync();
        }
        return employees;
    }

    public async Task<List<int>> GetAllIds()
    {
        List<int> userid = new List<int>();
        MySqlConnection con = new MySqlConnection(_conString);
        try
        {
            string query = "select userid from employees";
            MySqlCommand cmd = new MySqlCommand(query, con);
            await con.OpenAsync();
            MySqlDataReader reader = cmd.ExecuteReader();
            while (await reader.ReadAsync())
            {
                int id = Int32.Parse(reader["userid"].ToString());

                userid.Add(id);
            }
            await reader.CloseAsync();
        }
        catch (Exception e)
        {
            throw e;
        }
        finally
        {
            await con.CloseAsync();
        }
        return userid;
    }

    public async Task<int> GetTotalEmployeeCount()
    {
        int counts = 0;
        MySqlConnection con = new MySqlConnection(_conString);
        try
        {
            string query = "select count(*) as  counts from employees;";
            MySqlCommand cmd = new MySqlCommand(query, con);
            await con.OpenAsync();
            MySqlDataReader reader = cmd.ExecuteReader();
            while (await reader.ReadAsync())
            {
                counts = Int32.Parse(reader["counts"].ToString()); ;
            }
            await reader.CloseAsync();
        }
        catch (Exception e)
        {
            throw e;
        }
        finally
        {
            await con.CloseAsync();
        }
        return counts;
    }

    public async Task<int> GetTotalEmployeeCountByRole(string role)
    {
        int counts = 0;
        MySqlConnection con = new MySqlConnection(_conString);
        try
        {
            string query = "select count(*) as  counts from employees where roleid=(select id from roles where role =@role);";
            MySqlCommand cmd = new MySqlCommand(query, con);
            cmd.Parameters.AddWithValue("@role",role);
            await con.OpenAsync();
            MySqlDataReader reader = cmd.ExecuteReader();
            while (await reader.ReadAsync())
            {
                counts = Int32.Parse(reader["counts"].ToString()); ;
            }
            await reader.CloseAsync();
        }
        catch (Exception e)
        {
            throw e;
        }
        finally
        {
            await con.CloseAsync();
        }
        return counts;
    }


    public async Task<Employee> GetRole(int id)
    {
        MySqlConnection con = new MySqlConnection(_conString);
        Employee emp = null;
        try
        {
            string query = " select r.role from employees e inner join roles r on r.id = e.id where e.userid=@id";
            MySqlCommand cmd = new MySqlCommand(query, con);
            cmd.Parameters.AddWithValue("@id", id);
            await con.OpenAsync();
            MySqlDataReader reader = cmd.ExecuteReader();
            while (await reader.ReadAsync())
            {
                string role = reader["role"].ToString();

                emp = new Employee()
                {
                    Role = role
                };
            }
            await reader.CloseAsync();
        }
        catch (Exception e)
        {
            throw e;
        }
        finally
        {
            await con.CloseAsync();
        }
        return emp;
    }


    public async Task<Employee> GetById(int employeeId)
    {
        Employee employee = null;
        MySqlConnection con = new MySqlConnection(_conString);
        try
        {
            string query = "select  employees.userid ,employees.imageurl,departments.department, roles.role   from employees   inner join departments on employees.departmentid=departments.id  inner join roles on employees.roleid=roles.id  where employees.id =@employeeId";
            MySqlCommand cmd = new MySqlCommand(query, con);
            cmd.Parameters.AddWithValue("@employeeId", employeeId);
            await con.OpenAsync();
            MySqlDataReader reader = cmd.ExecuteReader();
            while (await reader.ReadAsync())
            {
                int id = Int32.Parse(reader["userid"].ToString());
                string? imgurl = reader["imageurl"].ToString();
                string? department = reader["department"].ToString();
                string? role = reader["role"].ToString();
                employee = new Employee
                {
                    UserId = id,
                    ImageUrl = imgurl,
                    Department = department,
                    Role = role,
                };

            }
            await reader.CloseAsync();
        }
        catch (Exception e)
        {
            throw e;
        }
        finally
        {
            await con.CloseAsync();
        }
        return employee;
    }

    public async Task<bool> Insert(Employee employee)
    {
        bool status = false;
        MySqlConnection con = new MySqlConnection(_conString);
        try
        {
            string query = "INSERT INTO employees(userid,departmentid, roleid,imageurl)VALUES(@userid,@departmentid,@roleid,@imgurl)";
            MySqlCommand cmd = new MySqlCommand(query, con);
            cmd.Parameters.AddWithValue("@userid", employee.UserId);
            cmd.Parameters.AddWithValue("@departmentid", employee.Department);
            cmd.Parameters.AddWithValue("@roleid", employee.Role);
            cmd.Parameters.AddWithValue("@imgurl", employee.ImageUrl);
            await con.OpenAsync();
            int rowsAffected = cmd.ExecuteNonQuery();
            if (rowsAffected > 0)
            {
                status = true;
            }
        }
        catch (Exception e)
        {
            throw e;
        }
        finally
        {
            await con.CloseAsync();
        }
        return status;

    }

    public async Task<bool> Update(Employee employee)
    {
        bool status = false;
        MySqlConnection con = new MySqlConnection(_conString);
        try
        {
            string query = "UPDATE employees SET  departmentid=@departmentid, roleid=@roleid, imageurl=@imgurl, WHERE userid=@userid";
            MySqlCommand cmd = new MySqlCommand(query, con);
            cmd.Parameters.AddWithValue("@userid", employee.UserId);
            cmd.Parameters.AddWithValue("@departmentid", employee.Department);
            cmd.Parameters.AddWithValue("@roleid", employee.Role);
            cmd.Parameters.AddWithValue("@imgurl", employee.ImageUrl);
            await con.OpenAsync();
            int rowsAffected = cmd.ExecuteNonQuery();
            if (rowsAffected > 0)
            {
                status = true;
            }
        }
        catch (Exception e)
        {
            throw e;
        }
        finally
        {
            await con.CloseAsync();
        }
        return status;
    }

    public async Task<IEnumerable<Employee>> GetByDepartment(string theDepartment)
    {
        List<Employee> employees = new List<Employee>();
        MySqlConnection con = new MySqlConnection(_conString);
        try
        {
            string query = "select  employees.userid, employees.imageurl, departments.department, roles.role   from employees  inner join departments on employees.departmentid=departments.id inner join roles on employees.roleid=roles.id  where   departments.department=@department";
            MySqlCommand cmd = new MySqlCommand(query, con);
            cmd.Parameters.AddWithValue("@department", theDepartment);

            await con.OpenAsync();
            MySqlDataReader reader = cmd.ExecuteReader();
            while (await reader.ReadAsync())
            {
                int id = Int32.Parse(reader["userid"].ToString());
                string? imgurl = reader["imageurl"].ToString();
                string? department = reader["department"].ToString();
                string? role = reader["role"].ToString();

                Employee employee = new Employee
                {
                    UserId = id,
                    Department = department,
                    Role = role,
                    ImageUrl = imgurl,
                };

                employees.Add(employee);
            }
            await reader.CloseAsync();
        }
        catch (Exception e)
        {
            throw e;
        }
        finally
        {
            await con.CloseAsync();
        }
        return employees;
    }

    public async Task<IEnumerable<Employee>> GetByRole(string theRole)
    {
        List<Employee> employees = new List<Employee>();
        MySqlConnection con = new MySqlConnection(_conString);
        try
        {
            string query = "select   employees.userid, employees.imageurl, departments.department, roles.role from employees  inner join departments on employees.departmentid=departments.id   inner join roles on employees.roleid=roles.id where roles.role =@role ";
            MySqlCommand cmd = new MySqlCommand(query, con);
            cmd.Parameters.AddWithValue("@role", theRole);

            await con.OpenAsync();
            MySqlDataReader reader = cmd.ExecuteReader();
            while (await reader.ReadAsync())
            {
                int id = Int32.Parse(reader["userid"].ToString());
                string? imgurl = reader["imageurl"].ToString();
                string? department = reader["department"].ToString();
                string? role = reader["role"].ToString();

                Employee employee = new Employee
                {
                    UserId = id,
                    Department = department,
                    Role = role,
                    ImageUrl = imgurl,
                };

                employees.Add(employee);
            }
            await reader.CloseAsync();
        }
        catch (Exception e)
        {
            throw e;
        }
        finally
        {
            await con.CloseAsync();
        }
        return employees;
    }
    public async Task<bool> Delete(int employeeId)
    {
        bool status = false;
        MySqlConnection con = new MySqlConnection(_conString);
        try
        {
            string query = "DELETE FROM employees WHERE userid=@empid";
            MySqlCommand cmd = new MySqlCommand(query, con);
            cmd.Parameters.AddWithValue("@empid", employeeId);
            await con.OpenAsync();
            int rowsAffected = cmd.ExecuteNonQuery();
            if (rowsAffected > 0)
            {
                status = true;
            }
        }
        catch (Exception e)
        {
            throw e;
        }
        finally
        {
            await con.CloseAsync();
        }
        return status;
    }

}