package com.bansal.employeeCreator.employee;

import java.util.List;

import org.springframework.boot.autoconfigure.data.web.SpringDataWebProperties.Pageable;
import org.springframework.data.domain.Page;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

public interface EmployeeRepository extends JpaRepository<Employee, Long> {
    @Query("Select e from Employee e where e.department.departmentName=:department")
    Page<Employee> findByDepartmentName(@Param("department") String department, org.springframework.data.domain.Pageable pageable);

}