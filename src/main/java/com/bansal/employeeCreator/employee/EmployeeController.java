package com.bansal.employeeCreator.employee;

import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import jakarta.validation.Valid;

@RestController
@RequestMapping("api/employees")
public class EmployeeController {

    @Autowired
    private EmployeeService employeeService;

    // Get all employees from the database
    // /api/employees?department=HR - Get all employees in HR department
    @GetMapping
    public ResponseEntity<List<Employee>> findEmployeesByDepartment(
            @RequestParam(name = "department", required = false) String department) {
        if (department == null) {
            // If no department_id is provided, return all employees
            List<Employee> employees = this.employeeService.findAll();
            return new ResponseEntity<List<Employee>>(employees, HttpStatus.OK);
        } else {
            // If categoryId is provided, return todos filtered by category
            List<Employee> employeesByDepartment = this.employeeService.findEmployeesByDepartment(department);
            return new ResponseEntity<List<Employee>>(employeesByDepartment, HttpStatus.OK);
        }
    }

    // /api/employees - Create a new employee
    @PostMapping
    public ResponseEntity<Employee> createEmployee(@Valid @RequestBody CreateEmployeeDTO data) throws Exception {
        System.out.println("data = " + data.toString());
        Employee createdEmployee = this.employeeService.createEmployee(data);
        return new ResponseEntity<Employee>(createdEmployee, HttpStatus.CREATED);
    }

}

// /api/employees/{id} - Get employee by id

// /api/employees/{id} - Update employee by id
// /api/employees/{id} - Delete employee by id
// /api/employees?department=HR - Get all employees in HR department
// /api/employees?pagesize=10&page=2 - Get 10 employees on page 2