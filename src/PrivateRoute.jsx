import { Navigate } from "react-router-dom";

const PrivateRoute = ({ element, isAllowed }) => {
  return isAllowed ? element : <Navigate to="/" replace />;
};

export default PrivateRoute;
