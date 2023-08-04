package com.inventorymanagement.employee.Service;

import java.util.List;
import java.util.Optional;

import com.inventorymanagement.employee.POJOs.Employee;

public interface IEmployeeService {

    List<Employee> GetAll();
    List<Employee> GetByDepartment(String department);
    List<Employee> GetByRole(String role);
    Optional<Employee> GetById(int empid);
    Boolean Insert(Employee employee);
    Boolean Update(Employee employee);
    Boolean Delete(int empid);
    
}