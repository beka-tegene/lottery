import { Navigate, Outlet } from "react-router-dom";

const ProtectedRoute = () => {
  let auth = { token: !!window.localStorage.getItem("token") };
  return auth.token ? <Outlet /> : <Navigate to="/" />;
};
export default ProtectedRoute;
