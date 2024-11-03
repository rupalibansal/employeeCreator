import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom";
import EmployeeForm from "./EmployeeForm";
import {
  getAllDepartments,
  getEmployeeById,
  createEmployee,
  updateEmployeeById,
} from "../../services/employee-services";
import { BrowserRouter as Router, useParams } from "react-router-dom";
import React from "react";

jest.mock("../../services/employee-services");
jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useParams: jest.fn(),
}));

const mockDepartments = [
  {
    id: 1,
    departmentName: "Engineering",
  },
  {
    id: 2,
    departmentName: "Marketing",
  },
];

const mockEmployee = {
  id: 1,
  firstName: "John",
  middleName: "A",
  lastName: "Doe",
  email: "john.doe@example.com",
  phoneNumber: "1234567890",
  address: {
    streetAddress: "123 Main St",
    suburb: "Suburbia",
    postalCode: "12345",
    state: "New South Wales",
  },
  department: { id: 1, departmentName: "Engineering" },
  startDate: "2022-01-01",
  isPermanent: true,
};

describe("EmployeeForm", () => {
  beforeEach(() => {
    (getAllDepartments as jest.Mock).mockResolvedValue(mockDepartments);
    (getEmployeeById as jest.Mock).mockResolvedValue(mockEmployee);
  });

  test("validate that all the fields are displayed correctly", async () => {
    (useParams as jest.Mock).mockResolvedValue({ id: null });
    render(
      <Router>
        <EmployeeForm />
      </Router>
    );

    await waitFor(() => {
      expect(screen.getByText("Create Employee")).toBeInTheDocument();
      expect(screen.getByLabelText("First Name")).toBeInTheDocument();
      expect(
        screen.getByLabelText("Middle Name (if applicable)")
      ).toBeInTheDocument();
      expect(screen.getByLabelText("Last Name")).toBeInTheDocument();
      expect(screen.getByLabelText("Email")).toBeInTheDocument();
      expect(screen.getByLabelText("Phone Number")).toBeInTheDocument();
      expect(screen.getByLabelText("Street Address")).toBeInTheDocument();
      expect(screen.getByLabelText("Suburb")).toBeInTheDocument();
      expect(screen.getByLabelText("Postal Code")).toBeInTheDocument();
      expect(screen.getByLabelText("State")).toBeInTheDocument();
      expect(screen.getByLabelText("Department")).toBeInTheDocument();
      expect(screen.getByLabelText("Start Date")).toBeInTheDocument();
      expect(screen.getByLabelText("Permanent")).toBeInTheDocument();
    });
  });

  test("submits the form data correctly", async () => {
    (useParams as jest.Mock).mockReturnValue({ id: null });
    (createEmployee as jest.Mock).mockResolvedValue({});
    render(
      <Router>
        <EmployeeForm />
      </Router>
    );
    fireEvent.change(screen.getByLabelText("First Name"), {
      target: { value: "Jane" },
    });
    fireEvent.change(screen.getByLabelText("Last Name"), {
      target: { value: "Smith" },
    });
    fireEvent.change(screen.getByLabelText("Email"), {
      target: { value: "jane.smith@example.com" },
    });
    fireEvent.change(screen.getByLabelText("Phone Number"), {
      target: { value: "0987654321" },
    });
    fireEvent.change(screen.getByLabelText("Street Address"), {
      target: { value: "456 Another St" },
    });
    fireEvent.change(screen.getByLabelText("Suburb"), {
      target: { value: "Another Suburb" },
    });
    fireEvent.change(screen.getByLabelText("Postal Code"), {
      target: { value: "54321" },
    });
    fireEvent.mouseDown(screen.getByLabelText("State"));
    fireEvent.click(screen.getByText("Victoria"));

    await waitFor(() => {
      expect(screen.getByLabelText("Department")).toBeInTheDocument();
    });

    fireEvent.mouseDown(screen.getByLabelText("Department"));
    fireEvent.click(screen.getByText("Marketing"));

    fireEvent.change(screen.getByLabelText("Start Date"), {
      target: { value: "2022-02-01" },
    });
    fireEvent.click(screen.getByLabelText("Permanent"));

    window.confirm = jest.fn(() => true);

    fireEvent.click(screen.getByText("Create"));

    // screen.debug(undefined, 20000);

    await waitFor(() => {
      expect(createEmployee).toHaveBeenCalledWith({
        firstName: "Jane",
        middleName: "",
        lastName: "Smith",
        email: "jane.smith@example.com",
        phoneNumber: "0987654321",
        address: {
          streetAddress: "456 Another St",
          suburb: "Another Suburb",
          postalCode: "54321",
          state: "Victoria",
        },
        department_id: 2,
        startDate: "2022-02-01",
        isPermanent: true,
      });
    });
  });
});
