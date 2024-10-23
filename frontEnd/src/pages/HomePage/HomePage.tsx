import { useEffect, useState } from "react";
import {
  deleteEmployeeById,
  getAllEmployees,
  EmployeeDetails,
} from "../../services/employee-services";
import { useNavigate } from "react-router-dom";
import { Employee } from "../../components/Employee/Employee";
import { Box, Button, Typography } from "@mui/material";

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

  const commonStyles = {
    width: "100%",
    textAlign: "center",
    background: "linear-gradient(to right, #e1b6e3, white)",
    padding: "0.5em 0",
    fontWeight: "bold",
    fontFamily: '"Roboto", "Helvetica", "Arial", "sans-serif"',
    color: "rgb(142, 33, 166)",
    margin: 0,
    boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
    fontSize: "1.8em",
  };

  return (
    <Box className="container">
      <Typography
        variant="h4"
        className="highlighted-heading"
        sx={commonStyles}
      >
        Welcome to Employee Management App!
      </Typography>
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          marginTop: "20px", // Add some space between the heading and the button
        }}
      >
        <Button
          onClick={handleCreateEmployee}
          variant="contained"
          sx={{
            backgroundColor: "#6a1b9a",
            color: "#ffffff",
            "&:hover": { backgroundColor: "#4a148c" },
            border: "2px solid #ffffff",
            boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)",
          }}
        >
          Create Employee
        </Button>
      </Box>

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
        {employees.length === 0 && (
          <Typography variant="h2">No Employees Found</Typography>
        )}
        {employees && (
          <Employee
            employees={employees}
            onDelete={handleDelete}
            onEdit={handleEdit}
          />
        )}
      </div>
    </Box>
  );
};
