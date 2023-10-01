using Transflower.Employees.Models;
using Transflower.Employees.Repositories.Interfaces;
using MySql.Data.MySqlClient;
namespace Transflower.Employees.Repositories;
public class EmployeeRepository : IEmployeeRepository
{
    private readonly IConfiguration _configuration;
    private readonly string _connectionString;
    public EmployeeRepository(IConfiguration configuration)
    {
        _configuration = configuration;
        _connectionString = _configuration.GetConnectionString("DefaultConnection");
    }
    public async Task<IEnumerable<Employee>> GetAll()
    {
        List<Employee> employees = new();
        MySqlConnection con = new(_connectionString);
        try
        {
            string query = "select  employees.userid,employees.imageurl,departments.department, roles.role from employees inner join departments on employees.departmentid=departments.id  inner join roles on employees.roleid=roles.id";
            MySqlCommand cmd = new(query, con);
            await con.OpenAsync();
            MySqlDataReader reader = cmd.ExecuteReader();
            while (await reader.ReadAsync())
            {
                int id = int.Parse(reader["userid"].ToString());
                string? imgurl = reader["imageurl"].ToString();
                string? department = reader["department"].ToString();
                string? role = reader["role"].ToString();
                Employee TheEmployee = new()
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


    // public async Task<Employee> GetRole(int id)
    // {
    //     MySqlConnection con = new(_connectionString);
    //     Employee emp = null;
    //     try
    //     {
    //         string query = " select r.role from employees e inner join roles r on r.id = e.id where e.userid=@id";
    //         MySqlCommand cmd = new(query, con);
    //         cmd.Parameters.AddWithValue("@id", id);
    //         await con.OpenAsync();
    //         MySqlDataReader reader = cmd.ExecuteReader();
    //         while (await reader.ReadAsync())
    //         {
    //             string role = reader["role"].ToString();

    //             emp = new Employee()
    //             {
    //                 Role = role
    //             };
    //         }
    //         await reader.CloseAsync();
    //     }
    //     catch (Exception e)
    //     {
    //         throw e;
    //     }
    //     finally
    //     {
    //         await con.CloseAsync();
    //     }
    //     return emp;
    // }


    public async Task<Employee> GetById(int employeeId)
    {
        Employee employee = null;
        MySqlConnection con = new(_connectionString);
        try
        {
            string query = "select  employees.userid ,employees.imageurl,departments.department, roles.role   from employees   inner join departments on employees.departmentid=departments.id  inner join roles on employees.roleid=roles.id  where employees.id =@employeeId";
            MySqlCommand cmd = new(query, con);
            cmd.Parameters.AddWithValue("@employeeId", employeeId);
            await con.OpenAsync();
            MySqlDataReader reader = cmd.ExecuteReader();
            while (await reader.ReadAsync())
            {
                int id = int.Parse(reader["userid"].ToString());
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
        MySqlConnection con = new(_connectionString);
        try
        {
            string query = "INSERT INTO employees(userid,departmentid, roleid,imageurl,hiredate)VALUES(@userId,(select id from departments where department=@departmentId),(select id from roles where role=@roleId),@imageUrl,@hireDate)";
            MySqlCommand cmd = new(query, con);
            cmd.Parameters.AddWithValue("@userId", employee.UserId);
            cmd.Parameters.AddWithValue("@departmentId", employee.Department);
            cmd.Parameters.AddWithValue("@roleId", employee.Role);
            cmd.Parameters.AddWithValue("@imageUrl", employee.ImageUrl);
            cmd.Parameters.AddWithValue("@hireDate", employee.HireDate);
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
        MySqlConnection con = new(_connectionString);
        try
        {
            string query = "UPDATE employees SET  departmentid=@departmentId, roleid=@roleId, imageurl=@imageUrl,hiredate=@hireDate WHERE userid=@userId";
            MySqlCommand cmd = new MySqlCommand(query, con);
            cmd.Parameters.AddWithValue("@userId", employee.UserId);
            cmd.Parameters.AddWithValue("@departmentId", employee.Department);
            cmd.Parameters.AddWithValue("@roleId", employee.Role);
            cmd.Parameters.AddWithValue("@imageUrl", employee.ImageUrl);
            cmd.Parameters.AddWithValue("@hireDate", employee.HireDate);
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

    public async Task<IEnumerable<Employee>> GetByDepartment(string department)
    {
        List<Employee> employees = new List<Employee>();
        MySqlConnection con = new(_connectionString);
        try
        {
            string query = "select  employees.userid,employees.hiredate, employees.imageurl, departments.department, roles.role   from employees  inner join departments on employees.departmentid=departments.id inner join roles on employees.roleid=roles.id  where   departments.department=@department";
            MySqlCommand cmd = new(query, con);
            cmd.Parameters.AddWithValue("@department", department);
            await con.OpenAsync();
            MySqlDataReader reader = cmd.ExecuteReader();
            while (await reader.ReadAsync())
            {
                int id = int.Parse(reader["userid"].ToString());
                string? imgurl = reader["imageurl"].ToString();
                string? theDepartment = reader["department"].ToString();
                string? role = reader["role"].ToString();
                DateTime hireDate =DateTime.Parse( reader["hiredate"].ToString());
                Employee TheEmployee = new()
                {
                    UserId = id,
                    Department = theDepartment,
                    ImageUrl = imgurl,
                    Role = role,
                    HireDate=hireDate
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
    

    public async Task<IEnumerable<Employee>> GetByRole(string role)
    {
        List<Employee> employees = new List<Employee>();
        MySqlConnection con = new(_connectionString);
        try
        {
            string query = "select  employees.userid,employees.hiredate, employees.imageurl, departments.department, roles.role   from employees inner join departments on employees.departmentid=departments.id inner join roles on employees.roleid=roles.id  where  roles.role=@role ";
            MySqlCommand cmd = new(query, con);
            cmd.Parameters.AddWithValue("@role", role);
            await con.OpenAsync();
            MySqlDataReader reader = cmd.ExecuteReader();
            while (await reader.ReadAsync())
            {
                int id = int.Parse(reader["userid"].ToString());
                string? imgurl = reader["imageurl"].ToString();
                string? theDepartment = reader["department"].ToString();
                string? theRole = reader["role"].ToString();
                DateTime hireDate =DateTime.Parse( reader["hiredate"].ToString());

                Employee TheEmployee = new() 
                {
                    UserId = id,
                    Department = theDepartment,
                    ImageUrl = imgurl,
                    Role = theRole,
                    HireDate=hireDate
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
    public async Task<bool> Delete(int employeeId)
    {
        bool status = false;
        MySqlConnection con = new(_connectionString);
        try
        {
            string query = "DELETE FROM employees WHERE userid=@empid";
            MySqlCommand cmd = new(query, con);
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
    public async Task<List<string>> GetDepartments()
    {
        List<string> departments = new();
        MySqlConnection con = new(_connectionString);
        try
        {
            string query = "select * from departments";
            MySqlCommand cmd = new(query, con);
            await con.OpenAsync();
            MySqlDataReader reader = cmd.ExecuteReader();
            while (await reader.ReadAsync())
            {
                string? department = reader["department"].ToString();
                departments.Add(department);
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
        return departments;
    }
    public async Task<List<string>> GetRoles()
    {
        List<string> roles = new();
        MySqlConnection con = new(_connectionString);
        try
        {
            string query = "select * from roles";
            MySqlCommand cmd = new(query, con);
            await con.OpenAsync();
            MySqlDataReader reader = cmd.ExecuteReader();
            while (await reader.ReadAsync())
            {
                string? role = reader["role"].ToString();
                roles.Add(role);
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
        return roles;
    }


    public async Task<string> GetRole(int employeeId)
    {
        string role ="";
        MySqlConnection con = new(_connectionString);
        try
        {
            string query = "select role from roles inner join employees e on e.roleid =roles.id where e.userid=@employeeId ";
            MySqlCommand cmd = new(query, con);
            cmd.Parameters.AddWithValue("@employeeId", employeeId);

            await con.OpenAsync();
            MySqlDataReader reader = cmd.ExecuteReader();
            while (await reader.ReadAsync())
            {
                role = reader["role"].ToString();
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
        return role;
    }

}