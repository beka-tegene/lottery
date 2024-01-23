import { Route, Routes } from "react-router-dom";
import Random from "./Components/Random";
import Form from "./Components/Form";
import Login from "./Components/auth/Login";
import Table from "./Components/Table";
import Winner from "./Components/Winner";
function App() {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/random" element={<Random />} />
      <Route path="/table" element={<Table />} />
      <Route path="/winners" element={<Winner />} />
      <Route path="/register" element={<Form />} />
    </Routes>
  );
}

export default App;
