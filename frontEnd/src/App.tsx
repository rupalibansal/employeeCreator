
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { HomePage } from "./pages/HomePage/HomePage";
import EmployeeForm from "./components/EmployeeForm/EmployeeForm";
import { CssBaseline, GlobalStyles } from "@mui/material";
import Footer from "./components/Footer/Footer";

function App() {
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
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<HomePage />}></Route>
          <Route path="/employee/new" element={<EmployeeForm />}></Route>
          <Route path="/employee/edit/:id" element={<EmployeeForm />} />
        </Routes>
      </BrowserRouter>
      <Footer />
    </>
  );
}

export default App;
