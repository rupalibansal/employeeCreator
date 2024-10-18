// import YouTubeForm from "./components/EmployeeForm/YouTubeForm";
// import ZodYouTubeForm from "./components/EmployeeForm/ZodYouTubeForm";
// import { LoginForm } from "./components/LoginForm/LoginForm";

import { BrowserRouter, Route, Routes } from "react-router-dom";
import HomePage from "./pages/HomePage/HomePage";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<HomePage />}></Route>
        </Routes>
      </BrowserRouter>
      {/* <YouTubeForm /> */}
      {/* <ZodYouTubeForm /> */}
      {/* <LoginForm /> */}
    </>
  );
}

export default App;
