import React, { useEffect, Suspense } from "react";
import { useDispatch } from "react-redux";
import { setMixingRecord } from "../store/mixingSlice";
import { setCompressionRecord } from "../store/compressionSlice";
import { setCoatingRecord } from "../store/coatingSlice";
import { setDispensing } from "../store/dispensingSlice";
import { Box, Button, CircularProgress, Typography } from "@mui/material";
import FormHeader from "../pages/header/formHeader";
import FormHeaderPacking from "../pages/header/formHeaderPacking";
import "./Report.css";
import { setBatchInfo } from "../store/batchInfoSlice";
import { setBatchPInfo } from "../store/batchInfoPackingSlice ";
import { setPrinting } from "../store/printingSlice";
import { setBlistering } from "../store/blisteringSlice";
import { setPacking } from "../store/packingSlice";

// Lazy load the form pages
const BatchManufacturingFormPage1 = React.lazy(() =>
  import("../pages/forms/tablet arex 10mg/dispensing/page1")
);
const BatchManufacturingFormPage2 = React.lazy(() =>
  import("../pages/forms/tablet arex 10mg/dispensing/page2")
);
const BatchManufacturingFormPage3 = React.lazy(() =>
  import("../pages/forms/tablet arex 10mg/dispensing/page3")
);
const BatchManufacturingFormPage4 = React.lazy(() =>
  import("../pages/forms/tablet arex 10mg/mixing/page4")
);
const BatchManufacturingFormPage5 = React.lazy(() =>
  import("../pages/forms/tablet arex 10mg/mixing/page5")
);
const BatchManufacturingFormPage6 = React.lazy(() =>
  import("../pages/forms/tablet arex 10mg/mixing/page6")
);
const BatchManufacturingFormPage7 = React.lazy(() =>
  import("../pages/forms/tablet arex 10mg/mixing/page7")
);
const BatchManufacturingFormPage8 = React.lazy(() =>
  import("../pages/forms/tablet arex 10mg/mixing/page8")
);
const BatchManufacturingFormPage9 = React.lazy(() =>
  import("../pages/forms/tablet arex 10mg/compression/page9")
);
const BatchManufacturingFormPage10 = React.lazy(() =>
  import("../pages/forms/tablet arex 10mg/compression/page10")
);
const BatchManufacturingFormPage11 = React.lazy(() =>
  import("../pages/forms/tablet arex 10mg/compression/page11")
);
const BatchManufacturingFormPage12 = React.lazy(() =>
  import("../pages/forms/tablet arex 10mg/compression/page12")
);
const BatchManufacturingFormPage13 = React.lazy(() =>
  import("../pages/forms/tablet arex 10mg/compression/page13")
);
const BatchManufacturingFormPage14 = React.lazy(() =>
  import("../pages/forms/tablet arex 10mg/compression/page14")
);
const BatchManufacturingFormPage15 = React.lazy(() =>
  import("../pages/forms/tablet arex 10mg/compression/page15")
);
const BatchManufacturingFormPage17 = React.lazy(() =>
  import("../pages/forms/tablet arex 10mg/compression/page17")
);
const BatchManufacturingFormPage18 = React.lazy(() =>
  import("../pages/forms/tablet arex 10mg/compression/page18")
);
const BatchManufacturingFormPage19 = React.lazy(() =>
  import("../pages/forms/tablet arex 10mg/coating/page19")
);
const BatchManufacturingFormPage20 = React.lazy(() =>
  import("../pages/forms/tablet arex 10mg/coating/page20")
);
const BatchManufacturingFormPage21 = React.lazy(() =>
  import("../pages/forms/tablet arex 10mg/coating/page21")
);
const BatchManufacturingFormPage22 = React.lazy(() =>
  import("../pages/forms/tablet arex 10mg/coating/page22")
);
const BatchManufacturingFormPage23 = React.lazy(() =>
  import("../pages/forms/tablet arex 10mg/coating/page23")
);

const BatchPackingFormPage1 = React.lazy(() =>
  import("../pages/forms/tablet arex 10mg/printing/page1")
);

