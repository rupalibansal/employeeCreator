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
                />
                <TextField
                  label="Middle Name (if applicable)"
                  size="small"
                  {...register("middleName")}
                  error={!!errors.middleName}
                  helperText={errors.middleName?.message}
                />
                <TextField
                  label="Last Name"
                  size="small"
                  {...register("lastName")}
                  error={!!errors.lastName}
                  helperText={errors.lastName?.message}
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
                />
                <TextField
                  label="Phone Number"
                  size="small"
                  {...register("phoneNumber")}
                  error={!!errors.phoneNumber}
                  helperText={errors.phoneNumber?.message}
                />
                <TextField
                  label="Street Address"
                  size="small"
                  {...register("address.streetAddress")}
                  error={!!errors.address?.streetAddress}
                  helperText={errors.address?.streetAddress?.message}
                />
                <TextField
                  label="Suburb"
                  size="small"
                  {...register("address.suburb")}
                  error={!!errors.address?.suburb}
                  helperText={errors.address?.suburb?.message}
                />
                <TextField
                  label="Postal Code"
                  size="small"
                  {...register("address.postalCode")}
                  error={!!errors.address?.postalCode}
                  helperText={errors.address?.postalCode?.message}
                />
                <TextField
                  label="State"
                  size="small"
                  {...register("address.state")}
                  error={!!errors.address?.state}
                  helperText={errors.address?.state?.message}
                />
                <Typography
                  variant="h6"
                  component="h2"
                  sx={{ fontWeight: "bold" }}
                >
                  Employee Status
                </Typography>
                <TextField
                  label="Department"
                  size="small"
                  {...register("department")}
                  error={!!errors.department}
                  helperText={errors.department?.message}
                />
                <TextField
                  label="Start Date"
                  size="small"
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
