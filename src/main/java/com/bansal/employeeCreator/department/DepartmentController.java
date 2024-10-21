package com.bansal.employeeCreator.department;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;

@RestController
@RequestMapping("api/departments")
@CrossOrigin(origins = "*")
public class DepartmentController {
    // GET /api/departments - Get all departments

    @Autowired
    DepartmentService departmentService;

    @GetMapping
    public ResponseEntity<List<Department>> getAllDepartments() {
        System.out.println("received request to get all departments  ");

        List<Department> allDepartments = this.departmentService.findAll();
        System.out.println("found categories " + allDepartments);
        return new ResponseEntity<List<Department>>(allDepartments, HttpStatus.OK);
    }

}
