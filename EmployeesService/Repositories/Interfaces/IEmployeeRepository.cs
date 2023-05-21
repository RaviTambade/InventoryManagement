using System.Collections;
using System.Net.Http.Headers;
using EmployeesService.Models;
namespace EmployeesService.Repositories.Interfaces;
public interface IEmployeeRepository
{
    IEnumerable<Employee> GetAll();
    Employee GetById(int employeeId);
    bool Insert(Employee employee);
    bool Update(Employee employee);
    Employee GetByIdUpdate(int employeeId);
  
    // bool Delete(int employeeId);
}