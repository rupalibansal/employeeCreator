import React from "react";
import { Card, CardContent, Typography, Box, Button } from "@mui/material";

import { EmployeeDetails } from "../../services/employee-services";

interface EmployeeCardProps {
  employee: EmployeeDetails;
  onDelete: (id: number) => Promise<unknown>;
  onEdit: (id: number) => Promise<void>;
}

const EmployeeCard: React.FC<EmployeeCardProps> = ({
  employee,
  onDelete,
  onEdit,
}) => {
  const handleDelete = async () => {
    await onDelete(employee.id);
  };

  const handleEdit = async () => {
    await onEdit(employee.id);
  };

  const buttonStyles = {
    color: "#6a1b9a", // Purple color for both buttons
    "&:hover": { color: "#4a148c" }, // Darker shade on hover
  };

  return (
    <Card
      sx={{
        marginBottom: 2,
        "&:hover": {
          boxShadow: 6,
        },
      }}
    >
      <CardContent>
        <Box display="flex" justifyContent="space-between" alignItems="center">
          <Box sx={{ marginBottom: 2 }}>
            <Typography variant="h6" component="h2" sx={{ fontWeight: "bold" }}>
              {employee.firstName}
            </Typography>
            <Typography variant="h6" component="h2">
              {employee.isPermanent ? "Permanent" : "Contract"}
            </Typography>
            <Typography variant="h6" component="h2">
              {employee.email}
            </Typography>
            <Typography variant="h6" component="h2">
              {employee.department.departmentName}
            </Typography>
          </Box>
          <Box>
            <Button variant="text" onClick={handleEdit} sx={buttonStyles}>
              EDIT
            </Button>
            <Button variant="text" onClick={handleDelete} sx={buttonStyles}>
              DELETE
            </Button>
          </Box>
        </Box>
      </CardContent>
    </Card>
  );
};

export default EmployeeCard;
