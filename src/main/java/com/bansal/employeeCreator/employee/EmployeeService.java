package com.bansal.employeeCreator.employee;

import java.util.List;
import java.util.Optional;

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

    public List<Employee> findAll() {
        return this.employeeRepository.findAll();

    }

    public List<Employee> findEmployeesByDepartment(String department) {
        return this.employeeRepository.findByDepartmentName(department);
    }

    @Transactional
    public Employee createEmployee(@Valid CreateEmployeeDTO data) throws ServiceValidationException {
        ValidationErrors errors = new ValidationErrors();

        // Validate department ID
        Department department = validateDepartment(data.getDepartment_id(), errors);
        // Map CreateEmployeeDTO to Employee entity
        Employee newEmployee = modelMapper.map(data, Employee.class);
        // Set department
        newEmployee.setDepartment(department);
        // Extract and save address details
        Address address = modelMapper.map(data.getAddress(), Address.class);
        Address savedAddress = addressRepository.save(address);
        // Link address to employee
        newEmployee.setAddress(savedAddress);
        // Check for validation errors
        if (errors.hasErrors()) {
            throw new ServiceValidationException(errors);
        }
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
            Employee employeeToDelete = employee.get();
            Address addressToDelete = employeeToDelete.getAddress();
            this.addressRepository.delete(addressToDelete);
            // then delete the employee from the employee table
            this.employeeRepository.deleteById(id);
        }
        // returns true if the employee was found and deleted , false otherwise.
        return employee.isPresent();
    }
}
