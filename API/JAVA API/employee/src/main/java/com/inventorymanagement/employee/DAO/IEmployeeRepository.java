package com.inventorymanagement.employee.DAO;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import com.inventorymanagement.employee.POJOs.Employee;

@Repository
public interface IEmployeeRepository extends JpaRepository<Employee,Integer> {

    @Query("select  employees.userid, employees.imageurl, departments.department, roles.role   from employees  inner join departments on employees.departmentid=departments.id inner join roles on employees.roleid=roles.id  where   departments.department=")
    List<Employee> GetByDepartment(String department);

    @Query("select   employees.userid, employees.imageurl, departments.department, roles.role from employees  inner join departments on employees.departmentid=departments.id   inner join roles on employees.roleid=roles.id where roles.role =@role")
    List<Employee> GetByRole(String role);
}
