package com.bansal.employeeCreator.department;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class DepartmentService {

    @Autowired
    private DepartmentRepository repo;

    public List<Department> findAll() {
        return this.repo.findAll();
    }
}
