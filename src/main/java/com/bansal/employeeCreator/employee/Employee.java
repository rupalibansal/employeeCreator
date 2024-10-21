package com.bansal.employeeCreator.employee;

import jakarta.persistence.CascadeType;
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
import lombok.ToString;

import java.util.Date; // Add this import statement

import com.bansal.employeeCreator.address.Address;
import com.bansal.employeeCreator.department.Department;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

// import com.bansal.employeeCreator.address.Address;

@Entity
@Data
@ToString
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

    @OneToOne(cascade = CascadeType.ALL, orphanRemoval = true)
    @JoinColumn(name = "address_id", referencedColumnName = "id")
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