const BatchPackingFormPage2 = React.lazy(() =>
  import("../pages/forms/tablet arex 10mg/printing/page2")
);


const BatchPackingFormPage3 = React.lazy(() =>
  import("../pages/forms/tablet arex 10mg/printing/page3")
);

const BatchPackingFormPage4 = React.lazy(() =>
  import("../pages/forms/tablet arex 10mg/printing/page4")
);

const BatchPackingFormPage5 = React.lazy(() =>
  import("../pages/forms/tablet arex 10mg/printing/page5")
);

const BatchPackingFormPage6 = React.lazy(() =>
  import("../pages/forms/tablet arex 10mg/blistering/page6")
);

const BatchPackingFormPage7 = React.lazy(() =>
  import("../pages/forms/tablet arex 10mg/blistering/page7")
);

const BatchPackingFormPage8 = React.lazy(() =>
  import("../pages/forms/tablet arex 10mg/blistering/page8")
);

const BatchPackingFormPage9 = React.lazy(() =>
  import("../pages/forms/tablet arex 10mg/blistering/page9")
);

const BatchPackingFormPage10 = React.lazy(() =>
  import("../pages/forms/tablet arex 10mg/packing/page10")
);

const BatchPackingFormPage11 = React.lazy(() =>
  import("../pages/forms/tablet arex 10mg/packing/page11")
);

const BatchPackingFormPage12 = React.lazy(() =>
  import("../pages/forms/tablet arex 10mg/packing/page12")
);

const BatchPackingFormPage13 = React.lazy(() =>
  import("../pages/forms/tablet arex 10mg/packing/page13")
);

const BatchPackingFormPage14 = React.lazy(() =>
  import("../pages/forms/tablet arex 10mg/packing/page14")
);

const BatchPackingFormPage15 = React.lazy(() =>
  import("../pages/forms/tablet arex 10mg/packing/page15")
);

const BatchPackingFormPage16 = React.lazy(() =>
  import("../pages/forms/tablet arex 10mg/packing/page16")
);



