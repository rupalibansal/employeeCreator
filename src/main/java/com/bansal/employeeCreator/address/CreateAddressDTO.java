package com.bansal.employeeCreator.address;

import jakarta.validation.constraints.NotBlank;

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
