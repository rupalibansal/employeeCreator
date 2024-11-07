package com.bansal.employeeCreator.employee;

import static org.mockito.ArgumentMatchers.any;
import static org.mockito.ArgumentMatchers.anyLong;
import static org.mockito.ArgumentMatchers.anyString;
import static org.mockito.ArgumentMatchers.eq;
import static org.mockito.Mockito.times;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;

import java.util.Arrays;
import java.util.List;
import java.util.Optional;

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
import com.bansal.employeeCreator.address.CreateAddressDTO;
import com.bansal.employeeCreator.address.UpdateAddressDTO;
import com.bansal.employeeCreator.address.AddressRepository;
import com.bansal.employeeCreator.common.exceptions.ServiceValidationException;
import com.bansal.employeeCreator.department.Department;
import com.bansal.employeeCreator.department.DepartmentRepository;
import com.bansal.employeeCreator.employee.UpdateEmployeeDTO;

public class employeeServiceUnitTest {

    @Mock
    private EmployeeRepository employeeRepository;

    @Mock
    private AddressRepository addressRepository;

    @Mock
    private DepartmentRepository departmentRepository;

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

    @Test
    public void testFindEmployeesByDepartment() {
        Pageable pageable = PageRequest.of(0, 10);
        List<Employee> employeeList = Arrays.asList(new Employee(), new Employee());
        Page<Employee> employeePage = new PageImpl<>(employeeList, pageable, employeeList.size());

        when(employeeRepository.findByDepartmentName(anyString(), eq(pageable))).thenReturn(employeePage);

        Response response = employeeService.findEmployeesByDepartment("Engineering", 0, 10);

        assertThat(response.getEmployees()).hasSize(2);
        assertThat(response.getTotalRecords()).isEqualTo(2);
    }

    @Test
    public void testCreateEmployee() throws ServiceValidationException {
        // Set up the CreateEmployeeDTO
        CreateEmployeeDTO createEmployeeDTO = new CreateEmployeeDTO();
        createEmployeeDTO.setDepartment_id(1L);
        CreateAddressDTO addressDTO = new CreateAddressDTO();
        addressDTO.setStreetAddress("123 Main St");
        addressDTO.setSuburb("Suburbia");
        addressDTO.setPostalCode("12345");
        addressDTO.setState("New South Wales");
        createEmployeeDTO.setAddress(addressDTO);

        // Set up the Department and Address entities
        Department department = new Department();
        Address address = new Address();
        Employee employee = new Employee();

        // Mock the repository and model mapper methods
        when(departmentRepository.findById(anyLong())).thenReturn(Optional.of(department));
        when(modelMapper.map(any(CreateAddressDTO.class), eq(Address.class))).thenReturn(address);
        when(modelMapper.map(any(CreateEmployeeDTO.class), eq(Employee.class))).thenReturn(employee);
        when(addressRepository.save(any(Address.class))).thenReturn(address);
        when(employeeRepository.save(any(Employee.class))).thenReturn(employee);

        // Call the service method
        Employee createdEmployee = employeeService.createEmployee(createEmployeeDTO);

        // Verify the results
        assertThat(createdEmployee).isNotNull();
        verify(departmentRepository, times(1)).findById(anyLong());
        verify(addressRepository, times(1)).save(any(Address.class));
        verify(employeeRepository, times(1)).save(any(Employee.class));
    }

    @Test
    public void testCreateEmployeeWithInvalidDepartment() {
        CreateEmployeeDTO createEmployeeDTO = new CreateEmployeeDTO();
        createEmployeeDTO.setDepartment_id(1L);

        when(departmentRepository.findById(anyLong())).thenReturn(Optional.empty());

        ServiceValidationException exception = assertThrows(ServiceValidationException.class, () -> {
            employeeService.createEmployee(createEmployeeDTO);
        });

        assertThat(exception.getErrors().hasErrors()).isTrue();
    }

    @Test
    public void testFindById() {
        Employee employee = new Employee();
        when(employeeRepository.findById(anyLong())).thenReturn(Optional.of(employee));

        Optional<Employee> result = employeeService.findById(1L);

        assertThat(result).isPresent();
        assertThat(result.get()).isEqualTo(employee);
    }

    @Test
    public void testDeleteById() {
        Employee employee = new Employee();
        when(employeeRepository.findById(anyLong())).thenReturn(Optional.of(employee));

        boolean result = employeeService.deleteById(1L);

        assertThat(result).isTrue();
        verify(employeeRepository, times(1)).deleteById(1L);
    }

}