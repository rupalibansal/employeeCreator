package com.bansal.employeeCreator.employee;

import java.util.Optional;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import com.bansal.employeeCreator.address.Address;
import com.bansal.employeeCreator.address.AddressRepository;
import com.bansal.employeeCreator.common.ValidationErrors;
import com.bansal.employeeCreator.common.exceptions.ServiceValidationException;
import com.bansal.employeeCreator.department.Department;
import com.bansal.employeeCreator.department.DepartmentRepository;
import jakarta.transaction.Transactional;
import jakarta.validation.Valid;

@Service
public class EmployeeService {

    @Autowired
    private EmployeeRepository employeeRepository;

    @Autowired
    private AddressRepository addressRepository;

    @Autowired
    private DepartmentRepository departmentRepository;

    @Autowired
    private ModelMapper modelMapper;

    public Response findAll(int pageNo, int pageSize) {
        // Step1: Create the Pageable object
        Pageable pageable = PageRequest.of(pageNo, pageSize);
        // Step2: Retrieve the Page object
        Page<Employee> employees = this.employeeRepository.findAll(pageable);
        // Step3: Convert Page to List and return
        Response response = new Response();
        response.setPageNo(employees.getNumber());
        response.setPageSize(employees.getSize());
        response.setTotalPages(employees.getTotalPages());
        response.setTotalRecords(employees.getTotalElements());
        response.setLast(employees.isLast());
        response.setEmployees(employees.getContent());
        return response;
    }

    public Response findEmployeesByDepartment(String department, int pageNo, int pageSize) {
        Pageable pageable = PageRequest.of(pageNo, pageSize);
        Page<Employee> employees = this.employeeRepository.findByDepartmentName(department, pageable);
        Response response = new Response();
        response.setPageNo(employees.getNumber());
        response.setPageSize(employees.getSize());
        response.setTotalPages(employees.getTotalPages());
        response.setTotalRecords(employees.getTotalElements());
        response.setLast(employees.isLast());
        response.setEmployees(employees.getContent());
        return response;
    }

    @Transactional
    public Employee createEmployee(@Valid CreateEmployeeDTO data) throws ServiceValidationException {
        ValidationErrors errors = new ValidationErrors();

        // Validate department ID
        Department department = validateDepartment(data.getDepartment_id(), errors);
        if (errors.hasErrors()) {
            throw new ServiceValidationException(errors);
        }
        // Map CreateEmployeeDTO to Employee entity
        Employee newEmployee = modelMapper.map(data, Employee.class);
        // Set department
        newEmployee.setDepartment(department);
        // Extract and save address details
        Address address = modelMapper.map(data.getAddress(), Address.class);
        System.out.println("address ajay : " + address.toString());
        Address savedAddress = addressRepository.save(address);
        // Link address to employee
        newEmployee.setAddress(savedAddress);
        // Check for validation errors

        // Save employee
        return employeeRepository.save(newEmployee);
    }

    private Department validateDepartment(Long departmentId, ValidationErrors errors)
            throws ServiceValidationException {
        Optional<Department> departmentResult = departmentRepository.findById(departmentId);
        System.out.println("departmentResult: " + departmentResult);
        if (departmentResult.isEmpty()) {
            errors.addError("department", String.format("Department with id %s does not exist", departmentId));
            throw new ServiceValidationException(errors);
        }
        return departmentResult.get();
    }

    public Optional<Employee> findById(Long id) {
        return this.employeeRepository.findById(id);
    }

    @Transactional
    public boolean deleteById(Long id) {

        // get the employee with id from the repository
        Optional<Employee> employee = this.employeeRepository.findById(id);
        // if the employee exists, first delete the address from the address table
        if (employee.isPresent()) {

            // commented below lines as the address will be deleted automatically

            // Employee employeeToDelete = employee.get();
            // Address addressToDelete = employeeToDelete.getAddress();
            // this.addressRepository.delete(addressToDelete);
            // then delete the employee from the employee table

            this.employeeRepository.deleteById(id);
        }
        // returns true if the employee was found and deleted , false otherwise.
        return employee.isPresent();
    }

    public Optional<Employee> updateEmployeeById(Long id, @Valid UpdateEmployeeDTO data) {

        Optional<Employee> optionalEmployee = this.employeeRepository.findById(id);
        if (optionalEmployee.isPresent()) {
            Employee foundEmployee = optionalEmployee.get();
            modelMapper.map(data, foundEmployee);

            // Update the address details
            if (data.getAddress() != null) {
                modelMapper.map(data.getAddress(), foundEmployee.getAddress());
            }

            // Update the department
            if (data.getDepartment_id() != null) {
                Department department = departmentRepository.findById(data.getDepartment_id())
                        .orElseThrow(() -> new RuntimeException("Department not found"));
                foundEmployee.setDepartment(department);
            }
            // Save the updated employee
            return Optional.of(employeeRepository.save(foundEmployee));
        } else {
            return Optional.empty();
        }
    }
}
