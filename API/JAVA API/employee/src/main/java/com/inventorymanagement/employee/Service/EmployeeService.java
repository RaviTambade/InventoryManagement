package com.inventorymanagement.employee.Service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.inventorymanagement.employee.DAO.IEmployeeRepository;
import com.inventorymanagement.employee.POJOs.Employee;

@Service
public class EmployeeService implements IEmployeeService{

       @Autowired
    private IEmployeeRepository _repo;

    @Override
    public List<Employee> GetAll() {
        return _repo.findAll();
    }

    @Override
    public List<Employee> GetByDepartment(String department) {
        return _repo.GetByDepartment(department);
    }

    @Override
    public List<Employee> GetByRole(String role) {
        return _repo.GetByRole(role);
    }


    @Override
    public Optional<Employee> GetById(int empid) {
        return _repo.findById(empid);
    }

    @Override
    public Boolean Insert(Employee employee) {
        return _repo.save(employee) != null;
    }

    @Override
    public Boolean Update(Employee employee) {
        return _repo.save(employee) != null;
    }

    @Override
    public Boolean Delete(int empid) {
        // TODO Auto-generated method stub
        boolean status= false;
        if (_repo.existsById(empid)) {
            _repo.deleteById(empid);
            status=true;
        }
        return status;    }
    
}
