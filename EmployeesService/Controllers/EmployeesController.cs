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
        [Route("employees/{id}")]
        public Employee GetById(int id)
        {
            Employee employee = _empsrv.GetById(id);
            return employee;
        }
 
        [HttpPost]
        [Route("employees")]
        public bool Insert([FromBody] Employee employee)
        {
            bool status = _empsrv.Insert(employee);
            return status;
        }


        [HttpPut]
        [Route("employees")]
        public bool Update([FromBody] Employee employee)
        {
            bool status = _empsrv.Update(employee);
            return status;
        }

        [HttpGet]
        [Route("department/{theDepartment}")]
        public IEnumerable<Employee> GetByDepartment(string theDepartment)
        {
            IEnumerable<Employee> employees = _empsrv.GetByDepartment(theDepartment);
            return employees;
        }

        [HttpGet]
        [Route("role/{role}")]
        public IEnumerable<Employee> GetByRole(string role)
        {
            IEnumerable<Employee> employees = _empsrv.GetByRole(role);
            return employees;
        }


        [HttpDelete]
        [Route("employees/{id}")]
        public bool Delete(int id)
        {
            bool status = _empsrv.Delete(id);
            return status;
        }

    
    //get employees  orderhistory
    //orders ordered in a day by employee(supervisors)
    //tasks complete in a day(store workers)
    //
    //
    }
}