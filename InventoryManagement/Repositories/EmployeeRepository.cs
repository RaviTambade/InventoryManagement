using System.IO;
using System.Runtime.InteropServices.ComTypes;
using System.Collections;
using System.Data;
using InventoryManagement.Models;
using InventoryManagement.Repositories.Interfaces;
using MySql.Data.MySqlClient;
namespace InventoryManagement.Repositories;
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
            string query = "SELECT * FROM employees";
            MySqlCommand command = new MySqlCommand(query, connection);
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
                string? password = reader["password"].ToString();
                string? imgurl = reader["photo"].ToString();
                string? gender = reader["gender"].ToString();
                string? departmentid = reader["department_id"].ToString();
                string? roleid = reader["role_id"].ToString();

                Employee employee = new Employee
                {
                    EmployeeId = id,
                    EmployeeFirstName = empfirstname,
                    EmployeeLastName = emplastname,
                    BirthDate = birthdate,
                    HireDate = hiredate,
                    ContactNumber = contactno,
                    email = email,
                    password = password,
                    ImgUrl = imgurl,
                    Gender = gender,
                    DepartmentId = departmentid,
                    RoleId = roleid,


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
            string query = "SELECT * FROM employees where employee_id=@employeeId";
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
                string? password = reader["password"].ToString();
                string? imgurl = reader["photo"].ToString();
                string? gender = reader["gender"].ToString();
                string? departmentid = reader["department_id"].ToString();
                string? roleid = reader["role_id"].ToString();

                employee = new Employee
                {
                    EmployeeId = id,
                    EmployeeFirstName = empfirstname,
                    EmployeeLastName = emplastname,
                    BirthDate = birthdate,
                    HireDate = hiredate,
                    ContactNumber = contactno,
                    email = email,
                    password = password,
                    ImgUrl = imgurl,
                    Gender = gender,
                    DepartmentId = departmentid,
                    RoleId = roleid,
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
    public bool Insert(Employee employee)
    {
        bool status = false;
        return status;
    }
    public bool Update(int employeeId, Employee employee)
    {
        bool status = false;
        return status;
    }

    public bool Delete(int employeeId)
    {
        bool status = false;
        return status;
    }

}