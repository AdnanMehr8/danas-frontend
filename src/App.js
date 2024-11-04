import React, { useEffect } from "react";

import { Route, Routes } from "react-router-dom";
import Login from "./pages/auth/login/Login";
import Signup from "./pages/auth/signup/Signup";
import Dashboard from "./pages/dashboard/Dashboard";
import Chat from "./pages/Chat/Chat";
import { useDispatch, useSelector } from "react-redux";
import useAutoLogin from "./hooks/useAutoLogin";
import useTokenRefresh from "./hooks/useTokenRefresh";
import Protected from "./protected/protected";
import Unauthorized from "./pages/unauth/unauthorized";
import { loadUserFromStorage } from "./store/authSlice";

import DraggableList from "./components/practiceDrag";
import CategoryProductList from "./components/CategoryProductList";
import FormHeader from "./pages/header/formHeader";
import FormHeaderSulpeol from "./pages/header/formHeaderSulpeol";


import Dispensing from "./pages/forms/tablet arex 10mg/dispensing/dispensing";

import Mixing from "./pages/forms/tablet arex 10mg/mixing/mixing";

import Compression from "./pages/forms/tablet arex 10mg/compression/compression";

import Coating from "./pages/forms/tablet arex 10mg/coating/coating";

import DispensingSulpeol from "./pages/forms/tablet sulpeol 25mg/dispensing/dispensing";

import MixingSulpeol from "./pages/forms/tablet sulpeol 25mg/mixing/mixing";

import CompressionSulpeol from "./pages/forms/tablet sulpeol 25mg/compression/compression";

import EquipmentTable from "./components/Machines";
import ProductList from "./components/Products";
import { Box, CircularProgress } from "@mui/material";
import Report from "./reports/Report";
import ReportSulpeol from "./reports/sulpeolReport";
import DispensingCream from "./pages/forms/SIDIK H CREAM/dispensing/dispensing";
import MixingCream from "./pages/forms/SIDIK H CREAM/mixing/mixing";
import CompressionCream from "./pages/forms/SIDIK H CREAM/compression/compression";
import FormHeaderCream from "./pages/header/formHeaderCream";
import ReportCream from "./reports/creamReport";


const App = () => {
  const isAuth = useSelector((state) => state.user.auth);
  const userRole = useSelector((state) => state.user.role);
  console.log("Role: ", userRole);
  const user = useSelector((state) => state.user);
  console.log("User: ", user);
  console.log("Authenticated: ", isAuth);
  const loading = useAutoLogin();
  useTokenRefresh();
  const dispatch = useDispatch();

  useEffect(() => {
    // Load user from local storage when the app mounts
    dispatch(loadUserFromStorage());
  }, [dispatch]);

  return loading ? (
    <Box sx={{ display: "flex" }}>
      <CircularProgress />
    </Box>
  ) : (
    // return (
    <div>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/" element={<CategoryProductList />} />
        <Route path="/form-header" element={<FormHeader />} />
        <Route path="/form-header-sulpeol" element={<FormHeaderSulpeol />} />
        <Route path="/form-header-cream" element={<FormHeaderCream />} />
        <Route path="/machines" element={<EquipmentTable />} />
        <Route path="/products" element={<ProductList />} />
        
        {/* Arex Routes */}
        <Route path="/dispensing" element={<Dispensing />} />
        <Route path="/mixing" element={<Mixing />} />
        <Route path="/compression" element={<Compression />} />
        <Route path="/coating" element={<Coating />} />
        <Route path="/report" element={<Report />} />
        
        {/* sulpeol routes */}
        <Route path="/dispensing-sulpeol" element={<DispensingSulpeol />} />
        <Route path="/mixing-sulpeol" element={<MixingSulpeol />} />
        <Route path="/compression-sulpeol" element={<CompressionSulpeol />} />
        <Route path="/report-sulpeol" element={<ReportSulpeol />} />

        {/* cream routes */}
        <Route path="/dispensing-cream" element={<DispensingCream />} />
        <Route path="/mixing-cream" element={<MixingCream />} />
        <Route path="/compression-cream" element={<CompressionCream />} />
        <Route path="/report-cream" element={<ReportCream />} />
          
        <Route path="/dragProcesses" element={<DraggableList />} />

        <Route
          path="/dashboard"
          element={
            <Protected
              isAuth={isAuth}
              userRole={userRole}
              requiredRole="pharmacist"
            >
              <Dashboard />
            </Protected>
          }
        />
        <Route path="/chat" element={<Chat />} />
        <Route path="/unauthorized" element={<Unauthorized />} />
      </Routes>
    </div>
  );
};

export default App;
