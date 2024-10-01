package com.bansal.employeeCreator.address;

import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.ToString;

@ToString
@NoArgsConstructor
@Data
public class UpdateAddressDTO {

    private String streetAddress;

    private String suburb;

    private String postalCode;

    private String state;
}