const Report = ({ isPackingForm }) => {
  const dispatch = useDispatch();
  const batchInfoId = localStorage.getItem("batchInfoId");
  const dispensingId = localStorage.getItem("dispensingId");
  const mixingId = localStorage.getItem("mixingId");
  const compressionID = localStorage.getItem("compressionID");
  const coatingId = localStorage.getItem("coatingId");
  const batchInfoPackingId = localStorage.getItem("batchInfoPackingId");
  const printingId = localStorage.getItem("printingId");
  const blisteringId = localStorage.getItem("blisteringId");
  const packingId = localStorage.getItem("packingId");

  const REACT_APP_INTERNAL_API_PATH = process.env.REACT_APP_INTERNAL_API_PATH;

  const fetchLatestRecordBatchInfo = async (batchInfoId) => {
    try {
      const response = await fetch(
        `${REACT_APP_INTERNAL_API_PATH}/api/batch-info/${batchInfoId}`
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

  const fetchLatestRecordPackingBatchInfo = async (batchInfoPackingId) => {
    try {
      const response = await fetch(
        `${REACT_APP_INTERNAL_API_PATH}/api/batch-info-packing/${batchInfoPackingId}`
      );
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      const latestRecord = await response.json();
      dispatch(setBatchPInfo(latestRecord)); // Update the Redux store with the latest record
    } catch (error) {
      console.error("Error fetching latest dispensing record:", error);
    }
  };

  const fetchLatestRecordDispensing = async (dispensingId) => {
    try {
      const response = await fetch(
        `${REACT_APP_INTERNAL_API_PATH}/api/dispensing/${dispensingId}`
      );
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      const latestRecord = await response.json();
      dispatch(setDispensing(latestRecord)); // Update the Redux store with the latest record
    } catch (error) {
      console.error("Error fetching latest dispensing record:", error);
    }
  };

  const fetchLatestRecordMixing = async (mixingId) => {
    try {
      const response = await fetch(
        `${REACT_APP_INTERNAL_API_PATH}/api/mixing/${mixingId}`
      );
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      const latestRecord = await response.json();
      dispatch(setMixingRecord(latestRecord)); // Update the Redux store with the latest record
    } catch (error) {
      console.error("Error fetching latest mixing record:", error);
    }
  };

  const fetchLatestRecordCompression = async (compressionID) => {
    try {
      const response = await fetch(
        `${REACT_APP_INTERNAL_API_PATH}/api/compression/${compressionID}`
      );
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      const latestRecord = await response.json();
      dispatch(setCompressionRecord(latestRecord)); // Update the Redux store with the latest record
    } catch (error) {
      console.error("Error fetching latest compression record:", error);
    }
  };

  const fetchLatestRecordCoating = async (coatingId) => {
    try {
      const response = await fetch(
        `${REACT_APP_INTERNAL_API_PATH}/api/coating/${coatingId}`
      );
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      const latestRecord = await response.json();
      dispatch(setCoatingRecord(latestRecord)); // Update the Redux store with the latest record
    } catch (error) {
      console.error("Error fetching latest coating record:", error);
    }
  };

  const fetchLatestRecordPrinting = async (printingId) => {
    try {
      const response = await fetch(
        `${REACT_APP_INTERNAL_API_PATH}/api/printing/${printingId}`
      );
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      const latestRecord = await response.json();
      dispatch(setPrinting(latestRecord)); // Update the Redux store with the latest record
    } catch (error) {
      console.error("Error fetching latest coating record:", error);
    }
  };

  const fetchLatestRecordBlistering = async (blisteringId) => {
    try {
      const response = await fetch(
        `${REACT_APP_INTERNAL_API_PATH}/api/blistering/${blisteringId}`
      );
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      const latestRecord = await response.json();
      dispatch(setBlistering(latestRecord)); // Update the Redux store with the latest record
    } catch (error) {
      console.error("Error fetching latest coating record:", error);
    }
  };

  const fetchLatestRecordPacking = async (packingId) => {
    try {
      const response = await fetch(
        `${REACT_APP_INTERNAL_API_PATH}/api/packing/${packingId}`
      );
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      const latestRecord = await response.json();
      dispatch(setPacking(latestRecord)); // Update the Redux store with the latest record
    } catch (error) {
      console.error("Error fetching latest coating record:", error);
    }
  };

  useEffect(() => {
    const fetchAndClearStorage = async () => {
        if (batchInfoId || dispensingId || mixingId || compressionID || coatingId || batchInfoPackingId || printingId || blisteringId || packingId) {
            await fetchLatestRecordBatchInfo(batchInfoId);
            await fetchLatestRecordDispensing(dispensingId);
            await fetchLatestRecordMixing(mixingId);
            await fetchLatestRecordCompression(compressionID);
            await fetchLatestRecordCoating(coatingId);
          await fetchLatestRecordPackingBatchInfo(batchInfoPackingId);
          await fetchLatestRecordPrinting(printingId);
          await fetchLatestRecordBlistering(blisteringId);
          await fetchLatestRecordPacking(packingId);
            // Check if localStorage items exist and remove them
            if (localStorage.getItem("batchInfo")) {
              console.log("Removing batchInfo");
              localStorage.removeItem("batchInfo");
              }
            if (localStorage.getItem("dispensing")) {
                console.log("Removing dispensing");
                localStorage.removeItem("dispensing");
            }
            if (localStorage.getItem("mixingRecord")) {
                console.log("Removing mixingRecord");
                localStorage.removeItem("mixingRecord");
            }
            if (localStorage.getItem("compressionRecord")) {
                console.log("Removing compressionRecord");
                localStorage.removeItem("compressionRecord");
            }
            if (localStorage.getItem("coatingRecord")) {
                console.log("Removing coatingRecord");
                localStorage.removeItem("coatingRecord");
            }
            if (localStorage.getItem("batchInfoPacking")) {
              console.log("Removing batchInfoPacking");
              localStorage.removeItem("batchInfoPacking");
          }
          if (localStorage.getItem("printing")) {
            console.log("Removing printing");
            localStorage.removeItem("printing");
          }
          if (localStorage.getItem("blistering")) {
            console.log("Removing blistering");
            localStorage.removeItem("blistering");
          }
          if (localStorage.getItem("packing")) {
            console.log("Removing packing");
            localStorage.removeItem("packing");
        }
        }
    };
    
    fetchAndClearStorage();
}, [batchInfoId, dispensingId, mixingId, compressionID, coatingId, batchInfoPackingId, printingId, blisteringId, packingId, dispatch]);

  const totalPages = 23;
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
        <FormHeader />
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
  const totalPagesPacking = 16;
  const renderPageWithFooterPacking = (PageComponent, pageNumber) => (
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
        <FormHeaderPacking />
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
          Page {pageNumber} of {totalPagesPacking}
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
        {renderPageWithFooter(BatchManufacturingFormPage3, 3)}
        {renderPageWithFooter(BatchManufacturingFormPage4, 4)}
        {renderPageWithFooter(BatchManufacturingFormPage5, 5)}
        {renderPageWithFooter(BatchManufacturingFormPage6, 6)}
        {renderPageWithFooter(BatchManufacturingFormPage7, 7)}
        {renderPageWithFooter(BatchManufacturingFormPage8, 8)}
        {renderPageWithFooter(BatchManufacturingFormPage9, 9)}
        {renderPageWithFooter(BatchManufacturingFormPage10, 10)}
        {renderPageWithFooter(BatchManufacturingFormPage11, 11)}
        {renderPageWithFooter(BatchManufacturingFormPage12, 12)}
        {renderPageWithFooter(BatchManufacturingFormPage13, 13)}
        {renderPageWithFooter(BatchManufacturingFormPage14, 14)}
        {renderPageWithFooter(BatchManufacturingFormPage15, 15)}
        {renderPageWithFooter(BatchManufacturingFormPage17, 17)}
        {renderPageWithFooter(BatchManufacturingFormPage18, 18)}
        {renderPageWithFooter(BatchManufacturingFormPage19, 19)}
        {renderPageWithFooter(BatchManufacturingFormPage20, 20)}
        {renderPageWithFooter(BatchManufacturingFormPage21, 21)}
        {renderPageWithFooter(BatchManufacturingFormPage22, 22)}
        {renderPageWithFooter(BatchManufacturingFormPage23, 23)}
        {renderPageWithFooterPacking(BatchPackingFormPage1, 1)}
        {renderPageWithFooterPacking(BatchPackingFormPage2, 2)}
        {renderPageWithFooterPacking(BatchPackingFormPage3, 3)}
        {renderPageWithFooterPacking(BatchPackingFormPage4, 4)}
        {renderPageWithFooterPacking(BatchPackingFormPage5, 5)}
        {renderPageWithFooterPacking(BatchPackingFormPage6, 6)}
        {renderPageWithFooterPacking(BatchPackingFormPage7, 7)}
        {renderPageWithFooterPacking(BatchPackingFormPage8, 8)}
        {renderPageWithFooterPacking(BatchPackingFormPage9, 9)}
        {renderPageWithFooterPacking(BatchPackingFormPage10, 10)}
        {renderPageWithFooterPacking(BatchPackingFormPage11, 11)}
        {renderPageWithFooterPacking(BatchPackingFormPage12, 12)}
        {renderPageWithFooterPacking(BatchPackingFormPage13, 13)}
        {renderPageWithFooterPacking(BatchPackingFormPage14, 14)}
        {renderPageWithFooterPacking(BatchPackingFormPage15, 15)}
        {renderPageWithFooterPacking(BatchPackingFormPage16, 16)}
      </Suspense>
      <Button
        variant="contained"
        onClick={() => window.print()}
        className="mt-3"
        style={{ display: "block" }}
      >
        Print Page
      </Button>
    </div>
  );
};

export default Report;
