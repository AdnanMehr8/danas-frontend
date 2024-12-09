import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Button, Tabs, Tab, Box } from "@mui/material";
import { setBlistering } from "../../../../store/blisteringSlice";
import FormHeaderPacking from "../../../header/formHeaderPacking";
import BatchPackingFormPage6 from "./page6";
import BatchPackingFormPage7 from "./page7";
import BatchPackingFormPage8 from "./page8";
import BatchPackingFormPage9 from "./page9";
import ProcessBox from "../coated/Coated";
import { usePermissions } from "../../../../hooks/usePermissions";
import FormHeaderBlistering from "../../../header/formHeaderBlistering";

const Blistering = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const record = useSelector((state) => state.blistering);
  const REACT_APP_INTERNAL_API_PATH = process.env.REACT_APP_INTERNAL_API_PATH;
  const processes = JSON.parse(localStorage.getItem("processes"));
  const batchInfo = useSelector((state) => state.batchInfoPacking.batch);

  

  // Load saved tabValue from localStorage or default to 0
  const savedTabValue =
    JSON.parse(localStorage.getItem("activeTabBlistering")) || 0;
  const [tabValue, setTabValue] = React.useState(savedTabValue); // Control active tab
  const [tabStatus, setTabStatus] = React.useState([
    true,
    false,
    false,
    // false,
  ]); // Control which tabs are enabled
  const { hasPermission } = usePermissions();
  const permission = {
    canReadLineClearance: hasPermission('blistering-line-clearance', 'read'),
    canReadTailLine: hasPermission('blistering-tail-line', 'read'),
    canReadInstructions: hasPermission('blistering-instructions', 'read'),
    canReadCheckSheet: hasPermission('blistering-checksheet', 'read'),
    canCreate: hasPermission('blistering', 'create'),
    canUpdateLineClearance: hasPermission('blistering-line-clearance', 'update'),
    canUpdateTailLine: hasPermission('blistering-tail-line', 'update'),
    canUpdateInstructions: hasPermission('blistering-instructions', 'update'),
    canUpdateCheckSheet: hasPermission('blistering-checksheet', 'update'),
    canDeleteLineClearance: hasPermission('blistering-line-clearance', 'delete'),
    canDeleteTailLine: hasPermission('blistering-tail-line', 'delete'),
    canDeleteInstructions: hasPermission('blistering-instructions', 'delete'),
    canDeleteCheckSheet: hasPermission('blistering-checksheet', 'delete'),
  };

  // New state to store the fetched record
const [fetchedBlistering, setFetchedBlistering] = useState(null);

