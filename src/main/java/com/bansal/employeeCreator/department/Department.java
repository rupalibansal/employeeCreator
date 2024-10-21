package com.bansal.employeeCreator.department;

import java.util.List;

import com.bansal.employeeCreator.employee.Employee;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;
import lombok.Data;

@Entity
@Table(name = "department")
@Data
public class Department {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "department_name", unique = true)
    private String departmentName;

    @OneToMany(mappedBy = "department")
    @JsonIgnoreProperties("department")
    private List<Employee> employees;

    @Override
    public String toString() {
        return "Department [name=" + departmentName + "]";
    }
}
