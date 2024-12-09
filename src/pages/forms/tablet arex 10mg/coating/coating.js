import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Button, Tabs, Tab, Box } from "@mui/material";

import FormHeader from "../../../header/formHeader";
import { setCoatingRecord } from "../../../../store/coatingSlice";
import BatchManufacturingFormPage19 from "./page19";
import BatchManufacturingFormPage20 from "./page20";
import BatchManufacturingFormPage21 from "./page21";
import BatchManufacturingFormPage22 from "./page22";
import BatchManufacturingFormPage23 from "./page23";
import ProcessBox from "../coated/Coated";
import { usePermissions } from "../../../../hooks/usePermissions";
import CoatingQC from "./qC";
import FormHeaderQCCoating from "../../../header/formHeaderQCCoating";

const Coating = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const record = useSelector((state) => state.coating);
  const REACT_APP_INTERNAL_API_PATH = process.env.REACT_APP_INTERNAL_API_PATH;
  const processes = JSON.parse(localStorage.getItem("processes"));
  const batchInfo = useSelector((state) => state.batchInfo.batch);

  // Load saved tabValue from localStorage or default to 0
  const savedTabValue =
    JSON.parse(localStorage.getItem("activeTabCoating")) || 0;
  const [tabValue, setTabValue] = React.useState(savedTabValue); // Control active tab
  const [tabStatus, setTabStatus] = React.useState([
    true,
    false,
    false,
    false,
    false,
    false,
  ]); // Manage tab enabled/disabled
  const { hasPermission } = usePermissions();
  const permission = {
    canReadPrecautions: hasPermission('coating-precautions', 'read'),
    canReadLineClearance: hasPermission('coating-line-clearance', 'read'),
    canReadCoatingProcedure: hasPermission('coating-procedure', 'read'),
    canReadWeightOfCoatedTablets: hasPermission('coating-weight-yield', 'read'),
    canReadRequestForAnalysis: hasPermission('coating-analysis', 'read'),
    canReadQC: hasPermission('coating-qc', 'read'),
    canCreate: hasPermission('coating', 'create'),
    canCreateQC: hasPermission('coating-qc', 'create'),
    canUpdatePrecautions: hasPermission('coating-precautions', 'update'),
    canUpdateLineClearance: hasPermission('coating-line-clearance', 'update'),
    canUpdateCoatingProcedure: hasPermission('coating-procedure', 'update'),
    canUpdateWeightOfCoatedTablets: hasPermission('coating-weight-yield', 'update'),
    canUpdateRequestForAnalysis: hasPermission('coating-analysis', 'update'),
    canUpdateQC: hasPermission('coating-qc', 'update'),
    canDeletePrecautions: hasPermission('coating-precautions', 'delete'),
    canDeleteLineClearance: hasPermission('coating-line-clearance', 'delete'),
    canDeleteCoatingProcedure: hasPermission('coating-procedure', 'delete'),
    canDeleteWeightOfCoatedTablets: hasPermission('coating-weight-yield', 'delete'),
    canDeleteRequestForAnalysis: hasPermission('coating-analysis', 'delete'),
    canDeleteQC: hasPermission('coating-qc', 'delete'),
  };
  // New state to store the fetched record
const [fetchedCoating, setFetchedCoatinf] = useState(null);