// Fetch existing dispensing record on component mount
useEffect(() => {
  const fetchExistingDispensing = async () => {
    // Ensure we have a batch number
    if (!batchInfo?.batchNo) return;

    try {
      const response = await fetch(
        `${REACT_APP_INTERNAL_API_PATH}/api/blistering/batch/${batchInfo.batchNo}`, 
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
        dispatch(setBlistering(data));
        setFetchedBlistering(data);
      }
    } catch (error) {
      console.error("Error fetching dispensing record:", error);
    }
  };

  fetchExistingDispensing();
}, [batchInfo?.batchNo, dispatch, REACT_APP_INTERNAL_API_PATH]);

  // useEffect(() => {
  //   const storedRecord = JSON.parse(localStorage.getItem("blistering"));
  //   if (storedRecord) {
  //     dispatch(setBlistering(storedRecord));
  //   }
  // }, [dispatch]);

  const handleChangeTab = (event, newValue) => {
    setTabValue(newValue);
    localStorage.setItem("activeTabBlistering", JSON.stringify(newValue)); // Save tabValue to localStorage
  };
  
  // const handleChangeTab = (event, newValue) => {
  //   if (tabStatus[newValue]) {
  //     setTabValue(newValue);
  //     localStorage.setItem("activeTabBlistering", JSON.stringify(newValue)); // Save tabValue to localStorage
  //   }
  // };

  const handlePrint = () => {
    window.print(); // Print the current page
  };

  const validateFields = () => {
    const {
      batchRecord,
      checkboxes,
      tempAndHumidity,
      authorization,
      batchQRecord,
      batchQRecordSignAndRemarks,
      tailLineClearanceBlistering,
      tailLineClearanceBlistering2,
      instructions,
      checkSheet
    } = record;

    switch (tabValue) {
      case 0:
        if (
          !batchRecord.department ||
          !batchRecord.currentProduct ||
          !batchRecord.currentProductBatchNo ||
          !batchRecord.lineClearance ||
          !batchRecord.section ||
          !batchRecord.date ||
          !batchRecord.previousProduct ||
          !batchRecord.previousProductBatchNo ||
          !batchRecord.signature ||
          !checkboxes ||
          !tempAndHumidity.temperature ||
          !tempAndHumidity.humidity ||
          !tempAndHumidity.remarks ||
          !authorization.authorizedForUse ||
          !authorization.dateAndTime
        ) {
          alert(
            "Please fill out all required fields on this page before proceeding."
          );
          return false;
        }
        break;

      case 1: // Combined case for coating solution preparation and coating procedure
        if (
          !tailLineClearanceBlistering.lineProduct ||
          !tailLineClearanceBlistering.lineProductBatchNo ||
          !tailLineClearanceBlistering.mfg ||
          !tailLineClearanceBlistering.exp ||
          !tailLineClearanceBlistering.price ||
          !tailLineClearanceBlistering.date ||
          !tailLineClearanceBlistering.previousProduct ||
          !tailLineClearanceBlistering.previousProductBatchNo ||
          !tailLineClearanceBlistering.productionSignature ||
          !tailLineClearanceBlistering.qaSignature ||
          !tailLineClearanceBlistering.pDate ||
          !tailLineClearanceBlistering.qaDate ||
          !tailLineClearanceBlistering2.lineProduct ||
          !tailLineClearanceBlistering2.lineProductBatchNo ||
          !tailLineClearanceBlistering2.mfg ||
          !tailLineClearanceBlistering2.exp ||
          !tailLineClearanceBlistering2.price ||
          !tailLineClearanceBlistering2.date ||
          !tailLineClearanceBlistering2.previousProduct ||
          !tailLineClearanceBlistering2.previousProductBatchNo ||
          !tailLineClearanceBlistering2.productionSignature ||
          !tailLineClearanceBlistering2.qaSignature ||
          !tailLineClearanceBlistering2.pDate ||
          !tailLineClearanceBlistering2.qaDate 
        ) {
          alert("Please fill fields on this page before proceeding.");
          return false;
        }
        break;

      case 2: // Combined case for weight of coated tablets and batch manufacturing yield
        if (
          !instructions.blisterOperator ||
          !instructions.helper ||
          !instructions.productionPharmacist 
        ) {
          alert(
            "Please fill out all required fields on this page before proceeding."
          );
          return false;
        }
        break;

      case 3:
        if (
          !checkSheet.labels.every(
            (label) =>
              label.dateAndTime &&
              label.sealingTemp &&
              label.appearance &&
              label.embossing &&
              label.tabsOrCapsPerBlister &&
              label.text &&
              label.sealing &&
              label.leakTest &&
              label.performedByProductionQA 
          ) ||
          !checkSheet.blisterMachineId ||
          !checkSheet.productionPharmacist ||
          !checkSheet.productionPharmacistDate 
        ) {
          alert("Please fill required fields on this page before proceeding.");
          return false;
        }
        break;
    }

    return true; // All validations passed
  };

  const handleNextTab = () => {
    // if (validateFields()) {
      dispatch(setBlistering(record));
      const newTabValue = tabValue + 1;
      setTabValue(newTabValue);
      setTabStatus((prevStatus) => {
        const updatedStatus = [...prevStatus];
        updatedStatus[newTabValue] = true; // Enable the next tab
        return updatedStatus;
      });
      localStorage.setItem("activeTabBlistering", JSON.stringify(newTabValue)); // Save the updated tabValue
    // }
  };

  const handleBackTab = () => {
    setTabValue((prevTabValue) => Math.max(prevTabValue - 1, 0));
    localStorage.setItem(
      "activeTabBlistering",
      JSON.stringify(Math.max(tabValue - 1, 0))
    ); // Save the updated tabValue
  };

  const handleSave = async () => {
    // if (!validateFields()) {
    //   return; // Exit if validation fails
    // }

    try {
      const response = await fetch(`${REACT_APP_INTERNAL_API_PATH}/api/blistering/save`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...record,
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
      console.log("Blistering saved:", data);

      // Optional: Show a success message to the user
      alert(`Data for Tab ${tabValue + 1} saved successfully!`);

    } catch (error) {
      console.error("Error saving dispensing data:", error);
      alert("Failed to save data. Please try again.");
    }
  };


  const handleSubmit = async (e) => {
    e.preventDefault();

    // if (!validateFields()) {
    //   return; // Exit if validation fails
    // }

    // try {
    //   const response = await fetch(`${REACT_APP_INTERNAL_API_PATH}/api/blistering`, {
    //     method: "POST",
    //     headers: {
    //       "Content-Type": "application/json",
    //     },
    //     body: JSON.stringify({
    //       ...record, batchInfo: {
    //         ...batchInfo,
    //         batchNo: batchInfo.batchNo,
    //         productName: batchInfo.productName
    //     }}),
    //   });

    //   if (!response.ok) {
    //     throw new Error(`HTTP error! Status: ${response.status}`);
    //   }

    //   const data = await response.json();
    //   console.log("Batch created:", data);

    //   if (data && data._id) {
    //     localStorage.setItem("blisteringId", data._id);
    //     console.log("BlisteringID stored in localStorage:", data._id);
    //   }

      
      const processes = JSON.parse(localStorage.getItem("processes"));
      const currentIndex = processes.findIndex(
        process => process.name.toLowerCase() === 'blistering'
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
        localStorage.removeItem("activeTabBlistering");
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
      <FormHeaderPacking />
      <h1 className="text-center mt-4">Blistering</h1>

      <Box sx={{ width: "100%", borderBottom: 1, borderColor: "divider" }}>
        <Tabs
          value={tabValue}
          onChange={handleChangeTab}
          aria-label="blistering tabs"
            variant="scrollable" 
          scrollButtons="auto"
        >
          <Tab label="Line Clearance"  />
          {/* <Tab label="Tail Line Clearance" /> */}
          <Tab
            label="Instructions"
            // disabled={!tabStatus[2]}
          />
          <Tab label="Check Sheet" />
        </Tabs>
      </Box>

      <div>
        {tabValue === 0 &&(
          <div>
            <BatchPackingFormPage6 />
            <Button variant="contained" onClick={handlePrint} className="mt-3">
              Print Page
            </Button>
          </div>
        )}
        
        {/* {tabValue === 1 && (
          <div className="mt-6">
            <BatchPackingFormPage7 />
            <Button variant="contained" onClick={handlePrint} className="mt-3">
              Print Page
            </Button>
          </div>
        )} */}
        
        {tabValue === 1 && (
          <div className="mt-6">
            <BatchPackingFormPage8 />
            <Button variant="contained" onClick={handlePrint} className="mt-3">
              Print Page
            </Button>
          </div>
        )}
         
        {tabValue === 2 && (
          <div className="mt-6">
            <BatchPackingFormPage9 />
            <Button variant="contained" onClick={handlePrint} className="mt-3">
              Print Page
            </Button>
          </div>
        )}
          
      </div>

      <div
        className="mt-6"
        style={{ display: "flex", justifyContent: "space-between" }}
      >
        {tabValue > 0 && (
          <Button
            variant="contained"
            color="primary"
            onClick={handleBackTab}
            className="mt-4"
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
            className="mt-4"
          >
            Next
          </Button>
        )}

        {tabValue === 2 && (
          <Button variant="contained" color="primary" onClick={handleSubmit}>
            Next Process
          </Button>
        )}
      </div>
    </div>
  );
};

export default Blistering;
