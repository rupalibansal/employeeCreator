import { useEffect, useState } from "react";
import {
  deleteEmployeeById,
  getAllEmployees,
  EmployeeDetails,
} from "../../services/employee-services";
import { useNavigate } from "react-router-dom";
import { Employee } from "../../components/Employee/Employee";

export const HomePage = () => {
  const [employees, setEmployees] = useState<EmployeeDetails[]>([]);
  useEffect(() => {
    getAllEmployees()
      .then((data) => setEmployees(data.employees))
      .catch((e) => console.log(e));
  }, []);

  const navigate = useNavigate();

  const handleCreateEmployee = () => {
    navigate("/employee/new");
  };

  const handleDelete = async (id: number) => {
    const confirmed = confirm("Are you sure?");
    if (!confirmed) {
      return;
    }
    await deleteEmployeeById(id);
    setEmployees(employees.filter((employee) => employee.id !== id));
  };

  const handleEdit = async (id: number) => {
    navigate("/employee/edit/" + id);
  };

  return (
    <div className="container">
      <h1 className="highlighted-heading">
        Welcome to Employee Management App!
      </h1>
      <div>
        <button
          className="create-employee-button"
          onClick={handleCreateEmployee}
          style={{ marginRight: "10px" }}
        >
          Create Employee
        </button>
      </div>

      {/* <div className="department-pills">
        <Box
          sx={{
            backgroundColor: "#9e9e9e", // Grey for "All" category
            color: "white",
            padding: "2px 8px",
            borderRadius: "12px",
            display: "inline-block",
            margin: "5px",
            cursor: "pointer",
          }}
          onClick={() => handleDepartmentClick(null)}
        >
          <Typography variant="subtitle2" component="span">
            All
          </Typography>
        </Box>
        {uniqueDepartments.map((department) => (
          <Box
            key={department}
            sx={{
              backgroundColor: getDepartmentColor(department),
              color: "white",
              padding: "2px 8px",
              borderRadius: "12px",
              display: "inline-block",
              margin: "5px",
              cursor: "pointer",
            }}
            onClick={() => handleDepartmentClick(department)}
          >
            <Typography variant="subtitle2" component="span">
              {department}
            </Typography>
          </Box>
        ))}
      </div> */}

      <div className="employee-container">
        {employees.length === 0 && <h2>No Employees Found</h2>}
        {employees && (
          <Employee
            employees={employees}
            onDelete={handleDelete}
            onEdit={handleEdit}
          />
        )}
      </div>
    </div>
  );
};
