package com.bansal.employeeCreator.employee;

import java.util.List;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class Response {
    private int pageNo;
    private int pageSize;
    private long totalRecords;
    private int totalPages;
    private boolean isLast;
    private List<Employee> employees;

}
