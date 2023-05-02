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
        return employees;
    }
    public Employee GetById(int employeeId)
    {
        Employee employee = new Employee();
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