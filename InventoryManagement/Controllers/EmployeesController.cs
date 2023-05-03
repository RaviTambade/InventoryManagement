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
            bool status = _empsrv.Update(id, employee);
            return status;
        }

        [HttpPost]
        [Route("Insertemployee")]
        public bool InsertEmployee([FromBody] Employee employee)
        {
            bool status = _empsrv.Insert(employee);
            return status;
        }

        [HttpDelete]
        [Route("deleteEmployee/{id}")]
        public bool DeleteEmployee(int id)
        {
            bool status = _empsrv.Delete(id);
            return status;
        }

        [HttpGet]
        [Route("ordershistory/{id}")]
        public IEnumerable<Order> OrdersHistory(int id)
        {
            IEnumerable<Order> orders = _empsrv.OrderHistory(id);
            return orders;
        }

        [HttpGet]
        [Route("ordershistory/{id}")]
        public IEnumerable<Order> OrdersHistory(int id)
        {
            IEnumerable<Order> orders = _empsrv.OrderHistory(id);
            return orders;
        }
    }
}