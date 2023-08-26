using Transflower.Employees.Models;
using Transflower.Employees.Services.Interfaces;
using Microsoft.AspNetCore.Mvc;

namespace Transflower.Employees.Controllers
{
    [ApiController]
    [Route("/api/[controller]")]
    public class EmployeesController : ControllerBase
    {
        private readonly IEmployeeService _empsrv;

        public EmployeesController(IEmployeeService empsvr)
        {
            _empsrv = empsvr;
        }

        [HttpGet]
        [Route("employees")]
        public async Task<IEnumerable<Employee>> GetAll()
        {
            IEnumerable<Employee> employees = await _empsrv.GetAll();
            return employees;
        }

        [HttpGet]
        [Route("employee/{id}")]
        public async Task<Employee> GetById(int id)
        {
            Employee employee = await _empsrv.GetById(id);
            return employee;
        }

        [HttpPost]
        [Route("employee")]
        public async Task<bool> Insert([FromBody] Employee employee)
        {
            bool status = await _empsrv.Insert(employee);
            return status;
        }


        [HttpPut]
        [Route("employee")]
        public async Task<bool> Update([FromBody] Employee employee)
        {
            bool status = await _empsrv.Update(employee);
            return status;
        }

        [HttpGet]
        [Route("department/{department}")]
        public async Task<IEnumerable<Employee>> GetByDepartment(string department)
        {
            IEnumerable<Employee> employees = await _empsrv.GetByDepartment(department);
            return employees;
        }

        [HttpGet]
        [Route("role/{role}")]
        public async Task<IEnumerable<Employee>> GetByRole(string role)
        {
            IEnumerable<Employee> employees = await _empsrv.GetByRole(role);
            return employees;
        }

        [HttpDelete]
        [Route("employees/{id}")]
        public async Task<bool> Delete(int id)
        {
            bool status = await _empsrv.Delete(id);
            return status;
        }

        [HttpGet]
        [Route("departments")]
        public async Task<List<string>> GetDepartments()
        {
            List<string> departments = await _empsrv.GetDepartments();
            return departments;
        }

        [HttpGet]
        [Route("roles")]
        public async Task<List<string>> GetRoles()
        {
            List<string> roles = await _empsrv.GetRoles();
            return roles;
        }
    }
}