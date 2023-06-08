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
    IEnumerable<Employee> GetByDepartment(string theDepartment);
    IEnumerable<Employee> GetByRole(string role);
    // Employee GetBySection(string section);
    IEnumerable<Employee> GetByGender(string gender);
    bool Delete(int employeeId);
 

}