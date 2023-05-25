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
    public IEnumerable<Employee> GetAll() =>_repo.GetAll();
    public Employee GetById(int employeeId) => _repo.GetById(employeeId);
    public bool Insert(Employee employee) => _repo.Insert(employee);
    public bool Update(Employee employee) => _repo.Update(employee);
    public Employee GetByIdUpdate(int employeeId) => _repo.GetByIdUpdate(employeeId);
    public IEnumerable<Employee> GetByDepartment(int departmentId) =>_repo.GetByDepartment(departmentId);

    // public bool Delete(int employeeId) => _repo.Delete(employeeId);
 
}