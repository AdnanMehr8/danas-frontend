import React, { useEffect, Suspense } from "react";
import { useDispatch } from "react-redux";
import { setscMixingRecord } from "../store/sidikcream/mixingSlice";
import { setscCompressionRecord } from "../store/sidikcream/compressionSlice";
import { setscDispensing } from "../store/sidikcream/dispensingSlice";
import { Box, Button, CircularProgress, Typography } from "@mui/material";
import "./Report.css";
import { setBatchInfo } from "../store/batchInfoSlice";
import FormHeaderCream from "../pages/header/formHeaderCream";

// Lazy load the form pages
const BatchManufacturingFormPage1 = React.lazy(() =>
  import("../pages/forms/SIDIK H CREAM/dispensing/page1")
);
const BatchManufacturingFormPage2 = React.lazy(() =>
  import("../pages/forms/SIDIK H CREAM/dispensing/page2")
);
const BatchManufacturingFormPage4 = React.lazy(() =>
  import("../pages/forms/SIDIK H CREAM/mixing/page4")
);
const BatchManufacturingFormPage5 = React.lazy(() =>
  import("../pages/forms/SIDIK H CREAM/mixing/page5")
);
const BatchManufacturingFormPage6 = React.lazy(() =>
  import("../pages/forms/SIDIK H CREAM/mixing/page6")
);
const BatchManufacturingFormPage7 = React.lazy(() =>
  import("../pages/forms/SIDIK H CREAM/mixing/page7")
);
const BatchManufacturingFormPage8 = React.lazy(() =>
  import("../pages/forms/SIDIK H CREAM/mixing/page8")
);
const BatchManufacturingFormPage9 = React.lazy(() =>
  import("../pages/forms/SIDIK H CREAM/compression/page9")
);
const BatchManufacturingFormPage10 = React.lazy(() =>
  import("../pages/forms/SIDIK H CREAM/compression/page10")
);
const BatchManufacturingFormPage11 = React.lazy(() =>
  import("../pages/forms/SIDIK H CREAM/compression/page11")
);
const BatchManufacturingFormPage15 = React.lazy(() =>
  import("../pages/forms/SIDIK H CREAM/compression/page15")
);
const BatchManufacturingFormPage17 = React.lazy(() =>
  import("../pages/forms/SIDIK H CREAM/compression/page17")
);
const BatchManufacturingFormPage18 = React.lazy(() =>
  import("../pages/forms/SIDIK H CREAM/compression/page18")
);

