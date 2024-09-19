package com.bansal.employeeCreator.employee;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToOne;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Date; // Add this import statement

import com.bansal.employeeCreator.address.Address;
import com.bansal.employeeCreator.department.Department;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

// import com.bansal.employeeCreator.address.Address;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
@Table(name = "employee_details")
public class Employee {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column
    private String firstName;

    @Column(nullable = true)
    private String middleName;

    @Column
    private String lastName;

    @Column(unique = true)
    private String email;

    @Column
    private String phoneNumber;

    @OneToOne
    @JoinColumn(name = "address_id")
    @JsonIgnoreProperties("employee")
    private Address address;

    @ManyToOne
    @JoinColumn(name = "department_id")
    @JsonIgnoreProperties("employees")
    private Department department;

    @Column
    private Date startDate;

    @Column(columnDefinition = "boolean default false")
    private Boolean isPermanent;

    
}
