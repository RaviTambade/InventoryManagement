using System.Collections.Generic;
using EmployeesService.Models;
using EmployeesService.Repositories.Interfaces;
using EmployeesService.Services.Interfaces;
namespace EmployeesService.Services;
public class EmployeeService : IEmployeeService
{
    private readonly IEmployeeRepository _repo;
    public EmployeeService(IEmployeeRepository repo)
    {
        _repo = repo;
    }
    public async Task<IEnumerable<Employee>> GetAll() =>await _repo.GetAll();
    public async Task<List<int>> GetAllIds() =>await _repo.GetAllIds();
    public async Task<Employee> GetById(int id) =>await _repo.GetById(id);

    public async Task<bool> Insert(Employee employee) =>await _repo.Insert(employee);
    public async Task<bool> Update(Employee employee) =>await _repo.Update(employee);
    public  async Task<IEnumerable<Employee>> GetByDepartment(string theDepartment) => await _repo.GetByDepartment(theDepartment);
    public  async Task<IEnumerable<Employee>> GetByRole(string role) =>await _repo.GetByRole(role);
    public  async Task<Employee> GetRole(int id) =>await _repo.GetRole(id);
    public async Task<bool> Delete(int employeeId) =>await _repo.Delete(employeeId);
 
}