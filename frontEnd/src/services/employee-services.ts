import { EmployeeFormValues } from "../components/EmployeeForm/employeeSchema";
const baseURL = "http://localhost:8081";

export interface Address {
  id: number;
  streetAddress: string;
  suburb: string;
  postalCode: string;
  state: string;
}

export interface Department {
  id: number;
  departmentName: string;
}

export interface EmployeeDetails {
  id: number;
  firstName: string;
  middleName?: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  address: Address;
  department: Department;
  startDate: string;
  isPermanent: boolean;
}

export const getAllEmployees = async () => {
  try {
    const response = await fetch(`${baseURL}/api/employees`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    });
    if (!response.ok) {
      throw new Error(`Failed to fetch data :${response.statusText}`);
    }
    return await response.json();
  } catch (error) {
    console.error(error);
    throw new Error("Failed to fetch data");
  }
};

export const getEmployeeById = async (id: number) => {
  const response = await fetch(`${baseURL}/api/employees/${id}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
  });

  if (!response.ok) {
    if (response.status === 404) {
      throw new Error(await response.text());
    }
    throw new Error("Something went wrong");
  }
  return await response.json();
};

export const getEmployeeByDepartment = async (department: string) => {
  const response = await fetch(
    `${baseURL}/api/employees?department=${department}`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    }
  );
  if (!response.ok) {
    throw new Error("Failed to get Employees by Department");
  }
  return (await response.json()) as EmployeeDetails[];
};

export const deleteEmployeeById = async (id: number) => {
  const response = await fetch(`${baseURL}/api/employees/${id}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (!response.ok) {
    throw new Error("Failed to Delete the record");
  }
  return true;
};

export const createEmployee = async (data: EmployeeFormValues) => {
  const response = await fetch(`${baseURL}/api/employees`, {
    method: "POST",
    body: JSON.stringify(data),
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
  });
  if (!response.ok) {
    throw new Error("Failed to create Employee Record");
  }
  return (await response.json()) as EmployeeDetails;
};

export const updateEmployeeById = async (
  id: number,
  data: EmployeeFormValues
) => {
  const response = await fetch(`${baseURL}/api/employees/${id}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: JSON.stringify(data),
  });
  if (!response.ok) {
    throw new Error("Something went wrong");
  }
  return (await response.json()) as EmployeeDetails;
};

export const getAllDepartments = async () => {
  const response = await fetch(`${baseURL}/api/departments`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
  });
  if (!response.ok) {
    throw new Error("Failed to fetch Departments");
  }
  return (await response.json()) as Department[];
};
