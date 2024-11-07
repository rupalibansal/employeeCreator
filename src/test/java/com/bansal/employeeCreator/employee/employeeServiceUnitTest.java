package com.bansal.employeeCreator.employee;

import static org.mockito.Mockito.when;

import java.util.Arrays;
import java.util.List;
import static org.assertj.core.api.Assertions.assertThat;
import static org.junit.jupiter.api.Assertions.assertThrows;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import org.modelmapper.ModelMapper;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import com.bansal.employeeCreator.address.Address;
import com.bansal.employeeCreator.department.Department;

public class employeeServiceUnitTest {

    @Mock
    private EmployeeRepository employeeRepository;

    @Mock
    private Address addressRepository;

    @Mock
    private Department departmentRepository;

    @Mock
    private ModelMapper modelMapper;

    @InjectMocks
    private EmployeeService employeeService;

    @BeforeEach
    void setUp() {
        MockitoAnnotations.openMocks(this);
    }

    @Test
    public void testFindAll() {
        Pageable pageable = PageRequest.of(0, 10);
        List<Employee> employeeList = Arrays.asList(new Employee(), new Employee());
        Page<Employee> employeePage = new PageImpl<>(employeeList, pageable, employeeList.size());

        when(employeeRepository.findAll(pageable)).thenReturn(employeePage);

        Response response = employeeService.findAll(0, 10);

        assertThat(response.getEmployees()).hasSize(2);
        assertThat(response.getTotalRecords()).isEqualTo(2);
    }

}
