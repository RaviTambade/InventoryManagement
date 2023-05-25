using EmployeesService.Models;
using EmployeesService.Services.Interfaces;
using Microsoft.AspNetCore.Mvc;

namespace EmployeesService.Controllers
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
        public IEnumerable<Employee> GetAllEmployees()
        {
          IEnumerable<Employee> employees= _empsrv.GetAll();
          return employees;
        }

        [HttpGet]
        [Route("employee/{id}")]
        public Employee GetEmployee(int id)
        {
            Employee employee = _empsrv.GetById(id);
            return employee;
        }
        [HttpGet]
        [Route("getemployeeForUpdate/{id}")]
        public Employee GetEmployeeUpdate(int id)
        {
            Employee employee = _empsrv.GetByIdUpdate(id);
            return employee;
        }

            [HttpPost]
        [Route("employee")]
        public bool InsertEmployee( [FromBody] Employee employee)
        {
            bool status = _empsrv.Insert( employee);
            return status;
        }


        [HttpPut]
        [Route("employee")]
        public bool UpdateEmployee([FromBody] Employee employee)
        {
            bool status = _empsrv.Update( employee);
            return status;
        }

         [HttpGet]
        [Route("department/{id}")]
        public IEnumerable<Employee> GetAllEmployees(int id)
        {
          IEnumerable<Employee> employees= _empsrv.GetByDepartment(id);
          return employees;
        }

        // [HttpDelete]
        // [Route("employee/{id}")]
        // public bool DeleteEmployee(int id)
        // {
        //     bool status = _empsrv.Delete(id);
        //     return status;
        // }

    }
}