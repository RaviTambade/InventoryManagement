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
            string query = "select  employees.id, employees.firstname,employees.lastname,employees.email,employees.contactnumber, departments.department, roles.role from employees inner join departments on employees.departmentid=departments.id  inner join roles on employees.roleid=roles.id";
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
                string? department = reader["department"].ToString();
                string? role = reader["role"].ToString();

                Employee TheEmployee = new Employee
                {
                    Id = id,
                    FirstName = firstname,
                    LastName = lastname,
                    ContactNumber = contactno,
                    email = email,
                    Department = department,
                    Role = role,
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
            string query ="select  employees.employee_id, DATE(employees.birth_date), DATE(employees.hire_date), employees.empfirst_name, employees.emplast_name, employees.email,employees.contact_number, employees.photo, departments.department, roles.role , genders.gender  from employees  inner join departments on employees.department_id=departments.department_id  inner join genders on employees.gender_id=genders.gender_id inner join roles on employees.role_id=roles.role_id  where   employee_id=@employeeId";
            MySqlCommand cmd = new MySqlCommand(query, con);
            cmd.Parameters.AddWithValue("@employeeId", employeeId);
            con.Open();
            MySqlDataReader reader = cmd.ExecuteReader();
            while (reader.Read())
            {
                int id = Int32.Parse(reader["employee_id"].ToString());
                string? firstname = reader["empfirst_name"].ToString();
                string? lastname = reader["emplast_name"].ToString();
                string? birthdate = reader["DATE(employees.birth_date)"].ToString();
                string? hiredate = reader["DATE(employees.hire_date)"].ToString();
                string? contactno = reader["contact_number"].ToString();
                string? email = reader["email"].ToString();
                string? imgurl = reader["photo"].ToString();
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
            string query = "INSERT INTO employees(empfirst_name,emplast_name,birth_date,hire_date,contact_number,department_id, role_id,email,password,photo,gender_id)VALUES(@empfirstname,@emplastname,@birthdate,@hiredate,@contactno,@departmentid,@roleid,@email,@password,@imgurl,@gender)";
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
            string query = "UPDATE employees SET empfirst_name=@empfirstname, emplast_name=@emplastname, birth_date=@birthdate, hire_date=@hiredate, contact_number=@contactno, department_id=@departmentid, role_id=@roleid, email=@email, photo=@imgurl, gender_id=@gender WHERE employee_id=@empid";
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

    public IEnumerable<Employee> GetByDepartment(int departmentId)
    {
        List<Employee> employees = new List<Employee>();
        MySqlConnection con = new MySqlConnection(_conString);
        try
        {
            string query ="select  employees.id, DATE(employees.birthdate), DATE(employees.hiredate), employees.firstname, employees.lastname, employees.email,employees.contactnumber, employees.photo, departments.department, roles.role , genders.gender  from employees  inner join departments on employees.departmentid=departments.id  inner join genders on employees.genderid=genders.id inner join roles on employees.roleid=roles.id  where   department_id=@departmentId";
            MySqlCommand cmd = new MySqlCommand(query, con);
            cmd.Parameters.AddWithValue("@departmentId", departmentId);

            con.Open();
            MySqlDataReader reader = cmd.ExecuteReader();
            while (reader.Read())
            {
                int id = Int32.Parse(reader["employee_id"].ToString());
                string? firstname = reader["empfirst_name"].ToString();
                string? lastname = reader["emplast_name"].ToString();
                string? contactno = reader["contact_number"].ToString();
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