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

            [HttpPost]
        [Route("insertEmployee")]
        public bool InsertEmployee( [FromBody] Employee employee)
        {
            Console.WriteLine(employee.EmployeeFirstName ,employee.EmployeeLastName, employee.DepartmentId, employee.HireDate, employee.BirthDate, employee.GenderId ,employee.RoleId);
            bool status = _empsrv.Insert( employee);
            return status;
        }


        // [HttpPut]
        // [Route("updateEmployee/{id}")]
        // public bool UpdateEmployee(int id, [FromBody] Employee employee)
        // {
        //     bool status = _empsrv.Update(id, employee);
        //     return status;
        // }



        // [HttpDelete]
        // [Route("deleteEmployee/{id}")]
        // public bool DeleteEmployee(int id)
        // {
        //     bool status = _empsrv.Delete(id);
        //     return status;
        // }

    }
}