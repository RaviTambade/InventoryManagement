using Employees.Models;
using Employees.Repositories.Interfaces;
using MySql.Data.MySqlClient;
namespace Employees.Repositories;
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
            string query = "select  employees.id, employees.firstname,employees.lastname,employees.birthdate, employees.hiredate,employees.email,employees.contactnumber, employees.gender, employees.password, employees.imageurl,departments.department, roles.role from employees inner join departments on employees.departmentid=departments.id  inner join roles on employees.roleid=roles.id";
            MySqlCommand cmd = new MySqlCommand(query, con);
            await con.OpenAsync();
            MySqlDataReader reader = cmd.ExecuteReader();
            while (await reader.ReadAsync())
            {
                int id = Int32.Parse(reader["id"].ToString());
                string? firstname = reader["firstname"].ToString();
                string? birthdate = reader["birthdate"].ToString();
                string? hiredate = reader["hiredate"].ToString();
                string? password = reader["password"].ToString();
                string? lastname = reader["lastname"].ToString();
                string? contactno = reader["contactnumber"].ToString();
                string? email = reader["email"].ToString();
                string? imgurl = reader["imageurl"].ToString();
                string? department = reader["department"].ToString();
                string? role = reader["role"].ToString();
                string? gender = reader["gender"].ToString();
                Employee TheEmployee = new Employee
                {
                    Id = id,
                    FirstName = firstname,
                    LastName = lastname,
                    BirthDate = birthdate,
                    HireDate = hiredate,
                    password = password,
                    ContactNumber = contactno,
                    email = email,
                    Department = department,
                    ImgUrl = imgurl,
                    Role = role,
                    Gender = gender
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
 
    public async Task<Employee> GetById(int employeeId)
    {
        Employee employee = null;
        MySqlConnection con = new MySqlConnection(_conString);
        try
        {
            string query = "select  employees.id, employees.birthdate, employees.hiredate, employees.firstname, employees.lastname,employees.password, employees.email,employees.contactnumber, employees.imageurl, employees.gender,departments.department, roles.role   from employees   inner join departments on employees.departmentid=departments.id  inner join roles on employees.roleid=roles.id  where employees.id =@employeeId";
            MySqlCommand cmd = new MySqlCommand(query, con);
            cmd.Parameters.AddWithValue("@employeeId", employeeId);
            await con.OpenAsync();
            MySqlDataReader reader = cmd.ExecuteReader();
            while (await reader.ReadAsync())
            {
                int id = Int32.Parse(reader["id"].ToString());
                string? firstname = reader["firstname"].ToString();
                string? lastname = reader["lastname"].ToString();
                string? birthdate = reader["birthdate"].ToString();
                string? hiredate = reader["hiredate"].ToString();
                string? password = reader["password"].ToString();
                string? contactno = reader["contactnumber"].ToString();
                string? email = reader["email"].ToString();
                string? imgurl = reader["imageurl"].ToString();
                string? gender = reader["gender"].ToString();
                string? department = reader["department"].ToString();
                string? role = reader["role"].ToString();
                employee = new Employee
                {
                    Id = id,
                    FirstName = firstname,
                    LastName = lastname,
                    BirthDate = birthdate,
                    HireDate = hiredate,
                    password = password,
                    ContactNumber = contactno,
                    email = email,
                    ImgUrl = imgurl,
                    Gender = gender,
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
            string query = "INSERT INTO employees(firstname,lastname,birthdate,hiredate,contactnumber,departmentid, roleid,email,password,imageurl,gender)VALUES(@empfirstname,@emplastname,@birthdate,@hiredate,@contactno,@departmentid,@roleid,@email,@password,@imgurl,@gender)";
            MySqlCommand cmd = new MySqlCommand(query, con);
            cmd.Parameters.AddWithValue("@empfirstname", employee.FirstName);
            cmd.Parameters.AddWithValue("@emplastname", employee.LastName);
            cmd.Parameters.AddWithValue("@birthdate", employee.BirthDate);
            cmd.Parameters.AddWithValue("@hiredate", employee.HireDate);
            cmd.Parameters.AddWithValue("@contactno", employee.ContactNumber);
            cmd.Parameters.AddWithValue("@departmentid", employee.Department);
            cmd.Parameters.AddWithValue("@roleid", employee.Role);
            cmd.Parameters.AddWithValue("@email", employee.email);
            cmd.Parameters.AddWithValue("@password", employee.password);
            cmd.Parameters.AddWithValue("@imgurl", employee.ImgUrl);
            cmd.Parameters.AddWithValue("@gender", employee.Gender);
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
            string query = "UPDATE employees SET firstname=@empfirstname, lastname=@emplastname, birthdate=@birthdate, hiredate=@hiredate, contactnumber=@contactno, departmentid=@departmentid, roleid=@roleid, email=@email, imageurl=@imgurl, gender=@gender WHERE id=@empid";
            MySqlCommand cmd = new MySqlCommand(query, con);
            cmd.Parameters.AddWithValue("@empid", employee.Id);
            cmd.Parameters.AddWithValue("@empfirstname", employee.FirstName);
            cmd.Parameters.AddWithValue("@emplastname", employee.LastName);
            cmd.Parameters.AddWithValue("@birthdate", employee.BirthDate);
            cmd.Parameters.AddWithValue("@hiredate", employee.HireDate);
            cmd.Parameters.AddWithValue("@contactno", employee.ContactNumber);
            cmd.Parameters.AddWithValue("@departmentid", employee.Department);
            cmd.Parameters.AddWithValue("@roleid", employee.Role);
            cmd.Parameters.AddWithValue("@email", employee.email);
            cmd.Parameters.AddWithValue("@imgurl", employee.ImgUrl);
            cmd.Parameters.AddWithValue("@gender", employee.Gender);
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
            string query = "select  employees.id, employees.birthdate, employees.hiredate, employees.firstname, employees.lastname, employees.email,employees.contactnumber, employees.gender, employees.imageurl, departments.department, roles.role   from employees  inner join departments on employees.departmentid=departments.id inner join roles on employees.roleid=roles.id  where   departments.department=@department";
            MySqlCommand cmd = new MySqlCommand(query, con);
            cmd.Parameters.AddWithValue("@department", theDepartment);

            await con.OpenAsync();
            MySqlDataReader reader = cmd.ExecuteReader();
            while (await reader.ReadAsync())
            {
                int id = Int32.Parse(reader["id"].ToString());
                string? firstname = reader["firstname"].ToString();
                string? lastname = reader["lastname"].ToString();
                string? birthdate = reader["birthdate"].ToString();
                string? hiredate = reader["hiredate"].ToString();
                string? contactno = reader["contactnumber"].ToString();
                string? imgurl = reader["imageurl"].ToString();
                string? geder = reader["gender"].ToString();
                string? email = reader["email"].ToString();
                string? department = reader["department"].ToString();
                string? role = reader["role"].ToString();

                Employee employee = new Employee
                {
                    Id = id,
                    FirstName = firstname,
                    LastName = lastname,
                    BirthDate = birthdate,
                    HireDate = hiredate,
                    ContactNumber = contactno,
                    email = email,
                    Department = department,
                    Role = role,
                    ImgUrl = imgurl,
                    Gender = geder
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
            string query = "select   employees.id, employees.birthdate, employees.hiredate, employees.firstname, employees.lastname, employees.email,employees.contactnumber, employees.gender, employees.imageurl, departments.department, roles.role from employees  inner join departments on employees.departmentid=departments.id   inner join roles on employees.roleid=roles.id where roles.role =@role ";
            MySqlCommand cmd = new MySqlCommand(query, con);
            cmd.Parameters.AddWithValue("@role", theRole);

            await con.OpenAsync();
            MySqlDataReader reader = cmd.ExecuteReader();
            while (await reader.ReadAsync())
            {
                int id = Int32.Parse(reader["id"].ToString());
                string? firstname = reader["firstname"].ToString();
                string? lastname = reader["lastname"].ToString();
                string? birthdate = reader["birthdate"].ToString();
                string? hiredate = reader["hiredate"].ToString();
                string? contactno = reader["contactnumber"].ToString();
                string? imgurl = reader["imageurl"].ToString();
                string? geder = reader["gender"].ToString();
                string? email = reader["email"].ToString();
                string? department = reader["department"].ToString();
                string? role = reader["role"].ToString();

                Employee employee = new Employee
                {
                    Id = id,
                    FirstName = firstname,
                    LastName = lastname,
                    BirthDate = birthdate,
                    HireDate = hiredate,
                    ContactNumber = contactno,
                    email = email,
                    Department = department,
                    Role = role,
                    ImgUrl = imgurl,
                    Gender = geder
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

    public async Task<IEnumerable<Employee>> GetByGender(string theGender)
    {
        List<Employee> employees = new List<Employee>();
        MySqlConnection con = new MySqlConnection(_conString);
        try
        {
            string query = "select   employees.id,  employees.hiredate, employees.firstname, employees.lastname, employees.email,employees.contactnumber, employees.gender, employees.imageurl, departments.department, roles.role from employees  inner join departments on employees.departmentid=departments.id   inner join roles on employees.roleid=roles.id where employees.gender=@gender ";
            MySqlCommand cmd = new MySqlCommand(query, con);
            cmd.Parameters.AddWithValue("@gender", theGender);

            await con.OpenAsync();
            MySqlDataReader reader = cmd.ExecuteReader();
            while (await reader.ReadAsync())
            {
                int id = Int32.Parse(reader["id"].ToString());
                string? firstname = reader["firstname"].ToString();
                string? lastname = reader["lastname"].ToString();
                string? hiredate = reader["hiredate"].ToString();
                string? contactno = reader["contactnumber"].ToString();
                string? imgurl = reader["imageurl"].ToString();
                string? geder = reader["gender"].ToString();
                string? email = reader["email"].ToString();
                string? department = reader["department"].ToString();
                string? role = reader["role"].ToString();

                Employee employee = new Employee
                {
                    Id = id,
                    FirstName = firstname,
                    LastName = lastname,
                    HireDate = hiredate,
                    ContactNumber = contactno,
                    email = email,
                    Department = department,
                    Role = role,
                    ImgUrl = imgurl,
                    Gender = geder
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
            string query = "DELETE FROM employees WHERE id=@empid";
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

    public async Task<List<string>> GetDepartments()
    {
        List<string> departments = new List<string>();
        MySqlConnection con = new MySqlConnection(_conString);
        try
        {
            string query = "select * from departments";
            MySqlCommand cmd = new MySqlCommand(query, con);
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
        List<string> roles = new List<string>();
        MySqlConnection con = new MySqlConnection(_conString);
        try
        {
            string query = "select * from roles";
            MySqlCommand cmd = new MySqlCommand(query, con);
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
 
}