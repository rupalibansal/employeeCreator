package com.bansal.employeeCreator.employee;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.bansal.employeeCreator.common.ValidationErrors;
import com.bansal.employeeCreator.common.exceptions.ServiceValidationException;
import com.bansal.employeeCreator.department.DepartmentRepository;

import jakarta.validation.Valid;

@Service
public class EmployeeService {

    @Autowired
    private EmployeeRepository employeeRepository;

    @Autowired
    private DepartmentRepository departmentRepository;

    public List<Employee> findAll() {
        return this.employeeRepository.findAll();

    }

    public List<Employee> findEmployeesByDepartment(String department) {
        return this.employeeRepository.findByDepartmentName(department);
    }

    public Employee createEmployee(@Valid CreateEmployeeDTO data) throws ServiceValidationException {
        ValidationErrors errors = new ValidationErrors();
        Employee newEmployee = new Employee();
        return this.employeeRepository.save(newEmployee);

    }

    public Todo createToDo(@Valid CreateTodoDTO data) throws ServiceValidationException {

        ValidationErrors errors = new ValidationErrors();
        // Todo newToDo = mapper.map(data, Todo.class);
        Todo newToDo = new Todo();
        newToDo.setName(data.getName());
        Optional<Category> categoryResult = this.categoryService.findById(data.getCategoryId());

        if (categoryResult.isEmpty()) {
            errors.addError("category", String.format("Category with id %s does not exist", data.getCategoryId()));
        } else {
            newToDo.setCategory(categoryResult.get());
        }

        if (errors.hasErrors()) {
            throw new ServiceValidationException(errors);
        }

        
        return this.todoRepository.save(newToDo);
    }

}
