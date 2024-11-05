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
  email: "john.doe@luxethreads.com",
  phoneNumber: "0435090867",
  address: {
    streetAddress: "123 Main St",
    suburb: "Suburbia",
    postalCode: "1234",
    state: "New South Wales",
  },
  department: { id: 1, departmentName: "Engineering" },
  startDate: "2024-11-05",
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

  test.only("submits the form data correctly", async () => {
    (getAllDepartments as jest.Mock).mockResolvedValue(mockDepartments);
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
    fireEvent.change(screen.getByLabelText("Middle Name (if applicable)"), {
      target: { value: "" },
    });

    fireEvent.change(screen.getByLabelText("Last Name"), {
      target: { value: "Smith" },
    });
    fireEvent.change(screen.getByLabelText("Email"), {
      target: { value: "jane.smith@luxethreads.com" },
    });
    fireEvent.change(screen.getByLabelText("Phone Number"), {
      target: { value: "0435080342" },
    });
    fireEvent.change(screen.getByLabelText("Street Address"), {
      target: { value: "456 Another St" },
    });
    fireEvent.change(screen.getByLabelText("Suburb"), {
      target: { value: "Another Suburb" },
    });
    fireEvent.change(screen.getByLabelText("Postal Code"), {
      target: { value: "5432" },
    });
    const stateDropdown = screen.getByLabelText("State");
    expect(stateDropdown).toBeInTheDocument();
    fireEvent.mouseDown(stateDropdown);
    fireEvent.click(screen.getByText("Tasmania"));

    const departmentDropdown = screen.getByLabelText("Department");
    expect(departmentDropdown).toBeInTheDocument();
    fireEvent.mouseDown(departmentDropdown);
    fireEvent.click(
      screen.getByText((content) => content.includes("Engineering"))
    );

    fireEvent.change(screen.getByLabelText("Start Date"), {
      target: { value: "2024-11-05" },
    });
    fireEvent.click(screen.getByLabelText("Permanent"));

    fireEvent.submit(screen.getByRole("button", { name: /Create/i }));

    screen.debug(undefined, 20000);

    await waitFor(() => {
      expect(createEmployee).toHaveBeenCalledWith({
        firstName: "Jane",
        middleName: "",
        lastName: "Smith",
        email: "jane.smith@luxethreads.com",
        phoneNumber: "0987654321",
        address: {
          streetAddress: "456 Another St",
          suburb: "Another Suburb",
          postalCode: "5432",
          state: "New South Wales",
        },
        department_id: 2,
        startDate: "2024-11-05",
        isPermanent: true,
      });
    });
  });

  test("loads employee data when editing an exiting employee", async () => {
    (useParams as jest.Mock).mockReturnValue({ id: 1 });
    render(
      <Router>
        <EmployeeForm />
      </Router>
    );

    await waitFor(() => {
      screen.debug(undefined, 20000);
      expect(screen.getByLabelText(/First Name/i)).toHaveValue("John");
      expect(screen.getByLabelText(/Middle Name/i)).toHaveValue("A");
      expect(screen.getByLabelText(/Last Name/i)).toHaveValue("Doe");
      expect(screen.getByLabelText(/Email/i)).toHaveValue(
        "john.doe@luxethreads.com"
      );
      expect(screen.getByLabelText(/Phone Number/i)).toHaveValue("0435090867");
      expect(screen.getByLabelText(/Street Address/i)).toHaveValue(
        "123 Main St"
      );
      expect(screen.getByLabelText(/Suburb/i)).toHaveValue("Suburbia");
      expect(screen.getByLabelText(/Postal Code/i)).toHaveValue("1234");
      // screen.debug(undefined, 20000);
      const stateDropdown = screen.getByLabelText("State");
      expect(stateDropdown).toBeInTheDocument();
      expect(stateDropdown).toHaveTextContent("New South Wales");
      const departmentDropdown = screen.getByLabelText("Department");
      expect(departmentDropdown).toBeInTheDocument();
      expect(departmentDropdown).toHaveTextContent("Engineering");

      expect(screen.getByLabelText(/Start Date/i)).toHaveValue("2024-11-05");
      expect(screen.getByLabelText(/Permanent/i)).toBeChecked();
    });
  });
});
