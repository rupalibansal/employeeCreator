package com.bansal.employeeCreator.common.exceptions;

import com.bansal.employeeCreator.common.ValidationErrors;

public class ServiceValidationException {
    private ValidationErrors errors;

    public ServiceValidationException(ValidationErrors errors) {
        this.errors = errors;
    }

    public ValidationErrors getErrors() {
        return errors;
    }
}
