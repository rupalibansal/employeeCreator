export const getDepartmentColor = (departmentName: string) => {
  console.log(departmentName);
  switch (departmentName) {
    case "Sales":
      return "#1230AE";
    case "IT":
      return "#3795BD";
    case "Human Resources":
      return "#e33fe2";
    case "Marketing":
      return "#2E236C";
    default:
      return "#25b6ca";
  }
};
