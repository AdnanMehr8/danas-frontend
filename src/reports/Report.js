

import React, { useEffect, Suspense } from "react";
import { useDispatch, useSelector } from "react-redux";
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
import { Outlet, useLocation, useOutletContext } from "react-router-dom";
import BatchRecordsTable from "../pages/All-Batches/BatchRecords";

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
const MixingQC = React.lazy(() =>
  import("../pages/forms/tablet arex 10mg/mixing/qC")
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
const CompressionQC = React.lazy(() =>
  import("../pages/forms/tablet arex 10mg/compression/qC")
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
const CoatingQC = React.lazy(() =>
  import("../pages/forms/tablet arex 10mg/coating/qC")
);

const BatchPackingFormPage0 = React.lazy(() =>
  import("../pages/forms/tablet arex 10mg/printing/page0")
);


const BatchPackingFormPage1 = React.lazy(() =>
  import("../pages/forms/tablet arex 10mg/printing/page1")
);

const BatchPackingFormPage2 = React.lazy(() =>
  import("../pages/forms/tablet arex 10mg/printing/page2")
);


// const BatchPackingFormPage3 = React.lazy(() =>
//   import("../pages/forms/tablet arex 10mg/printing/page3")
// );

const BatchPackingFormPage4 = React.lazy(() =>
  import("../pages/forms/tablet arex 10mg/printing/page4")
);

const BatchPackingFormPage5 = React.lazy(() =>
  import("../pages/forms/tablet arex 10mg/printing/page5")
);

const BatchPackingFormPage6 = React.lazy(() =>
  import("../pages/forms/tablet arex 10mg/blistering/page6")
);

// const BatchPackingFormPage7 = React.lazy(() =>
//   import("../pages/forms/tablet arex 10mg/blistering/page7")
// );

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
const PackingQC = React.lazy(() =>
  import("../pages/forms/tablet arex 10mg/packing/qC")
);

const BatchPackingFormPage15 = React.lazy(() =>
  import("../pages/forms/tablet arex 10mg/packing/page15")
);

const BatchPackingFormPage16 = React.lazy(() =>
  import("../pages/forms/tablet arex 10mg/packing/page16")
);



const Report = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const batchNo = searchParams.get('batchNo');
  const productName = searchParams.get('productName');

  const formPages = [
    BatchManufacturingFormPage1,
    BatchManufacturingFormPage2,
    BatchManufacturingFormPage3,
    BatchManufacturingFormPage3,
    BatchManufacturingFormPage4,
    BatchManufacturingFormPage5,
    BatchManufacturingFormPage6,
    BatchManufacturingFormPage7,
    BatchManufacturingFormPage8,
    MixingQC,
    BatchManufacturingFormPage9,
    BatchManufacturingFormPage10,
    BatchManufacturingFormPage11,
    BatchManufacturingFormPage12,
    BatchManufacturingFormPage13,
    BatchManufacturingFormPage14,
    BatchManufacturingFormPage15,
    BatchManufacturingFormPage17,
    BatchManufacturingFormPage18,
    CompressionQC,
    BatchManufacturingFormPage19,
    BatchManufacturingFormPage20,
    BatchManufacturingFormPage21,
    BatchManufacturingFormPage22,
    BatchManufacturingFormPage23,
    CoatingQC,
    BatchPackingFormPage0,
    BatchPackingFormPage1,
    BatchPackingFormPage2,
    // BatchPackingFormPage3,
    BatchPackingFormPage4,
    BatchPackingFormPage5,
    BatchPackingFormPage6,
    // BatchPackingFormPage7,
    BatchPackingFormPage8,
    BatchPackingFormPage9,
    BatchPackingFormPage10,
    BatchPackingFormPage11,
    BatchPackingFormPage12,
    BatchPackingFormPage13,
    BatchPackingFormPage14,
    PackingQC,
    BatchPackingFormPage15,
    BatchPackingFormPage16,
]
  const REACT_APP_INTERNAL_API_PATH = process.env.REACT_APP_INTERNAL_API_PATH;
  // const { handlePrint } = useOutletContext();

  const handlePrint = () => {
  
        window.print(); // Trigger print dialog after a short delay
 
  };

  const fetchBatchSpecificRecord = async (endpoint, actionCreator) => {
    try {
      const response = await fetch(
        `${REACT_APP_INTERNAL_API_PATH}/api/${endpoint}?batchNo=${batchNo}&productName=${productName}`
      );
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      const record = await response.json();
      dispatch(actionCreator(record));
    } catch (error) {
      console.error(`Error fetching ${endpoint} record:`, error);
    }
  };

  useEffect(() => {
    const fetchAllBatchRecords = async () => {
      if (!batchNo || !productName) {
        console.error('Batch number or product name not provided');
        return;
      }

      // Object mapping endpoints to their respective action creators
      const endpointsMap = {
        'batch-info': setBatchInfo,
        'batch-info-packing': setBatchPInfo,
        'dispensing': setDispensing,
        'mixing': setMixingRecord,
        'compression': setCompressionRecord,
        'coating': setCoatingRecord,
        'printing': setPrinting,
        'blistering': setBlistering,
        'packing': setPacking
      };

      // Fetch all records in parallel
      await Promise.all(
        Object.entries(endpointsMap).map(([endpoint, actionCreator]) =>
          fetchBatchSpecificRecord(endpoint, actionCreator)
        )
      );

      // Clear all localStorage items
      const itemsToRemove = [
        "batchInfo",
        "dispensing",
        "mixingRecord",
        "compressionRecord",
        "coatingRecord",
        "batchInfoPacking",
        "printing",
        "blistering",
        "packing"
      ];
      
      itemsToRemove.forEach(item => {
        if (localStorage.getItem(item)) {
          console.log(`Removing ${item}`);
          localStorage.removeItem(item);
        }
      });
    };
    
    fetchAllBatchRecords();
  }, [dispatch, batchNo, productName]);

const globalStyles = {
  // Global styles to make everything uneditable
  "& input, & textarea, & select, & [contentEditable=true], & .MuiFormControlLabel-root": {
    pointerEvents: "none",
    backgroundColor: "transparent",
    border: "none",
    outline: "none",
    WebkitTextFillColor: "black",
    color: "black",
    cursor: "default",
    userSelect: "none",
    readOnly: true,
    opacity: 1,
    // Ensure consistent text appearance
    "&:not(:disabled)": {
      backgroundColor: "transparent !important",
    },
      // Remove any default browser styling for disabled inputs
      "&:disabled": {
        backgroundColor: "transparent !important",
        color: "black !important",
        opacity: 1,
        WebkitTextFillColor: "black !important",
    },
      
  },
  // Disable all form controls
  "& button:not(.print-button), & .MuiButton-root:not(.print-button)": {
    display: "none",
  },
  // Remove hover and focus effects
  "& *:hover, & *:focus": {
    outline: "none",
    backgroundColor: "transparent !important",
    borderColor: "transparent !important",
    boxShadow: "none !important",
  },
  // Disable text selection
  "& *": {
    userSelect: "none",
    WebkitUserSelect: "none",
    MozUserSelect: "none",
    msUserSelect: "none",
  },
  // Make all MUI components uneditable
  "& .MuiInputBase-root": {
    pointerEvents: "none",
    "& fieldset": {
      border: "none",
    },
    "&:before, &:after": {
      display: "none",
    },
  },
  // Disable checkboxes and radio buttons
  "& input[type='checkbox'], & input[type='radio']": {
    pointerEvents: "none",
    opacity: "1",
  },
  // Remove table interaction
  "& table": {
    pointerEvents: "none",
  },
  // Hide action columns and edit buttons
  " & .edit-button, & .delete-button": {
    display: "none",
    
  },
  

  // Remove card interactions
  "& .card": {
    border: "none",
    boxShadow: "none",
    pointerEvents: "none",
  },
};


  // Get the total count of pages
const totalPages = formPages.length;
  const renderPageWithFooter = (PageComponent, pageNumber) => {
    const hideHeaderComponents = [MixingQC, CompressionQC, CoatingQC, PackingQC];
    const shouldHideHeader = hideHeaderComponents.includes(PageComponent);

    return (
      <Box
           className="report-container"
      sx={{
        ...globalStyles,
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
        "& Header": {
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
       "& .actions-column, & .actions-column ~ td": {
  display: "none", // Hides the header and all cells in the column
},
        // Remove borders from React Bootstrap Card
        "& .card": {
          border: "none", // Hides the border for the Card
          boxShadow: "none", // Optionally remove shadow
        },
      }}
    >
      <div>
        {/* Conditionally render the header */}
        {!shouldHideHeader && (
          <>
            {PageComponent === BatchPackingFormPage0 ||
            PageComponent === BatchPackingFormPage1 ||
            PageComponent === BatchPackingFormPage2 ||
            PageComponent === BatchPackingFormPage3 ||
            PageComponent === BatchPackingFormPage4 ||
            PageComponent === BatchPackingFormPage5 ||
            PageComponent === BatchPackingFormPage6 ||
            PageComponent === BatchPackingFormPage7 ||
            PageComponent === BatchPackingFormPage8 ||
            PageComponent === BatchPackingFormPage9 ||
            PageComponent === BatchPackingFormPage10 ||
            PageComponent === BatchPackingFormPage11 ||
            PageComponent === BatchPackingFormPage12 ||
            PageComponent === BatchPackingFormPage13 ||
            PageComponent === BatchPackingFormPage14 ||
            PageComponent === BatchPackingFormPage15 ||
            PageComponent === BatchPackingFormPage16 ? (
              <FormHeaderPacking />
            ) : (
              <FormHeader />
            )}
          </>
        )}
        <PageComponent isReport={true}/>
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
  )
}

   return (
    <div >
      <Button
        variant="contained"
        //  onClick={() => window.print()}
         onClick={handlePrint}
        className="mt-3"
        style={{ display: "block" }}
      >
        Print
      </Button>

      <Suspense
        fallback={
          <Box sx={{ display: "flex", justifyContent: "center" }}>
            <CircularProgress />
          </Box>
        }
      >
         {formPages.map((PageComponent, index) =>
          renderPageWithFooter(PageComponent, index + 1)
        )}
      </Suspense>
      <Button
        variant="contained"
        //  onClick={() => window.print()}
         onClick={handlePrint}
         
        className="mt-3"
        style={{ display: "block" }}
      >
        Print
       </Button>
       {/* <Outlet context={handlePrint} /> */}
    </div>
  );
};

export default Report;
