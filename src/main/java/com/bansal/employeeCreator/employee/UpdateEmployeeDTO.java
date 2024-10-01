package com.bansal.employeeCreator.employee;

import java.util.Date;

import com.bansal.employeeCreator.address.CreateAddressDTO;

import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.ToString;

@Data
@ToString
@NoArgsConstructor
public class UpdateEmployeeDTO {
    private String firstName;

    private String middleName;

    private String lastName;

    private String email;

    private String phoneNumber;

    private CreateAddressDTO address;
    private Long department_id;
    private Date startDate;
    private Boolean isPermanent;

}