const ReportCream = () => {
  const dispatch = useDispatch();
  const batchInfoId = localStorage.getItem("sc-batchInfoId");
  const dispensingId = localStorage.getItem("sc-dispensingId");
  const mixingId = localStorage.getItem("sc-mixingId");
  const compressionID = localStorage.getItem("sc-compressionID");

  const fetchLatestRecordBatchInfo = async (batchInfoId) => {
    try {
      const response = await fetch(
        `http://localhost:5000/api/batch-info/${batchInfoId}`
      );
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      const latestRecord = await response.json();
      dispatch(setBatchInfo(latestRecord)); // Update the Redux store with the latest record
    } catch (error) {
      console.error("Error fetching latest dispensing record:", error);
    }
  };

  const fetchLatestRecordDispensing = async (dispensingId) => {
    try {
      const response = await fetch(
        `http://localhost:5000/api/dispensing/${dispensingId}`
      );
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      const latestRecord = await response.json();
      dispatch(setscDispensing(latestRecord)); // Update the Redux store with the latest record
    } catch (error) {
      console.error("Error fetching latest dispensing record:", error);
    }
  };

  const fetchLatestRecordMixing = async (mixingId) => {
    try {
      const response = await fetch(
        `http://localhost:5000/api/mixing/${mixingId}`
      );
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      const latestRecord = await response.json();
      dispatch(setscMixingRecord(latestRecord)); // Update the Redux store with the latest record
    } catch (error) {
      console.error("Error fetching latest mixing record:", error);
    }
  };

  const fetchLatestRecordCompression = async (compressionID) => {
    try {
      const response = await fetch(
        `http://localhost:5000/api/compression/${compressionID}`
      );
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      const latestRecord = await response.json();
      dispatch(setscCompressionRecord(latestRecord)); // Update the Redux store with the latest record
    } catch (error) {
      console.error("Error fetching latest compression record:", error);
    }
  };


  useEffect(() => {
    if (batchInfoId || dispensingId || mixingId || compressionID ) {
      fetchLatestRecordBatchInfo(batchInfoId);
      fetchLatestRecordDispensing(dispensingId);
      fetchLatestRecordMixing(mixingId);
      fetchLatestRecordCompression(compressionID);
    }
  }, [dispensingId, dispatch]);

  const totalPages = 18;

  const renderPageWithFooter = (PageComponent, pageNumber) => (
    <Box
      sx={{
        border: "2px solid black",
        padding: "15px",
        marginBottom: "20px",
        position: "relative",
        minHeight: "100vh", // Ensure full-page height for the content
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        // Add styles to hide input borders, TextField borders, buttons, and icons
        "& input, & textarea, & select": {
          border: "none",
          outline: "none",
          backgroundColor: "transparent",
        },
        "& button, & .MuiButton-root": {
          display: "none",
        },

        // Hide TextField borders (both outlined and standard variants)
        "& .MuiOutlinedInput-root": {
          "& fieldset": {
            border: "none", // Hides the border for outlined variant
          },
        },
        "& .MuiInput-underline:before, & .MuiInput-underline:after": {
          borderBottom: "none", // Hides the underline border for standard variant
        },
        // Hide the "Actions" column
        "& .actions-column": {
          display: "none", // Adjust this class based on your table structure
        },
        // Remove borders from React Bootstrap Card
        "& .card": {
          border: "none", // Hides the border for the Card
          boxShadow: "none", // Optionally remove shadow
        },
      }}
    >
      <div>
        <FormHeaderCream />
        <PageComponent />
      </div>
      <Typography
        variant="body2"
        sx={{
          fontWeight: "bold",
          paddingTop: "10px",
          marginTop: "20px",
          display: "flex",
          paddingLeft: "40px",
        }}
      >
        <Typography variant="h5" component="span" sx={{ fontWeight: "bold" }}>
          DANAS PHARMACEUTICAL PVT LTD
        </Typography>
        <span style={{ marginLeft: "200px" }}>
          Page {pageNumber} of {totalPages}
        </span>
      </Typography>
    </Box>
  );

  return (
    <div>
      <Button
        variant="contained"
        onClick={() => window.print()}
        className="mt-3"
        style={{ display: "block" }}
      >
        Print Page
      </Button>

      <Suspense
        fallback={
          <Box sx={{ display: "flex", justifyContent: "center" }}>
            <CircularProgress />
          </Box>
        }
      >
        {renderPageWithFooter(BatchManufacturingFormPage1, 1)}
        {renderPageWithFooter(BatchManufacturingFormPage2, 2)}
        {renderPageWithFooter(BatchManufacturingFormPage4, 4)}
        {renderPageWithFooter(BatchManufacturingFormPage5, 5)}
        {renderPageWithFooter(BatchManufacturingFormPage6, 6)}
        {renderPageWithFooter(BatchManufacturingFormPage7, 7)}
        {renderPageWithFooter(BatchManufacturingFormPage8, 8)}
        {renderPageWithFooter(BatchManufacturingFormPage9, 9)}
        {renderPageWithFooter(BatchManufacturingFormPage10, 10)}
        {renderPageWithFooter(BatchManufacturingFormPage11, 11)}
        {renderPageWithFooter(BatchManufacturingFormPage15, 15)}
        {renderPageWithFooter(BatchManufacturingFormPage17, 17)}
        {renderPageWithFooter(BatchManufacturingFormPage18, 18)}
      </Suspense>
    </div>
  );
};

export default ReportCream;
