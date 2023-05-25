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
        public IEnumerable<Employee> GetAll()
        {
            IEnumerable<Employee> employees = _empsrv.GetAll();
            return employees;
        }

        [HttpGet]
        [Route("employee/{id}")]
        public Employee GetById(int id)
        {
            Employee employee = _empsrv.GetById(id);
            return employee;
        }
 
        [HttpPost]
        [Route("employee")]
        public bool Insert([FromBody] Employee employee)
        {
            bool status = _empsrv.Insert(employee);
            return status;
        }


        [HttpPut]
        [Route("employee")]
        public bool Update([FromBody] Employee employee)
        {
            bool status = _empsrv.Update(employee);
            return status;
        }

        [HttpGet]
        [Route("department/{id}")]
        public IEnumerable<Employee> GetByDepartment(int id)
        {
            IEnumerable<Employee> employees = _empsrv.GetByDepartment(id);
            return employees;
        }

        [HttpDelete]
        [Route("employee/{id}")]
        public bool DeleteEmployee(int id)
        {
            bool status = _empsrv.Delete(id);
            return status;
        }

    }
}