package com.bansal.employeeCreator.employee;

import java.util.List;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.bansal.employeeCreator.address.Address;
import com.bansal.employeeCreator.address.AddressRepository;
import com.bansal.employeeCreator.common.ValidationErrors;
import com.bansal.employeeCreator.common.exceptions.ServiceValidationException;
import com.bansal.employeeCreator.department.DepartmentRepository;

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

    public Employee createEmployee(@Valid CreateEmployeeDTO data) throws ServiceValidationException {
        ValidationErrors errors = new ValidationErrors();
        // Map CreateEmployeeDTO to Employee entity
        Employee newEmployee = modelMapper.map(data, Employee.class);

        System.out.println("data.getaddress() = " + data.toString());
        // Extract and save address details
        Address address = modelMapper.map(data.getAddress(), Address.class);
        Address savedAddress = addressRepository.save(address);

        // Link address to employee
        newEmployee.setAddress(savedAddress);

        // Save employee
        return employeeRepository.save(newEmployee);

    }

}
