import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { employeeSchema, EmployeeFormValues } from "./employeeSchema";
import { DevTool } from "@hookform/devtools";
import {
  TextField,
  Button,
  Stack,
  Container,
  Paper,
  Typography,
  FormControlLabel,
  Checkbox,
  Box,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from "@mui/material";
import { useEffect, useState } from "react";
import {
  createEmployee,
  Department,
  getAllDepartments,
  getEmployeeById,
  updateEmployeeById,
} from "../../services/employee-services";
import { useNavigate, useParams } from "react-router-dom";

const EmployeeForm = () => {
  const navigate = useNavigate();
  const { id } = useParams() as { id: string };
  const [departments, setDepartments] = useState<Department[]>([]);
  useEffect(() => {
    getAllDepartments().then((data) => setDepartments(data));
  }, []);

  useEffect(() => {
    getEmployeeById(Number(id))
      .then((data) => {
        console.log("Employee Data", data);
        const date = new Date(data.startDate);
        reset({ ...data, startDate: date.toISOString().split("T")[0] });
      })
      .catch((e) => console.log(e));
  }, [id]);

  const form = useForm<EmployeeFormValues>({
    resolver: zodResolver(employeeSchema),
    mode: "all",
    defaultValues: {
      firstName: "",
      middleName: "",
      lastName: "",
      email: "",
      phoneNumber: "",
      address: {
        streetAddress: "",
        suburb: "",
        postalCode: "",
        state: "",
      },
      department_id: 1,
      startDate: "",
      isPermanent: false,
    },
  });
  const { register, control, handleSubmit, formState, reset } = form;
  console.log("Form State", form);
  const { errors, isSubmitSuccessful } = formState;

  // List of Australian states
  const australianStates = [
    "New South Wales",
    "Victoria",
    "Queensland",
    "South Australia",
    "Western Australia",
    "Tasmania",
    "Northern Territory",
  ];

  const onSubmit = (data: EmployeeFormValues) => {
    console.log("Form Submitted", data);
    if (id) {
      // Edit Employee
      updateEmployeeById(Number(id), data)
        .then(() => navigate("/"))
        .catch((e) => console.log(e));
    } else {
      createEmployee(data)
        .then(() => navigate("/"))
        .catch((e) => console.log(e));
    }
  };

  useEffect(() => {
    if (isSubmitSuccessful) {
      reset();
      alert("Form Submitted Successfully");
    }
  }, [isSubmitSuccessful, reset]);

  return (
    <>
      <Container
        maxWidth="md"
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          minHeight: "100vh",
        }}
      >
        <Box sx={{ width: "100%", maxWidth: 700, padding: 4, borderRadius: 2 }}>
          <Paper elevation={3} sx={{ width: "100%", padding: 4 }}>
            <Typography
              variant="h4"
              component="h1"
              gutterBottom
              sx={{
                fontWeight: "bold",
                padding: 2,
                borderBottom: "2px solid #6a1b9a",
                textAlign: "right",
              }}
            >
              Employee Details
            </Typography>
            <form onSubmit={handleSubmit(onSubmit)} noValidate>
              <Stack spacing={2}>
                <Typography
                  variant="h6"
                  component="h2"
                  sx={{ fontWeight: "bold" }}
                >
                  Personal Details
                </Typography>
                <TextField
                  label="First Name"
                  size="small"
                  {...register("firstName")}
                  error={!!errors.firstName}
                  helperText={errors.firstName?.message}
                  fullWidth
                  margin="normal"
                  InputLabelProps={{
                    shrink: true,
                  }}
                />
                <TextField
                  label="Middle Name (if applicable)"
                  size="small"
                  {...register("middleName")}
                  error={!!errors.middleName}
                  helperText={errors.middleName?.message}
                  fullWidth
                  margin="normal"
                  InputLabelProps={{
                    shrink: true,
                  }}
                />
                <TextField
                  label="Last Name"
                  size="small"
                  {...register("lastName")}
                  error={!!errors.lastName}
                  helperText={errors.lastName?.message}
                  fullWidth
                  margin="normal"
                  InputLabelProps={{
                    shrink: true,
                  }}
                />
                <Typography
                  variant="h6"
                  component="h2"
                  sx={{ fontWeight: "bold" }}
                >
                  Contact Details
                </Typography>
                <TextField
                  label="Email"
                  size="small"
                  {...register("email")}
                  error={!!errors.email}
                  helperText={errors.email?.message}
                  fullWidth
                  margin="normal"
                  InputLabelProps={{
                    shrink: true,
                  }}
                />
                <TextField
                  label="Phone Number"
                  size="small"
                  {...register("phoneNumber")}
                  error={!!errors.phoneNumber}
                  helperText={errors.phoneNumber?.message}
                  fullWidth
                  margin="normal"
                  InputLabelProps={{
                    shrink: true,
                  }}
                />
                <TextField
                  label="Street Address"
                  size="small"
                  {...register("address.streetAddress")}
                  error={!!errors.address?.streetAddress}
                  helperText={errors.address?.streetAddress?.message}
                  fullWidth
                  margin="normal"
                  InputLabelProps={{
                    shrink: true,
                  }}
                />
                <TextField
                  label="Suburb"
                  size="small"
                  {...register("address.suburb")}
                  error={!!errors.address?.suburb}
                  helperText={errors.address?.suburb?.message}
                  fullWidth
                  margin="normal"
                  InputLabelProps={{
                    shrink: true,
                  }}
                />
                <TextField
                  label="Postal Code"
                  size="small"
                  {...register("address.postalCode")}
                  error={!!errors.address?.postalCode}
                  helperText={errors.address?.postalCode?.message}
                  fullWidth
                  margin="normal"
                  InputLabelProps={{
                    shrink: true,
                  }}
                />
                <FormControl fullWidth margin="normal">
                  <InputLabel id="state-label">State</InputLabel>
                  <Controller
                    name="address.state"
                    control={control}
                    defaultValue=""
                    render={({ field }) => (
                      <Select
                        {...field}
                        labelId="state-label"
                        value={field.value}
                        onChange={(event) => {
                          field.onChange(event);
                        }}
                        error={!!errors.address?.state}
                        label="State"
                      >
                        {australianStates.map((state) => (
                          <MenuItem key={state} value={state}>
                            {state}
                          </MenuItem>
                        ))}
                      </Select>
                    )}
                  />
                  {errors.address?.state && (
                    <Typography variant="body2" color="error">
                      {errors.address?.state?.message}
                    </Typography>
                  )}
                </FormControl>
                <Typography
                  variant="h6"
                  component="h2"
                  sx={{ fontWeight: "bold" }}
                >
                  Employee Status
                </Typography>
                <FormControl fullWidth>
                  <InputLabel id="department-label">Department</InputLabel>
                  <Controller
                    name="department_id"
                    control={control}
                    defaultValue={1}
                    render={({ field }) => (
                      <Select
                        {...field}
                        labelId="department-label"
                        value={field.value}
                        onChange={(event) => {
                          field.onChange(event);
                        }}
                        error={!!errors.department_id}
                        label="Department"
                      >
                        {departments.map((department) => (
                          <MenuItem key={department.id} value={department.id}>
                            {department.departmentName}
                          </MenuItem>
                        ))}
                      </Select>
                    )}
                  />
                  {errors.department_id && (
                    <Typography variant="body2" color="error">
                      {errors.department_id.message}
                    </Typography>
                  )}
                </FormControl>

                <TextField
                  label="Start Date"
                  size="small"
                  type="date"
                  InputLabelProps={{ shrink: true }}
                  {...register("startDate")}
                  error={!!errors.startDate}
                  helperText={errors.startDate?.message}
                  fullWidth
                  margin="normal"
                  InputLabelProps={{
                    shrink: true,
                  }}
                />
                <FormControlLabel
                  control={<Checkbox {...register("isPermanent")} />}
                  label="Permanent"
                />
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "center",
                    gap: 2,
                  }}
                >
                  <Button
                    type="submit"
                    variant="contained"
                    sx={{
                      backgroundColor: "#6a1b9a",
                      "&:hover": { backgroundColor: "#4a148c" },
                    }}
                  >
                    Submit
                  </Button>
                  <Button
                    type="button"
                    variant="contained"
                    onClick={() => reset()}
                    sx={{
                      backgroundColor: "#6a1b9a",
                      "&:hover": { backgroundColor: "#4a148c" },
                    }}
                  >
                    Reset
                  </Button>
                </Box>
              </Stack>
            </form>
          </Paper>
        </Box>
        <DevTool control={control} />
      </Container>
    </>
  );
};

export default EmployeeForm;
