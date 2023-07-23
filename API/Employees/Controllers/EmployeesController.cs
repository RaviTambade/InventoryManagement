using Employees.Models;
using Employees.Services.Interfaces;
using Microsoft.AspNetCore.Mvc;

namespace Employees.Controllers
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
            IEnumerable<Employee> employees =await _empsrv.GetAll();
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
        [Route("employees")]
        public async Task<bool> Insert([FromBody] Employee employee)
        {
            bool status = await _empsrv.Insert(employee);
            return status;
        }


        [HttpPut]
        [Route("employees")]
        public async Task<bool> Update([FromBody] Employee employee)
        {
            bool status = await _empsrv.Update(employee);
            return status;
        }

        [HttpGet]
        [Route("department/{theDepartment}")]
        public async Task<IEnumerable<Employee>> GetByDepartment(string theDepartment)
        {
            IEnumerable<Employee> employees = await _empsrv.GetByDepartment(theDepartment);
            return employees;
        }

        [HttpGet]
        [Route("role/{role}")]
        public async Task<IEnumerable<Employee>> GetByRole(string role)
        {
            IEnumerable<Employee> employees = await _empsrv.GetByRole(role);
            return employees;
        }

        [HttpGet]
        [Route("gender/{gender}")]
        public async Task<IEnumerable<Employee>> GetByGender(string gender)
        {
            IEnumerable<Employee> employees = await _empsrv.GetByGender(gender);
            return employees;
        }


        [HttpDelete]
        [Route("employees/{id}")]
        public async Task<bool> Delete(int id)
        {
            bool status = await _empsrv.Delete(id);
            return status;
        }
        
    }
}