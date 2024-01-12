import { Route, Routes } from "react-router-dom";
import Random from "./Components/Random";
import Form from "./Components/Form";
function App() {
  return (
    <div style={{ height: "100vh", width: "100%", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", background: "linear-gradient(45deg , #503C3C 50%, #3E3232 50%)" }}>
      <Routes>
        <Route path="/" element={<Random />} />
        <Route path="/register" element={<Form />} />
      </Routes>
    </div>
  );
}

export default App;
