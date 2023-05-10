using System.Collections.Generic;
using System.IO;
using System.Runtime.InteropServices.ComTypes;
using System.Collections;
using System.Data;
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
        MySqlConnection connection = new MySqlConnection(_conString);
        try
        {
            string query = "select  employees.employee_id, employees.empfirst_name,employees.emplast_name,employees.email,employees.contact_number, departments.department, roles.role from employees inner join departments on employees.department_id=departments.department_id  inner join roles on employees.role_id=roles.role_id";
            MySqlCommand command = new MySqlCommand(query, connection);
            connection.Open();
            MySqlDataReader reader = command.ExecuteReader();
            while (reader.Read())
            {
                int id = Int32.Parse(reader["employee_id"].ToString());
                string? empfirstname = reader["empfirst_name"].ToString();
                string? emplastname = reader["emplast_name"].ToString();
                string? contactno = reader["contact_number"].ToString();
                string? email = reader["email"].ToString();
                string? department = reader["department"].ToString();
                string? role = reader["role"].ToString();

                Employee employee = new Employee
                {
                    EmployeeId = id,
                    EmployeeFirstName = empfirstname,
                    EmployeeLastName = emplastname,
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
            connection.Close();
        }
        return employees;
    }
    public Employee GetById(int employeeId)
    {
        Employee employee = new Employee();
        MySqlConnection connection = new MySqlConnection(_conString);
        try
        {
            string query ="select  employees.employee_id, employees.birth_date, employees.hire_date, employees.empfirst_name, employees.emplast_name, employees.email,employees.contact_number, employees.photo, departments.department, roles.role , genders.gender  from employees  inner join departments on employees.department_id=departments.department_id  inner join genders on employees.gender_id=genders.gender_id inner join roles on employees.role_id=roles.role_id  where  employee_id=@employeeId";
            MySqlCommand command = new MySqlCommand(query, connection);
            command.Parameters.AddWithValue("@employeeId", employeeId);
            connection.Open();
            MySqlDataReader reader = command.ExecuteReader();
            while (reader.Read())
            {
                int id = Int32.Parse(reader["employee_id"].ToString());
                string? empfirstname = reader["empfirst_name"].ToString();
                string? emplastname = reader["emplast_name"].ToString();
                DateTime birthdate = DateTime.Parse(reader["birth_date"].ToString());
                DateTime hiredate = DateTime.Parse(reader["hire_date"].ToString());
                string? contactno = reader["contact_number"].ToString();
                string? email = reader["email"].ToString();
                string? imgurl = reader["photo"].ToString();
                string? gender = reader["gender"].ToString();
                string? department = reader["department"].ToString();
                string? role = reader["role"].ToString();

                employee = new Employee
                {
                    EmployeeId = id,
                    EmployeeFirstName = empfirstname,
                    EmployeeLastName = emplastname,
                    BirthDate = birthdate,
                    HireDate = hiredate,
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
            connection.Close();
        }
        return employee;
    }
    // public bool Insert(Employee employee)
    // {
    //      bool status = false;
    //     MySqlConnection connection = new MySqlConnection();
    //     connection.ConnectionString = _conString;
    //     try
    //     {
    //         string query = "INSERT INTO employees(empfirst_name,emplast_name,birth_date,hire_date,contact_number,department_id, role_id,email,password,photo,gender)VALUES(@empfirstname,@emplastname,@birthdate,@hiredate,@contactno,@departmentid,@roleid,@email,@password,@imgurl,@gender)";
    //         MySqlCommand command = new MySqlCommand(query, connection);
    //         command.Parameters.AddWithValue("@empfirstname", employee.EmployeeFirstName);
    //         command.Parameters.AddWithValue("@emplastname", employee.EmployeeLastName);
    //         command.Parameters.AddWithValue("@birthdate", employee.BirthDate);
    //         command.Parameters.AddWithValue("@hiredate", employee.HireDate);
    //         command.Parameters.AddWithValue("@contactno", employee.ContactNumber);
    //         command.Parameters.AddWithValue("@departmentid", employee.DepartmentId);
    //         command.Parameters.AddWithValue("@roleid", employee.RoleId);
    //         command.Parameters.AddWithValue("@email", employee.email);
    //         command.Parameters.AddWithValue("@password", employee.password);
    //         command.Parameters.AddWithValue("@imgurl", employee.ImgUrl);
    //         command.Parameters.AddWithValue("@gender", employee.Gender);
    //         connection.Open();
    //         int rowsAffected = command.ExecuteNonQuery();
    //         if (rowsAffected > 0)
    //         {
    //             status = true;
    //         }
    //     }
    //     catch (Exception e)
    //     {
    //         throw e;
    //     }
    //     finally
    //     {
    //         connection.Close();
    //     }
    //     return status;
    
    // }
    // public bool Update(int employeeId, Employee employee)
    // {
    //     bool status = false;
    //     MySqlConnection connection = new MySqlConnection(_conString);
    //     try
    //     {
    //         string query = "UPDATE employees SET empfirst_name=@empfirstname, emplast_name=@emplastname, birth_date=@birthdate, hire_date=@hiredate, contact_number=@contactno, department_id=@departmentid, role_id=@roleid, email=@email, password=@password, photo=@imgurl, gender=@gender WHERE employee_id=@empid";
    //         MySqlCommand command = new MySqlCommand(query, connection);
    //         command.Parameters.AddWithValue("@empid", employeeId);
    //         command.Parameters.AddWithValue("@empfirstname", employee.EmployeeFirstName);
    //         command.Parameters.AddWithValue("@emplastname", employee.EmployeeLastName);
    //         command.Parameters.AddWithValue("@birthdate", employee.BirthDate);
    //         command.Parameters.AddWithValue("@hiredate", employee.HireDate);
    //         command.Parameters.AddWithValue("@contactno", employee.ContactNumber);
    //         command.Parameters.AddWithValue("@departmentid", employee.DepartmentId);
    //         command.Parameters.AddWithValue("@roleid", employee.RoleId);
    //         command.Parameters.AddWithValue("@email", employee.email);
    //         command.Parameters.AddWithValue("@password", employee.password);
    //         command.Parameters.AddWithValue("@imgurl", employee.ImgUrl);
    //         command.Parameters.AddWithValue("@gender", employee.Gender);
    //         connection.Open();
    //         int rowsAffected = command.ExecuteNonQuery();
    //         if (rowsAffected > 0)
    //         {
    //             status = true;
    //         }
    //     }
    //     catch (Exception e)
    //     {
    //         throw e;
    //     }
    //     finally
    //     {
    //         connection.Close();
    //     }
    //     return status;
    // }

    // public bool Delete(int employeeId)
    // {
    //     bool status = false;
    //      MySqlConnection connection = new MySqlConnection(_conString);
    //     try
    //     {
    //         string query = "DELETE FROM employees WHERE employee_id=@empid";
    //         MySqlCommand command = new MySqlCommand(query, connection);
    //         command.Parameters.AddWithValue("@empid", employeeId);
    //         connection.Open();
    //         int rowsAffected = command.ExecuteNonQuery();
    //         if (rowsAffected > 0)
    //         {
    //             status = true;
    //         }
    //     }
    //     catch (Exception e)
    //     {
    //         throw e;
    //     }
    //     finally
    //     {
    //         connection.Close();
    //     }
    //     return status;
    // }

}