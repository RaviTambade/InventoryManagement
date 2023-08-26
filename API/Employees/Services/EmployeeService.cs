using Transflower.Employees.Models;
using Transflower.Employees.Repositories.Interfaces;
using Transflower.Employees.Services.Interfaces;
namespace Transflower.Employees.Services;
public class EmployeeService : IEmployeeService
{
    private readonly IEmployeeRepository _repo;
    public EmployeeService(IEmployeeRepository repo)
    {
        _repo = repo;
    }
    public async Task<IEnumerable<Employee>> GetAll() => await _repo.GetAll();
    public async Task<Employee> GetById(int id) => await _repo.GetById(id);

    public async Task<bool> Insert(Employee employee) => await _repo.Insert(employee);
    public async Task<bool> Update(Employee employee) => await _repo.Update(employee);
    public async Task<IEnumerable<Employee>> GetByDepartment(string department) => await _repo.GetByDepartment(department);
    public async Task<IEnumerable<Employee>> GetByRole(string role) => await _repo.GetByRole(role);
    public async Task<bool> Delete(int employeeId) => await _repo.Delete(employeeId);
    public async Task<List<string>> GetDepartments() => await _repo.GetDepartments();
    public async Task<List<string>> GetRoles() => await _repo.GetRoles();

}