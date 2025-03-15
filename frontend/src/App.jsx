import { Route, Routes, Navigate } from "react-router";

import NavBar from "./components/NavBar/NavBar";
import Main from "./components/Main/Main";

import PrivateRoute from "./utils/Routes/PrivateRoute";

import Student from "./components/Student/Student";

import AuthProvider from "./context/AuthContext.jsx";

const App = () => {
  return (
    <AuthProvider>
      <NavBar />
      <Routes>
        <Route path="/*" element={<Main />} />

        <Route path="student/*" element={<Student />} />

        <Route path="*" element={<Navigate replace to="/" />} />
      </Routes>
    </AuthProvider>
  );
};

export default App;
