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
    public IEnumerable<Employee> GetByDepartment(string theDepartment) =>_repo.GetByDepartment(theDepartment);
    public IEnumerable<Employee> GetByRole(string role) =>_repo.GetByRole(role);

    public IEnumerable<Employee> GetByGender(string gender) =>_repo.GetByGender(gender);

    public bool Delete(int employeeId) => _repo.Delete(employeeId);
 
}