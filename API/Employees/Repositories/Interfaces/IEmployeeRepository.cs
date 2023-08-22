using System.Collections.Generic;
using System.Collections;
using System.Net.Http.Headers;
using Employees.Models;
namespace Employees.Repositories.Interfaces;
public interface IEmployeeRepository
{
    Task<IEnumerable<Employee>> GetAll();
    Task <Employee> GetById(int employeeId);
    Task <bool> Insert(Employee employee);
    Task <bool> Update(Employee employee);
    Task<IEnumerable<Employee>> GetByDepartment(string theDepartment);
    Task<IEnumerable<Employee>> GetByRole(string role);
    Task<IEnumerable<Employee>> GetByGender(string gender);
    Task <bool> Delete(int employeeId);
    Task<List<string>> GetDepartments();
    Task<List<string>> GetRoles();

}