package com.bansal.employeeCreator.employee;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.bansal.employeeCreator.common.exceptions.NotFoundException;

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

    // /api/employees/{id} - Get employee by id
    @GetMapping("/{id}")
    public ResponseEntity<Employee> findEmployeeById(@PathVariable long id) throws NotFoundException {
        Optional<Employee> result = this.employeeService.findById(id);
        Employee foundEmployee = result
                .orElseThrow(() -> new NotFoundException("Could not find Employee with id " + id));
        return new ResponseEntity<>(foundEmployee, HttpStatus.OK);
    }

    // /api/employees - Create a new employee
    @PostMapping
    public ResponseEntity<Employee> createEmployee(@Valid @RequestBody CreateEmployeeDTO data) throws Exception {
        Employee createdEmployee = this.employeeService.createEmployee(data);
        return new ResponseEntity<Employee>(createdEmployee, HttpStatus.CREATED);
    }

    // /api/employees/{id} - Delete employee by id
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteEmployeeById(@PathVariable Long id) throws NotFoundException {
        System.out.println("Received Request to delete employee record for id: " + id);

        boolean deleteSuccessful = this.employeeService.deleteById(id);
        if (deleteSuccessful == false) {
            throw new NotFoundException("Could not find Employee with id " + id);
        }
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);

    }

}

// /api/employees/{id} - Update employee by id

// /api/employees?pagesize=10&page=2 - Get 10 employees on page 2