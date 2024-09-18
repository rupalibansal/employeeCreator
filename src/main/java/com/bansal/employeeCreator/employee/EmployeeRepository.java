package com.bansal.employeeCreator.employee;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

public interface EmployeeRepository extends JpaRepository<Employee, Long> {
    @Query("Select e from Employee e where e.department.departmentName=:department")
    List<Employee> findByDepartmentName(String department);

}