// Fetch existing dispensing record on component mount
useEffect(() => {
  const fetchExistingDispensing = async () => {
    // Ensure we have a batch number
    if (!batchInfo?.batchNo) return;

    try {
      const response = await fetch(
        `${REACT_APP_INTERNAL_API_PATH}/api/coating/batch/${batchInfo.batchNo}`, 
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
        dispatch(setCoatingRecord(data));
        setFetchedCoatinf(data);
      }
    } catch (error) {
      console.error("Error fetching dispensing record:", error);
    }
  };

  fetchExistingDispensing();
}, [batchInfo?.batchNo, dispatch, REACT_APP_INTERNAL_API_PATH]);

  // useEffect(() => {
  //   const storedRecord = JSON.parse(localStorage.getItem("coatingRecord"));
  //   if (storedRecord) {
  //     dispatch(setCoatingRecord(storedRecord));
  //   }
  // }, [dispatch]);

  const handleChangeTab = (event, newValue) => {
    setTabValue(newValue);
    localStorage.setItem("activeTabCoating", JSON.stringify(newValue)); // Save tabValue to localStorage
  };
  // const handleChangeTab = (event, newValue) => {
  //   if (tabStatus[newValue]) {
  //     setTabValue(newValue);
  //     localStorage.setItem("activeTabCoating", JSON.stringify(newValue)); // Save tabValue to localStorage
  //   }
  // };

  const handlePrint = () => {
    window.print(); // Trigger browser print
  };

  const validateFields = () => {
    const {
      precautions,
      lineClearance,
      batchRecord,
      checkboxes,
      tempAndHumidity,
      coatingRemarks,
      authorization,
      coatingSolutionPreparation,
      coatingProcedure,
      weightOfCoatedTablets,
      batchManufacturingYield,
      requestForAnalysis,
      batch,
      testAndResults
    } = record;

    switch (tabValue) {
      case 0:
        if (
          !precautions.precautionsRead ||
          !lineClearance.every(
            (line) =>
              line.equipment &&
              line.equipmentId &&
              line.previousProduct &&
              line.batchNo &&
              line.cleanedBy &&
              line.checkedBy &&
              line.verifiedBy &&
              line.equipmentCapacity &&
              line.clDate &&
              line.chDate &&
              line.vDate
          )
          // !lineClearance.previousProduct ||
          // !lineClearance.batchNo ||
          // !lineClearance.cleanedBy ||
          // !lineClearance.checkedBy ||
          // !lineClearance.verifiedBy
        ) {
          alert(
            "Please fill out all required fields on this page before proceeding."
          );
          return false;
        }
        break;

      case 1:
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
          !tempAndHumidity.coatingRemarks ||
          !authorization.authorizedForUse ||
          !authorization.dateAndTime
        ) {
          alert(
            "Please fill out all required fields on this page before proceeding."
          );
          return false;
        }
        break;

      case 2: // Combined case for coating solution preparation and coating procedure
        if (
          !coatingSolutionPreparation.every(
            (prep) =>
              prep.instructions &&
              prep.activityCompliance &&
              prep.performedByOperator &&
              prep.checkedByPO &&
              prep.checkedByQAI &&
              prep.pboDate &&
              prep.checkedByPODate &&
              prep.checkedByQAIDate
          ) ||
          !coatingProcedure.every(
            (coatingProc) =>
              coatingProc.instructions &&
              coatingProc.activityCompliance &&
              coatingProc.performedByOperator &&
              coatingProc.checkedByPO &&
              coatingProc.checkedByQAI &&
              coatingProc.pboDate &&
              coatingProc.checkedByPODate &&
              coatingProc.checkedByQAIDate
          )
        ) {
          alert(
            "Please fill out all required fields on this page before proceeding."
          );
          return false;
        }
        break;

      case 3: // Combined case for weight of coated tablets and batch manufacturing yield
        if (
          !weightOfCoatedTablets?.containers.every(
            (container) =>
              container.grossWeight &&
              container.tareWeight &&
              container.netWeight
          ) ||
          !weightOfCoatedTablets?.total?.grossWeight ||
          !weightOfCoatedTablets?.total?.tareWeight ||
          !weightOfCoatedTablets?.total?.netWeight ||
          !weightOfCoatedTablets?.weighedBy ||
          !weightOfCoatedTablets?.receivedBy ||
          !batchManufacturingYield.labels.every(
            (label) => label.description && label.yield
          ) ||
          !batchManufacturingYield.performedBy ||
          !batchManufacturingYield.performedByDate
        ) {
          alert(
            "Please fill out all required fields on this page before proceeding."
          );
          return false;
        }
        break;

      case 4:
        if (
          !requestForAnalysis.batchInfo.product ||
          !requestForAnalysis.batchInfo.qcNumber ||
          !requestForAnalysis.batchInfo.section ||
          !requestForAnalysis.batchInfo.stage ||
          !requestForAnalysis.batchInfo.batchNumber ||
          !requestForAnalysis.batchInfo.mfgDate ||
          !requestForAnalysis.batchInfo.expDate ||
          !requestForAnalysis.batchInfo.date ||
          !requestForAnalysis.batchInfo.time ||
          !requestForAnalysis.batchInfo.packSize ||
          !requestForAnalysis.batchInfo.sampleQuantity ||
          !requestForAnalysis.batchInfo.weightPerUnit ||
          !requestForAnalysis.batchInfo.bSize ||
          !requestForAnalysis.qa.sampleType ||
          !requestForAnalysis.qa.releaseRequiredFor ||
          !requestForAnalysis.qa.collectedBy ||
          !requestForAnalysis.qa.dateCollected ||
          !requestForAnalysis.qa.quantityOfSample ||
          !requestForAnalysis.qa.containerNumbers ||
          !requestForAnalysis.qaObservations.every(
            (obs) => obs.parameter && obs.statusCoating && obs.remarks
          ) ||
          !requestForAnalysis.qaOfficer ||
          !requestForAnalysis.qaManager
        ) {
          alert(
            "Please fill out all required fields on this page before proceeding."
          );
          return false;
        }
        break;
      
        case 5:
          if (
            !batch.productName ||
            !batch.batchNo ||
            !batch.qCNo ||
            !batch.batchSize ||
            !batch.packsSize ||
            !batch.mfgDate ||
            !batch.expiryDate ||
            !batch.analysisDate||
            !batch.sampleType ||
            !testAndResults.parameters.every(
              (obs) => obs.parameters && obs.specification && obs.results
            ) ||
            !testAndResults.checkedByQCA ||
            !testAndResults.checkedByQCADate ||
            !testAndResults.checkedByQCM ||
            !testAndResults.checkedByQCMDate 
          ) {
            alert("Please required fields on this page before proceeding.");
            return false;
          }
          break;
    }

    return true; // All validations passed
  };

  const handleNextTab = () => {
    // if (validateFields()) {
      dispatch(setCoatingRecord(record));
      const newTabValue = tabValue + 1;
      setTabValue(newTabValue);
      setTabStatus((prevStatus) => {
        const updatedStatus = [...prevStatus];
        updatedStatus[newTabValue] = true; // Enable the next tab
        return updatedStatus;
      });
      localStorage.setItem("activeTabCoating", JSON.stringify(newTabValue)); // Save the updated tabValue
    // }
  };

  const handleBackTab = () => {
    setTabValue((prevTabValue) => Math.max(prevTabValue - 1, 0)); // Min is 0 (first tab)
    localStorage.setItem(
      "activeTabCoating",
      JSON.stringify(Math.max(tabValue - 1, 0))
    ); // Save the updated tabValue
  };

  const handleSave = async () => {
    // if (!validateFields()) {
    //   return; // Exit if validation fails
    // }

    try {
      const response = await fetch(`${REACT_APP_INTERNAL_API_PATH}/api/coating/save`, {
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
      console.log("Coating saved:", data);

      // Optional: Show a success message to the user
      alert(`Data for Tab ${tabValue + 1} saved successfully!`);

    } catch (error) {
      console.error("Error saving coating data:", error);
      alert("Failed to save data. Please try again.");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // // Perform final validation before submitting
    // if (!validateFields()) {
    //   return;
    // }

    // console.log("Record data to be sent:", record);

    // try {
    //   const response = await fetch(`${REACT_APP_INTERNAL_API_PATH}/api/coating`, {
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
    //     localStorage.setItem("coatingId", data._id);
    //     console.log("Coating ID stored in localStorage:", data._id);
    //   }

      const processes = JSON.parse(localStorage.getItem("processes"));
      const currentIndex = processes.findIndex(
        process => process.name.toLowerCase() === 'coating'
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
        localStorage.removeItem("activeTabCoating");
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
      <FormHeader />
      <h1 className="text-center mt-4">Coating</h1>

      <Box sx={{ width: "100%", borderBottom: 1, borderColor: "divider" }}>
        <Tabs
          value={tabValue}
          onChange={handleChangeTab}
          aria-label="coating tabs"
           variant="scrollable" 
          scrollButtons="auto"
        >
          <Tab label="Precautions"  />
          <Tab label="Line clearance" />
          <Tab
            label="Solution Preparation & Procedure"
            // disabled={!tabStatus[2]}
          />
          <Tab label="weight & Yield" />
          <Tab label="Request for analysis" />
          <Tab label="QC"  />
        </Tabs>
      </Box>

      <div>
        {tabValue === 0 && (
          <div>
            <BatchManufacturingFormPage19 />
            <Button variant="contained" onClick={handlePrint} className="mt-3">
              Print Page
            </Button>
          </div>
        )}
       
        {tabValue === 1 && (
          <div>
            <BatchManufacturingFormPage20 />
            <Button variant="contained" onClick={handlePrint} className="mt-3">
              Print Page
            </Button>
          </div>
        )}
      
        {tabValue === 2 && (
          <div>
            <BatchManufacturingFormPage21 />
            <Button variant="contained" onClick={handlePrint} className="mt-3">
              Print Page
            </Button>
          </div>
        )}
    
        {tabValue === 3 && (
          <div>
            <BatchManufacturingFormPage22 />
            <Button variant="contained" onClick={handlePrint} className="mt-3">
              Print Page
            </Button>
          </div>
        )}
        
        {tabValue === 4 && (
          <div>
            <BatchManufacturingFormPage23 />
            <Button variant="contained" onClick={handlePrint} className="mt-3">
              Print Page
            </Button>
          </div>
        )}
        
         {tabValue === 5 &&  (
          <div className="mt-6">
            <CoatingQC />
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
            className="mt-3"
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

        {tabValue < 5 && (
          <Button
            variant="contained"
            color="primary"
            onClick={handleNextTab}
            className="mt-3"
          >
            Next
          </Button>
        )}

        {tabValue === 5 && (
          <Button variant="contained" color="primary" onClick={handleSubmit}>
        Next Process
          </Button>
        )}
      </div>
    </div>
  );
};

export default Coating;
