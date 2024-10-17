import { useForm } from "react-hook-form";
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
  CssBaseline,
  GlobalStyles,
} from "@mui/material";
import { useEffect } from "react";

const EmployeeForm = () => {
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
      department: "",
      startDate: "",
      isPermanent: false,
    },
  });
  const { register, control, handleSubmit, formState, reset } = form;
  console.log("Form State", form);
  const { errors, isSubmitSuccessful } = formState;

  const onSubmit = (data: EmployeeFormValues) => {
    console.log("Form Submitted", data);
  };

  useEffect(() => {
    if (isSubmitSuccessful) {
      reset();
      alert("Form Submitted Successfully");
    }
  }, [isSubmitSuccessful, reset]);

  return (
    <>
      <CssBaseline />
      <GlobalStyles
        styles={{
          body: {
            background: "linear-gradient(to bottom, #6a1b9a, #ffffff)",
            minHeight: "100vh",
            margin: 0,
            padding: 0,
          },
        }}
      />
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
            <Typography variant="h4" component="h1" gutterBottom>
              Employee Form
            </Typography>
            <form onSubmit={handleSubmit(onSubmit)} noValidate>
              <Stack spacing={2}>
                <TextField
                  label="First Name"
                  {...register("firstName")}
                  error={!!errors.firstName}
                  helperText={errors.firstName?.message}
                />
                <TextField
                  label="Middle Name"
                  {...register("middleName")}
                  error={!!errors.middleName}
                  helperText={errors.middleName?.message}
                />
                <TextField
                  label="Last Name"
                  {...register("lastName")}
                  error={!!errors.lastName}
                  helperText={errors.lastName?.message}
                />
                <TextField
                  label="Email"
                  {...register("email")}
                  error={!!errors.email}
                  helperText={errors.email?.message}
                />
                <TextField
                  label="Phone Number"
                  {...register("phoneNumber")}
                  error={!!errors.phoneNumber}
                  helperText={errors.phoneNumber?.message}
                />
                <TextField
                  label="Street Address"
                  {...register("address.streetAddress")}
                  error={!!errors.address?.streetAddress}
                  helperText={errors.address?.streetAddress?.message}
                />
                <TextField
                  label="Suburb"
                  {...register("address.suburb")}
                  error={!!errors.address?.suburb}
                  helperText={errors.address?.suburb?.message}
                />
                <TextField
                  label="Postal Code"
                  {...register("address.postalCode")}
                  error={!!errors.address?.postalCode}
                  helperText={errors.address?.postalCode?.message}
                />
                <TextField
                  label="State"
                  {...register("address.state")}
                  error={!!errors.address?.state}
                  helperText={errors.address?.state?.message}
                />
                <TextField
                  label="Department"
                  {...register("department")}
                  error={!!errors.department}
                  helperText={errors.department?.message}
                />
                <TextField
                  label="Start Date"
                  type="date"
                  InputLabelProps={{ shrink: true }}
                  {...register("startDate")}
                  error={!!errors.startDate}
                  helperText={errors.startDate?.message}
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
