import React from "react";
import { Card, CardContent, Typography, IconButton, Box } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
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
          </Box>
          <Box display="flex" alignItems="center">
            <Box
              sx={{
                // backgroundColor: getDepartmentColor(employee.name),
                color: "white",
                padding: "2px 8px",
                borderRadius: "12px",
                display: "inline-block",
                marginLeft: 1,
              }}
            >
              <Typography variant="subtitle2" component="h2">
                {employee.firstName}
              </Typography>
            </Box>
          </Box>
          <Box>
            <IconButton
              edge="end"
              aria-label="delete"
              color="error"
              onClick={handleDelete}
            >
              <DeleteIcon />
            </IconButton>
            <IconButton edge="end" aria-label="edit">
              <EditIcon onClick={handleEdit} />
            </IconButton>
          </Box>
        </Box>
      </CardContent>
    </Card>
  );
};

export default EmployeeCard;
