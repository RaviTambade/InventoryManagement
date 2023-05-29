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
    public IEnumerable<Employee> GetAll()
    {
        List<Employee> employees = new List<Employee>();
        MySqlConnection con = new MySqlConnection(_conString);
        try
        {
            string query = "select  employees.id, employees.firstname,employees.lastname,employees.email,employees.contactnumber, employees.gender, employees.imageurl,departments.department, roles.role from employees inner join departments on employees.departmentid=departments.id  inner join roles on employees.roleid=roles.id";
            MySqlCommand cmd = new MySqlCommand(query, con);
            con.Open();
            MySqlDataReader reader = cmd.ExecuteReader();
            while (reader.Read())
            {
                int id = Int32.Parse(reader["id"].ToString());
                string? firstname = reader["firstname"].ToString();
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
                    ContactNumber = contactno,
                    email = email,
                    Department = department,
                    ImgUrl = imgurl,
                    Role = role,
                    Gender = gender
                };

                employees.Add(TheEmployee);
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
        return employees;
    }
    public Employee GetById(int employeeId)
    {
        Employee employee = null;
        MySqlConnection con = new MySqlConnection(_conString);
        try
        {
            string query ="select  employees.id, employees.birthdate, employees.hiredate, employees.firstname, employees.lastname, employees.email,employees.contactnumber, employees.imageurl, employees.gender ,departments.department, roles.role   from employees   inner join departments on employees.departmentid=departments.id  inner join roles on employees.roleid=roles.id  where employees.id =@employeeId";
            MySqlCommand cmd = new MySqlCommand(query, con);
            cmd.Parameters.AddWithValue("@employeeId", employeeId);
            con.Open();
            MySqlDataReader reader = cmd.ExecuteReader();
            while (reader.Read())
            {
                int id = Int32.Parse(reader["id"].ToString());
                string? firstname = reader["firstname"].ToString();
                string? lastname = reader["lastname"].ToString();
                string? birthdate = reader["birthdate"].ToString();
                string? hiredate = reader["hiredate"].ToString();
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
                    BirthDate = birthdate.Remove(10,9),
                    HireDate = hiredate.Remove(10,9),
                    ContactNumber = contactno,
                    email = email,
                    ImgUrl = imgurl,
                    Gender = gender,
                    Department = department,
                    Role = role,
                };

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
        return employee;
    }
   
    public bool Insert(Employee employee)
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
            cmd.Parameters.AddWithValue("@departmentid", employee.DepartmentId);
            cmd.Parameters.AddWithValue("@roleid", employee.RoleId);
            cmd.Parameters.AddWithValue("@email", employee.email);
            cmd.Parameters.AddWithValue("@password", employee.password);
            cmd.Parameters.AddWithValue("@imgurl", employee.ImgUrl);
            cmd.Parameters.AddWithValue("@gender", employee.GenderId);
            con.Open();
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
            con.Close();
        }
        return status;
    
    }
 
    public bool Update(Employee employee)
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
            cmd.Parameters.AddWithValue("@departmentid", employee.DepartmentId);
            cmd.Parameters.AddWithValue("@roleid", employee.RoleId);
            cmd.Parameters.AddWithValue("@email", employee.email);
            cmd.Parameters.AddWithValue("@imgurl", employee.ImgUrl);
            cmd.Parameters.AddWithValue("@gender", employee.Gender);
            con.Open();
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
            con.Close();
        }
        return status;
    }

    public IEnumerable<Employee> GetByDepartment(int departmentId)  
    {
        List<Employee> employees = new List<Employee>();
        MySqlConnection con = new MySqlConnection(_conString);
        try
        {
            string query ="select  employees.id, employees.birthdate, employees.hiredate, employees.firstname, employees.lastname, employees.email,employees.contactnumber, employees.gender, employees.imageurl, departments.department, roles.role   from employees  inner join departments on employees.departmentid=departments.id inner join roles on employees.roleid=roles.id  where   department_id=@departmentId";
            MySqlCommand cmd = new MySqlCommand(query, con);
            cmd.Parameters.AddWithValue("@departmentId", departmentId);

            con.Open();
            MySqlDataReader reader = cmd.ExecuteReader();
            while (reader.Read())
            {
                int id = Int32.Parse(reader["id"].ToString());
                string? firstname = reader["firstname"].ToString();
                string? lastname = reader["lastname"].ToString();
                string? contactno = reader["contactnumber"].ToString();
                string? email = reader["email"].ToString();
                string? department = reader["department"].ToString();
                string? role = reader["role"].ToString();

                Employee employee = new Employee
                {
                    Id = id,
                    FirstName = firstname,
                    LastName = lastname,
                    ContactNumber = contactno,
                    email = email,
                    Department = department,
                    Role = role,
                };

                employees.Add(employee);
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
        return employees;
    }

    public bool Delete(int employeeId)
    {
        bool status = false;
         MySqlConnection con = new MySqlConnection(_conString);
        try
        {
            string query = "DELETE FROM employees WHERE id=@empid";
            MySqlCommand cmd = new MySqlCommand(query, con);
            cmd.Parameters.AddWithValue("@empid", employeeId);
            con.Open();
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
            con.Close();
        }
        return status;
    }

}