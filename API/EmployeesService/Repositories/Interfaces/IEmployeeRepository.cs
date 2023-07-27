using System.Collections.Generic;
using System.Collections;
using System.Net.Http.Headers;
using EmployeesService.Models;
namespace EmployeesService.Repositories.Interfaces;
public interface IEmployeeRepository
{
    Task<IEnumerable<Employee>> GetAll();
    Task<List<int>> GetAllIds();
    Task <Employee> GetById(int employeeId);
    Task <bool> Insert(Employee employee);
    Task <bool> Update(Employee employee);
    Task<IEnumerable<Employee>> GetByDepartment(string theDepartment);
    Task<IEnumerable<Employee>> GetByRole(string role);
    Task<Employee> GetRole(int id);
    Task <bool> Delete(int employeeId);

}