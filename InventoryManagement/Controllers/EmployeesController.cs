using InventoryManagement.Models;
using InventoryManagement.Services.Interfaces;
using Microsoft.AspNetCore.Mvc;

namespace InventoryManagement.Controllers
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
        [Route("getallemployees")]
        public IEnumerable<Employee> GetAllEmployees()
        {
          IEnumerable<Employee> employees= _empsrv.GetAll();
          return employees;
        }

        [HttpGet]
        [Route("getemployee/{id}")]
        public Employee GetEmployee(int id)
        {
            Employee employee = _empsrv.GetById(id);
            return employee;
        }

        [HttpPut]
        [Route("updateEmployee/{id}")]
        public bool UpdateEmployee(int id, [FromBody] Employee employee)
        {
            bool status = false;
            return status;
        }

        [HttpPost]
        [Route("Insertemployee")]
        public bool InsertEmployee([FromBody] Employee employee)
        {
            bool status = false;
            return status;
        }

        [HttpDelete]
        [Route("deleteEmployee/{id}")]
        public bool DeleteEmployee(int id)
        {
            bool status = false;
            return status;
        }

    }
}