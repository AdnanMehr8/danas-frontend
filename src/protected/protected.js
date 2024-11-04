import React from "react";
import { Navigate } from "react-router-dom";

const Protected = ({ isAuth, requiredRole, userRole, children }) => {
  if (!isAuth) {
    return <Navigate to="/login" />;
  }

  if (requiredRole && userRole !== requiredRole) {
    return <Navigate to="/unauthorized" />; // You can create an Unauthorized page or redirect to another route
  }

  return children;
};

export default Protected;
