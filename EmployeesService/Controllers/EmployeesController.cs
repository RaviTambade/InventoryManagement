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
        [HttpGet]
        [Route("getemployeeForUpdate/{id}")]
        public Employee GetEmployeeUpdate(int id)
        {
            Employee employee = _empsrv.GetByIdUpdate(id);
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


        [HttpPut]
        [Route("updateEmployee")]
        public bool UpdateEmployee([FromBody] Employee employee)
        {
            string[] subs = employee.BirthDate.Split(' ');
            Console.WriteLine(employee.EmployeeId);
            bool status = _empsrv.Update( employee);
            return status;
        }

         [HttpGet]
        [Route("GetDepartment/{id}")]
        public IEnumerable<Employee> GetAllEmployees(int id)
        {
          IEnumerable<Employee> employees= _empsrv.GetByDepartment(id);
          return employees;
        }


        // [HttpDelete]
        // [Route("deleteEmployee/{id}")]
        // public bool DeleteEmployee(int id)
        // {
        //     bool status = _empsrv.Delete(id);
        //     return status;
        // }

    }
}