package com.inventorymanagement.employee.Controller;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import com.inventorymanagement.employee.POJOs.Employee;
import com.inventorymanagement.employee.Service.IEmployeeService;

@RestController
@RequestMapping("/api/employees")
public class EmployeesController {

    @Autowired
    private IEmployeeService _service;

    @GetMapping
    public List<Employee> GetAll() {
        return _service.GetAll();
    }

    // @GetMapping("/{department}")
    // public List<Employee> GetByDepartment(String department) {
    //     return _service.GetByDepartment(department);
    // }

    // @GetMapping("/{department}")
    // public List<Employee> GetByRole(String role) {
    //     return _service.GetByRole(role);
    // }

    @PostMapping
    public Boolean Insert(@RequestBody Employee employee) {
        return _service.Insert(employee);
    }

    @DeleteMapping("/{empid}")
    public Boolean Delete(@PathVariable int empid) {
        return _service.Delete(empid);
    }

    @GetMapping("/{empid}")
    public Optional<Employee> GetById(@PathVariable int empid) {
        return _service.GetById(empid);
    }

    @PutMapping
    public Boolean Update(@RequestBody Employee employee) {
        return _service.Update(employee);
    }

}
