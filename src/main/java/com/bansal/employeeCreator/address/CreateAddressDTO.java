package com.bansal.employeeCreator.address;

import jakarta.validation.constraints.NotBlank;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.ToString;

@ToString
@NoArgsConstructor
@Data
public class CreateAddressDTO {

    @NotBlank
    private String streetAddress;

    @NotBlank
    private String suburb;

    @NotBlank
    private String postalCode;

    @NotBlank
    private String state;
}
