import React, { useEffect, useState } from "react";
import { Tabs, Tab, Box, Button } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import BatchManufacturingFormPage1 from "./page1";
import BatchManufacturingFormPage2 from "./page2";
import BatchManufacturingFormPage3 from "./page3";
import { setDispensing } from "../../../../store/dispensingSlice";
import FormHeader from "../../../header/formHeader";
import ProcessBox from "../coated/Coated";
import { setBatchId } from "../../../../store/batchIdSlice";
import { usePermissions } from "../../../../hooks/usePermissions";
import './dispensing.css';

const Dispensing = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const dispensing = useSelector((state) => state.dispensing);
  const batchId = useSelector((state) => state.batchId);
  const REACT_APP_INTERNAL_API_PATH = process.env.REACT_APP_INTERNAL_API_PATH;
  const processes = JSON.parse(localStorage.getItem("processes"));
  const batchInfo = useSelector((state) => state.batchInfo.batch);

  
  // Load saved tabValue from localStorage or default to 0
  const savedTabValue = JSON.parse(localStorage.getItem("activeTabDispensing")) || 0;
  const [tabValue, setTabValue] = React.useState(savedTabValue); // For controlling the active tab
  const [tabStatus, setTabStatus] = React.useState([true, false, false]); // Manage enabled/disabled state of tabs
  const { hasPermission } = usePermissions();
  const permission = {
    canReadLineClearance: hasPermission('dispensing-line-clearance', 'read'),
    canReadWeighingRecordRaw: hasPermission('dispensing-weighing-raw', 'read'),
    canReadWeighingRecordCoating: hasPermission('dispensing-weighing-coating', 'read'),
    canCreate: hasPermission('dispensing', 'create'),
    canEditLineClearance: hasPermission('dispensing-line-clearance', 'update'),
    canEditWeighingRecordRaw: hasPermission('dispensing-weighing-raw', 'update'),
    canEditWeighingRecordCoating: hasPermission('dispensing-weighing-coating', 'update'),
    canDeleteLineClearance: hasPermission('dispensing-line-clearance', 'delete'),
    canDeleteWeighingRecordRaw: hasPermission('dispensing-weighing-raw', 'delete'),
    canDeleteWeighingRecordCoating: hasPermission('dispensing-weighing-coating', 'delete'),
  };
// New state to store the fetched record
const [fetchedDispensing, setFetchedDispensing] = useState(null);

