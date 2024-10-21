package com.bansal.employeeCreator.address;

import com.bansal.employeeCreator.employee.Employee;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.OneToOne;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.ToString;

@Entity
@Table(name = "address_details")

public class Address {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column
    private String streetAddress;

    @Column
    private String suburb;

    @Column
    private String postalCode;

    @Column
    private String state;

    @OneToOne(mappedBy = "address")
    @JsonIgnoreProperties("address")
    private Employee employee;

}
