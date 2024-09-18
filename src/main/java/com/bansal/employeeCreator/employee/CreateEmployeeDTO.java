package com.bansal.employeeCreator.employee;

import java.util.Date;
import org.hibernate.validator.constraints.Length;
import com.bansal.employeeCreator.address.Address;
import com.bansal.employeeCreator.address.CreateAddressDTO;
import com.bansal.employeeCreator.department.Department;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Pattern;
import lombok.Data;

@Data
public class CreateEmployeeDTO {

    @NotBlank
    @Length(min = 3, max = 50)
    private String firstName;

    private String middleName;

    @NotBlank
    @Length(min = 3, max = 50)
    private String lastName;

    @Pattern(regexp = "^[a-zA-Z0-9+_.-]+@[a-zA-Z0-9.-]+$")
    private String email;

    // Australian phone number regex
    @Pattern(regexp = "^(?:\\+61\\s?4\\d{2}\\s?\\d{3}\\s?\\d{3}|0[2-9]\\d{8})$")
    private String phoneNumber;

    @NotNull
    private CreateAddressDTO address;

    @NotNull
    @Min(1)
    private Department department_id;

    @NotNull
    private Date startDate;

    @NotNull
    private Boolean isPermanent;

}
