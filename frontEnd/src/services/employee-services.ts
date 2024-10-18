const baseURL = import.meta.env.VITE_APP_API_BASE_URL;

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

export interface Employee {
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

export const getAllTodos = async () => {
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
    return (await response.json()) as Employee[];
  } catch (error) {
    console.error(error);
    throw new Error("Failed to fetch data");
  }
};
