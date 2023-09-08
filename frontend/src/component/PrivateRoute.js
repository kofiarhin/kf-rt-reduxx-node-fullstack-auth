import { Outlet, Navigate } from "react-router-dom";
import { UseSelector, useSelector } from "react-redux/es/hooks/useSelector";

// private route
const PrivateRoute = () => {
  const { user } = useSelector((state) => state.user);
  return user ? <Outlet /> : <Navigate to="/login" />;
};

export default PrivateRoute;
