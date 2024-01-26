import { Navigate, Route, Routes } from "react-router-dom";
import Random from "./Components/Random";
import Form from "./Components/Form";
import Login from "./Components/auth/Login";
import Table from "./Components/Table";
import Winner from "./Components/Winner";
import Location from "./Components/Location";
import ProtectedRoute from "./ProtectedRoute";
function App() {
  const token = JSON.parse(window.localStorage.getItem("token")) || "guest";
  const decodedToken = token !== "guest" ? token.role : "guest";
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/register" element={<Form />} />
      <Route element={<ProtectedRoute />}>
        <Route path="/random" element={decodedToken === "superAdmin" ? <Random /> : <Navigate to="/" />} />
        <Route path="/location" element={decodedToken === "superAdmin" ? <Location /> : <Navigate to="/" />} />
        <Route path="/table" element={decodedToken === "admin" ? <Table /> : <Navigate to="/" />} />
        <Route path="/winners" element={decodedToken === "admin" ? <Winner /> : <Navigate to="/" />} />
      </Route>
    </Routes>
  );
}

export default App;
