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
import BatchPackingFormPage1 from "./pages/forms/tablet arex 10mg/printing/page1";
import BatchPackingFormPage2 from "./pages/forms/tablet arex 10mg/printing/page2";
import BatchPackingFormPage3 from "./pages/forms/tablet arex 10mg/printing/page3";
import BatchPackingFormPage4 from "./pages/forms/tablet arex 10mg/printing/page4";
import BatchPackingFormPage5 from "./pages/forms/tablet arex 10mg/printing/page5";
import BatchPackingFormPage6 from "./pages/forms/tablet arex 10mg/blistering/page6";
import BatchPackingFormPage7 from "./pages/forms/tablet arex 10mg/blistering/page7";
import BatchPackingFormPage8 from "./pages/forms/tablet arex 10mg/blistering/page8";
import BatchPackingFormPage9 from "./pages/forms/tablet arex 10mg/blistering/page9";
import BatchPackingFormPage13 from "./pages/forms/tablet arex 10mg/packing/page13";
import Batch from "./pages/forms/tablet arex 10mg/packing/page15";
import BatchPackingFormPage16 from "./pages/forms/tablet arex 10mg/packing/page16";
import BatchPackingFormPage10 from "./pages/forms/tablet arex 10mg/packing/page10";
import BatchPackingFormPage11 from "./pages/forms/tablet arex 10mg/packing/page11";
import BatchPackingFormPage12 from "./pages/forms/tablet arex 10mg/packing/page12";
import BatchPackingFormPage14 from "./pages/forms/tablet arex 10mg/packing/page14";
import BatchPackingFormPage15 from "./pages/forms/tablet arex 10mg/packing/page15";
import Printing from "./pages/forms/tablet arex 10mg/printing/printing";
import Blistering from "./pages/forms/tablet arex 10mg/blistering/blistering";
import Packing from "./pages/forms/tablet arex 10mg/packing/packing";
import FormHeaderPacking from "./pages/header/formHeaderPacking";


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
        <Route path="/form-header-packing" element={<FormHeaderPacking />} />
        <Route path="/machines" element={<EquipmentTable />} />
        <Route path="/products" element={<ProductList />} />
        
        {/* Arex Routes */}
        <Route path="/dispensing" element={<Dispensing />} />
        <Route path="/mixing" element={<Mixing />} />
        <Route path="/compression" element={<Compression />} />
        <Route path="/coating" element={<Coating />} />
        <Route path="/printing" element={<Printing />} />
        <Route path="/blistering" element={<Blistering />} />
        <Route path="/packing" element={<Packing />} />
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
          <Route path="/p1" element={<BatchPackingFormPage7 />} />
          <Route path="/p2" element={<BatchPackingFormPage11 />} />
          <Route path="/p3" element={<BatchPackingFormPage12 />} />
          <Route path="/p4" element={<BatchPackingFormPage13 />} />
          <Route path="/p5" element={<BatchPackingFormPage14 />} />
          <Route path="/p6" element={<BatchPackingFormPage15 />} />
          <Route path="/p7" element={<BatchPackingFormPage16 />} />


          
          
          
          
          
        <Route path="/unauthorized" element={<Unauthorized />} />
      </Routes>
    </div>
  );
};

export default App;