// Fetch existing dispensing record on component mount
useEffect(() => {
  const fetchExistingDispensing = async () => {
    // Ensure we have a batch number
    if (!batchInfo?.batchNo) return;

    try {
      const response = await fetch(
        `${REACT_APP_INTERNAL_API_PATH}/api/dispensing/batch/${batchInfo.batchNo}`, 
        {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          }
        }
      );

      if (!response.ok) {
        // If no existing record is found, this isn't necessarily an error
        if (response.status === 404) {
          console.log('No existing dispensing record found for this batch');
          return;
        }
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const data = await response.json();
      
      // Update Redux store with fetched data
      if (data) {
        dispatch(setDispensing(data));
        setFetchedDispensing(data);
      }
    } catch (error) {
      console.error("Error fetching dispensing record:", error);
    }
  };

  fetchExistingDispensing();
}, [batchInfo?.batchNo, dispatch, REACT_APP_INTERNAL_API_PATH]);
  
  // useEffect(() => {
  //   const storedRecord = JSON.parse(localStorage.getItem("dispensing"));
  //   if (storedRecord) {
  //     dispatch(setDispensing(storedRecord));
  //   }
  // }, [dispatch]);

  // Save the active tab value to localStorage whenever it changes
  const handleChangeTab = (event, newValue) => {
    setTabValue(newValue);
    localStorage.setItem("activeTabDispensing", JSON.stringify(newValue)); // Save tabValue to localStorage
  };
  
  // const handleChangeTab = (event, newValue) => {
  //   if (tabStatus[newValue]) {
  //     setTabValue(newValue);
  //     localStorage.setItem("activeTabDispensing", JSON.stringify(newValue)); // Save tabValue to localStorage
  //   }
  // };

  const handlePrint = () => {
    window.print(); // This triggers the browser print dialog
  };

  const validateFields = () => {
    const {
      batchRecord,
      checkboxes,
      tempAndHumidity,
      authorization,
      remarks,
      weighingRecordRaw,
      checkRecordRaw,
      weighingRecordCoating,
      checkRecordCoating,
    } = dispensing;

    if (tabValue === 0) {
      // Page 1
      // Validate required fields for batchRecord
      if (
        !batchRecord.date ||
        !batchRecord.lineClearance ||
        !batchRecord.department ||
        !batchRecord.section ||
        !batchRecord.currentProduct ||
        !batchRecord.currentProductBatchNo ||
        !batchRecord.previousProduct ||
        !batchRecord.previousProductBatchNo ||
        !batchRecord.signature ||
        !checkboxes ||
        !tempAndHumidity.temperature ||
        !tempAndHumidity.humidity ||
        !authorization.authorizedForUse ||
        !authorization.dateAndTime ||
        !tempAndHumidity.remarks
      ) {
        alert(
          "Please fill out all required fields on Page 1 before proceeding."
        );
        return false;
      }
    } else if (tabValue === 1) {
      // Page 2
      // Check if any weighing dispensing fields are missing (Raw)
      if (
        weighingRecordRaw.some(
          (row) =>
            !row.item ||
            !row.unit ||
            !row.tareWt ||
            !row.netWt ||
            !row.grossWt ||
            !row.noOfContainers
        )
      ) {
        alert(
          "Please fill out all weighing dispensing fields for raw material before proceeding."
        );
        return false;
      }

      // Validate check dispensings (Raw)
      if (
        !checkRecordRaw.checkedByDispensingPharmacist ||
        !checkRecordRaw.dateDP ||
        !checkRecordRaw.checkedByQAOfficer ||
        !checkRecordRaw.dateQA ||
        !checkRecordRaw.receivedByProductionPharmacist ||
        !checkRecordRaw.datePP ||
        !checkRecordRaw.dateS ||
        !checkRecordRaw.receivedBySupervisor
      ) {
        alert(
          "Please fill out all check dispensing fields for raw material before proceeding."
        );
        return false;
      }
    } else if (tabValue === 2) {
      // Page 3
      // Check if any weighing dispensing fields are missing (Coating)
      if (
        weighingRecordCoating.some(
          (row) =>
            !row.item ||
            !row.unit ||
            !row.tareWt ||
            !row.netWt ||
            !row.grossWt ||
            !row.noOfContainers
        )
      ) {
        alert(
          "Please fill out all weighing dispensing fields for coating material before proceeding."
        );
        return false;
      }

      // Validate check dispensings (Coating)
      if (
        !checkRecordCoating.checkedByDispensingPharmacist ||
        !checkRecordCoating.checkedByQAOfficer ||
        !checkRecordCoating.receivedByProductionPharmacist ||
        !checkRecordCoating.receivedBySupervisor ||
        !checkRecordCoating.dateDP ||
        !checkRecordCoating.dateQA ||
        !checkRecordCoating.datePP ||
        !checkRecordCoating.dateS
      ) {
        alert(
          "Please fill out all check dispensing fields for coating material before proceeding."
        );
        return false;
      }
    }

    return true; // All validations passed
  };

  const handleNextTab = () => {
    // if (validateFields()) {
      dispatch(setDispensing(dispensing));
      const newTabValue = tabValue + 1;
      setTabValue(newTabValue);
      setTabStatus((prevStatus) => {
        const updatedStatus = [...prevStatus];
        updatedStatus[newTabValue] = true; // Enable the next tab
        return updatedStatus;
      });
      localStorage.setItem("activeTabDispensing", JSON.stringify(newTabValue)); // Save the updated tabValue
    // }
  };

  const handleBackTab = () => {
    setTabValue((prevTabValue) => Math.max(prevTabValue - 1, 0)); // Min is 0 (first tab)
    localStorage.setItem(
      "activeTabDispensing",
      JSON.stringify(Math.max(tabValue - 1, 0))
    ); // Save the updated tabValue
  };

  const handleSave = async () => {
    // if (!validateFields()) {
    //   return; // Exit if validation fails
    // }

    try {
      const response = await fetch(`${REACT_APP_INTERNAL_API_PATH}/api/dispensing/save`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...dispensing,
          batchInfo: {
            ...batchInfo,
            batchNo: batchInfo.batchNo,
            productName: batchInfo.productName
          },
          tabValue: tabValue  // Include the current tab value for server-side tracking
        }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const data = await response.json();
      console.log("Dispensing saved:", data);

      // Optional: Show a success message to the user
      alert(`Data for Tab ${tabValue + 1} saved successfully!`);

    } catch (error) {
      console.error("Error saving dispensing data:", error);
      alert("Failed to save data. Please try again.");
    }
  };

  const handleSubmit = async (e) => {
  
      e.preventDefault();

      // Call the validation before submitting
      // if (!validateFields()) {
      //   return; // Exit if validation fails
      // }
    

      // try {
      //   const response = await fetch(`${REACT_APP_INTERNAL_API_PATH}/api/dispensing`, {
      //     method: "POST",
      //     headers: {
      //       "Content-Type": "application/json",
      //     },
      //     body: JSON.stringify({
      //       ...dispensing, batchInfo: {
      //         ...batchInfo,
      //         batchNo: batchInfo.batchNo,
      //         productName: batchInfo.productName
      //       }
      //     }),
      //   });
      
      //   if (!response.ok) {
      //     throw new Error(`HTTP error! Status: ${response.status}`);
      //   }

      //   const data = await response.json();
      //   console.log("Dispensing created:", data);
      

      //   if (data && data._id) {
      //     // const dispensingId = data._id;
       
      //     localStorage.setItem("dispensingId", data._id);
      //     console.log("Dispensing ID stored in localStorage:", data._id);
      //   }
   

      
        const processes = JSON.parse(localStorage.getItem("processes"));
        const currentIndex = processes.findIndex(
          process => process.name.toLowerCase() === 'dispensing'
        );

        if (currentIndex !== -1 && currentIndex < processes.length - 1) {
          const nextProcess = processes[currentIndex + 1];
        
          // Determine batch type
          let nextRoute = nextProcess.name.toLowerCase();
          if (batchInfo?.productName?.toLowerCase().includes('cream')) {
            nextRoute += '-cream';
          } else if (batchInfo?.subCategory?.toLowerCase().includes('non-coated')) {
            nextRoute += '-sulpeol';
          }

          // Clean up and navigate
          localStorage.removeItem("activeTabDispensing");
          navigate(`/${nextRoute}`);
      
        } else {
          console.log("No next process available.");
        }

      // } catch (error) {
      //   console.error("Error creating batch:", error);
      // }
    
  }
  
  
  return (
    <div>
      <ProcessBox processes={processes} />
<div className="print-container">
      <FormHeader />
      <h1 className="text-center mt-4 print-hide">Dispensing</h1>

      <Box sx={{ width: "100%", borderBottom: 1, borderColor: "divider" }} className="print-container">
        <Tabs
          value={tabValue}
          onChange={handleChangeTab}
          aria-label="dispensing tabs"
            variant="scrollable" 
            scrollButtons="auto"
            className="print-hide"
        >
          <Tab label="Line Clearance"  />
          <Tab
            label="Weighing Record (Raw Material)"
            // disabled={!tabStatus[1]}
          />
          <Tab
            label="Weighing Record (Coating Material)"
            // disabled={!tabStatus[2]}
          />
        </Tabs>
      </Box>
      <div>
  {tabValue === 0 && (
    <div>
      <BatchManufacturingFormPage1 />
      <Button variant="contained" onClick={handlePrint} className="mt-3 mb-3 print-container">
        Print Page
      </Button>
    </div>
  )}
  {/* {tabValue === 0 && !permission.canReadLineClearance && (
    <p>You do not have permission to view this section.</p>
  )} */}

  {tabValue === 1 && (
    <div className="mt-6">
      <BatchManufacturingFormPage2 />
      <Button variant="contained" onClick={handlePrint} className="mt-3 print-container">
        Print Page
      </Button>
    </div>
  )}
  {/* {tabValue === 1 && !permission.canReadWeighingRecordRaw && (
    <p>You do not have permission to view this section.</p>
  )} */}

  {tabValue === 2 && (
    <div className="mt-6">
      <BatchManufacturingFormPage3 />
      <Button variant="contained" onClick={handlePrint} className="mt-3 print-container">
        Print Page
      </Button>
    </div>
  )}
  {/* {tabValue === 2 && !permission.canReadWeighingRecordCoating && (
    <p>You do not have permission to view this section.</p>
  )} */}
</div>

      {/* <div>
        
        {tabValue === 0 && (
          
          <div>
            <BatchManufacturingFormPage1 />
            <Button variant="contained" onClick={handlePrint} className="mt-3">
              Print Page
            </Button>
          </div>
        )}
        {tabValue === 1 && (
          <div className="mt-6">
            <BatchManufacturingFormPage2 />
            <Button variant="contained" onClick={handlePrint} className="mt-3">
              Print Page
            </Button>
          </div>
        )}
        {tabValue === 2 && (
          <div className="mt-6">
            <BatchManufacturingFormPage3 />
            <Button variant="contained" onClick={handlePrint} className="mt-3">
              Print Page
            </Button>
          </div>
        )}
      </div> */}

      <div className="mt-6 flex justify-between print-hide">
        {tabValue > 0 && (
          <Button
            variant="contained"
            color="primary"
            onClick={handleBackTab}
            style={{ display: "flex", justifyContent: "space-between" }}
          >
            Back
          </Button>
        )}

<Button
          variant="contained"
          color="secondary"
          onClick={handleSave}
          className="ml-2"
        >
          Save
        </Button>

        {tabValue < 2 && (
          <Button
            variant="contained"
            color="primary"
            onClick={handleNextTab}
            // className="mt-4"
          >
            Next
          </Button>
        )}

        {tabValue === 2 && (
          <Button
            variant="contained"
            color="primary"
            onClick={handleSubmit}
            // className="mt-2"
          >
            Next Process
          </Button>
        )}
      </div>
      </div>
      </div>
  );
};

export default Dispensing;
