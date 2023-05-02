using System.Collections;
using System.Net.Http.Headers;
using InventoryManagement.Models;
namespace InventoryManagement.Repositories.Interfaces;
public interface IEmployeeRepository
{
    IEnumerable<Employee> GetAll();
    Employee GetById(int employeeId);
    bool Insert(Employee employee);
    bool Update(int employeeId,Employee employee);
    bool Delete(int employeeId);
}