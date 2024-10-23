import { Container, List } from "@mui/material";
import EmployeeCard from "../EmployeeCard/EmployeeCard";
import "./Employee.css";
import { EmployeeDetails } from "../../services/employee-services";

interface EmployeeProps {
  employees: EmployeeDetails[];
  onDelete: (id: number) => Promise<unknown>;
  onEdit: (id: number) => Promise<void>;
}

export const Employee = ({ employees, onDelete, onEdit }: EmployeeProps) => {
  console.log("Employee", employees);
  const handleDelete = async (id: number) => {
    await onDelete(id);
  };

  const handleEdit = async (id: number) => {
    await onEdit(id);
  };

  return (
    <Container>
      <List className="employee-list">
        {employees.map((employee) => (
          <EmployeeCard
            key={employee.id}
            employee={employee}
            onDelete={handleDelete}
            onEdit={handleEdit}
          />
        ))}
      </List>
    </Container>
  );
};
