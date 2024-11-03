// frontEnd/src/pages/HomePage/HomePage.test.tsx
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom";
import { HomePage } from "./HomePage";
import { getAllEmployees } from "../../services/employee-services";
import { BrowserRouter as Router } from "react-router-dom";
import React from "react";

jest.mock("../../services/employee-services");

const mockEmployees = [
  {
    id: 1,
    firstName: "John",
    lastName: "Doe",
    email: "John.Doe@luxethreads.com",
    department: { departmentName: "Engineering" },
  },
  {
    id: 2,
    firstName: "Jane",
    lastName: "Smith",
    email: "Jane.Smith@luxethreads.com",
    department: { departmentName: "Marketing" },
  },
];

describe("HomePage", () => {
  beforeEach(() => {
    (getAllEmployees as jest.Mock).mockResolvedValue({
      employees: mockEmployees,
    });
  });

  test("validate department pills are generated successfully", async () => {
    render(
      <Router>
        <HomePage />
      </Router>
    );

    await waitFor(() => {
      expect(screen.queryByText("Engineering")).toBeInTheDocument();
    });
    const engineeringPill = await screen.findByTestId(
      `Engineering-department-pill`
    );
    const marketingPill = await screen.findByTestId(
      `Marketing-department-pill`
    );
    expect(engineeringPill).toBeInTheDocument();
    expect(marketingPill).toBeInTheDocument();
  });

  test("validate that all the fields are displayed correctly", async () => {
    render(
      <Router>
        <HomePage />
      </Router>
    );

    await waitFor(() => {
      expect(screen.queryByText("John Doe")).toBeInTheDocument();
      expect(
        screen.queryByText("John.Doe@luxethreads.com")
      ).toBeInTheDocument();
      expect(screen.queryByText("Engineering")).toBeInTheDocument();
    });
  });

  test("validate that the results displayed are only for the selected department", async () => {
    render(
      <Router>
        <HomePage />
      </Router>
    );

    await waitFor(() => {
      expect(screen.getByText("Engineering")).toBeInTheDocument();
    });

    const engineeringPill = await screen.findByTestId(
      "Engineering-department-pill"
    );
    fireEvent.click(engineeringPill);

    await waitFor(() => {
      expect(screen.queryByText("Jane Smith")).not.toBeInTheDocument();
    });

    fireEvent.click(engineeringPill);

    // screen.debug();
    await waitFor(() => {
      expect(screen.queryByText("Jane Smith")).toBeInTheDocument();
    });
  });

  test("validate that clicking on delete button removes the employee from the list", async () => {
    render(
      <Router>
        <HomePage />
      </Router>
    );

    await waitFor(() => {
      expect(screen.queryByText("John Doe")).toBeInTheDocument();
    });

    window.confirm = jest.fn(() => true);

    const deleteButton = screen.getByTestId("John-DELETE");
    fireEvent.click(deleteButton);

    await waitFor(() => {
      expect(screen.queryByText("John Doe")).not.toBeInTheDocument();
    });
  });
});
