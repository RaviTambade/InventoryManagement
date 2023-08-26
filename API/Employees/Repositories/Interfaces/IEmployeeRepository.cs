using Transflower.Employees.Models;
namespace Transflower.Employees.Repositories.Interfaces;
public interface IEmployeeRepository
{
    Task<IEnumerable<Employee>> GetAll();
    Task <Employee> GetById(int employeeId);
    Task <bool> Insert(Employee employee);
    Task <bool> Update(Employee employee);
    Task<IEnumerable<Employee>> GetByDepartment(string department);
    Task<IEnumerable<Employee>> GetByRole(string role);
    Task <bool> Delete(int employeeId);
    Task<List<string>> GetDepartments();
    Task<List<string>> GetRoles();

}