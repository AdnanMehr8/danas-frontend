import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Button, Tabs, Tab, Box } from "@mui/material";
import { setMixingRecord } from "../../../../store/mixingSlice";
import BatchManufacturingFormPage4 from "./page4";
import BatchManufacturingFormPage5 from "./page5";
import BatchManufacturingFormPage6 from "./page6";
import BatchManufacturingFormPage7 from "./page7";
import FormHeader from "../../../header/formHeader";
import BatchManufacturingFormPage8 from "./page8";
import ProcessBox from "../coated/Coated";
import { usePermissions } from "../../../../hooks/usePermissions";
import MixingQC from "./qC";
import FormHeaderQC from "../../../header/formHeaderQCMixing";
import FormHeaderQCMixing from "../../../header/formHeaderQCMixing";
import '../dispensing/dispensing.css';
const Mixing = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const record = useSelector((state) => state.mixing);
  const REACT_APP_INTERNAL_API_PATH = process.env.REACT_APP_INTERNAL_API_PATH;
  const processes = JSON.parse(localStorage.getItem("processes"));
  const batchInfo = useSelector((state) => state.batchInfo.batch);

  // Load saved tabValue from localStorage or default to 0
  const savedTabValue =
    JSON.parse(localStorage.getItem("activeTabMixing")) || 0;
  const [tabValue, setTabValue] = React.useState(savedTabValue); // Control active tab
  const [tabStatus, setTabStatus] = React.useState([
    true,
    false,
    false,
    false,
    false,
    false,
  ]); // Control which tabs are enabled
  const { hasPermission } = usePermissions();
  const permission = {
    canReadPrecautions: hasPermission('mixing-precautions', 'read'),
    canReadLineClearance: hasPermission('mixing-line-clearance', 'read'),
    canReadManufacturingProcess: hasPermission('mixing-manufacturing-process', 'read'),
    canReadWeightOfGranules: hasPermission('mixing-weight-granules', 'read'),
    canReadRequestForAnalysis: hasPermission('mixing-analysis', 'read'),
    canReadQC: hasPermission('mixing-qc', 'read'),
    canCreate: hasPermission('mixing', 'create'),
    canCreateQC: hasPermission('mixing-qc', 'create'),
    canUpdatePrecautions: hasPermission('mixing-precautions', 'update'),
    canUpdateLineClearance: hasPermission('mixing-line-clearance', 'update'),
    canUpdateManufacturingProcess: hasPermission('mixing-manufacturing-process', 'update'),
    canUpdateWeightOfGranules: hasPermission('mixing-weight-Granules', 'update'),
    canUpdateRequestForAnalysis: hasPermission('mixing-analysis', 'update'),
    canUpdateQC: hasPermission('mixing-qc', 'update'),
    canDeletePrecautions: hasPermission('mixing-precautions', 'delete'),
    canDeleteLineClearance: hasPermission('mixing-line-clearance', 'delete'),
    canDeleteManufacturingProcess: hasPermission('mixing-manufacturing-process', 'delete'),
    canDeleteWeightOfGranules: hasPermission('mixing-weight-Granules', 'delete'),
    canDeleteRequestForAnalysis: hasPermission('mixing-analysis', 'delete'),
    canDeleteQC: hasPermission('mixing-qc', 'delete'),
  };
  // New state to store the fetched record
const [fetchedMixing, setFetchedMixing] = useState(null);

// Fetch existing dispensing record on component mount
useEffect(() => {
  const fetchExistingDispensing = async () => {
    // Ensure we have a batch number
    if (!batchInfo?.batchNo) return;

    try {
      const response = await fetch(
        `${REACT_APP_INTERNAL_API_PATH}/api/mixing/batch/${batchInfo.batchNo}`, 
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
        dispatch(setMixingRecord(data));
        setFetchedMixing(data);
      }
    } catch (error) {
      console.error("Error fetching dispensing record:", error);
    }
  };

  fetchExistingDispensing();
}, [batchInfo?.batchNo, dispatch, REACT_APP_INTERNAL_API_PATH]);

  // useEffect(() => {
  //   const storedRecord = JSON.parse(localStorage.getItem("mixingRecord"));
  //   if (storedRecord) {
  //     dispatch(setMixingRecord(storedRecord));
  //   }
  // }, [dispatch]);

  const handleChangeTab = (event, newValue) => {
    setTabValue(newValue);
    localStorage.setItem("activeTabMixing", JSON.stringify(newValue)); // Save tabValue to localStorage
  };
  // const handleChangeTab = (event, newValue) => {
  //   if (tabStatus[newValue]) {
  //     setTabValue(newValue);
  //     localStorage.setItem("activeTabMixing", JSON.stringify(newValue)); // Save tabValue to localStorage
  //   }
  // };

  const handlePrint = () => {
    window.print(); // Print the current page
  };

  const validateFields = () => {
    const {
      precautions,
      lineClearance,
      batchRecord,
      tempAndHumidity,
      mixingRemarks,
      authorization,
      manufacturingRecord,
      weightOfGranules,
      granulationYield,
      batchManufacturingYield,
      checkboxes,
      requestForAnalysisMixing,
      batch,
      testAndResults
    } = record;

    switch (tabValue) {
      case 0:
        if (
          !precautions.sop1 ||
          !precautions.sop2 ||
          !precautions.section ||
          !precautions.specificArea ||
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
          !tempAndHumidity.mixingRemarks ||
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
          !manufacturingRecord.every(
            (prep) =>
              prep.performedByOperator &&
              prep.checkedByPO &&
              prep.checkedByQAI &&
              prep.pboDate &&
              prep.checkedByPODate &&
              prep.checkedByQAIDate
          ) ||
          !manufacturingRecord[0].sievingStartedAt ||
          !manufacturingRecord[0].sievingCompletedOn ||
          !manufacturingRecord[1].mixingStartedAt ||
          !manufacturingRecord[1].mixingCompletedOn ||
          !manufacturingRecord[2].sampleTakenQty
        ) {
          alert("Please fill fields on this page before proceeding.");
          return false;
        }
        break;

      case 3: // Combined case for weight of coated tablets and batch manufacturing yield
        if (
          !weightOfGranules?.containers.every(
            (container) =>
              container.grossWeight &&
              container.tareWeight &&
              container.netWeight
          ) ||
          !weightOfGranules?.total?.grossWeight ||
          !weightOfGranules?.total?.tareWeight ||
          !weightOfGranules?.total?.netWeight ||
          !weightOfGranules?.weighedBy ||
          !weightOfGranules?.receivedBy ||
          !granulationYield.labels.every(
            (label) => label.description && label.weight
          ) ||
          !granulationYield.performedBy ||
          !granulationYield.pbDate
        ) {
          alert(
            "Please fill out all required fields on this page before proceeding."
          );
          return false;
        }
        break;

      case 4:
        if (
          !requestForAnalysisMixing.batchInfo.product ||
          !requestForAnalysisMixing.batchInfo.qcNumber ||
          !requestForAnalysisMixing.batchInfo.section ||
          !requestForAnalysisMixing.batchInfo.stage ||
          !requestForAnalysisMixing.batchInfo.batchNumber ||
          !requestForAnalysisMixing.batchInfo.mfgDate ||
          !requestForAnalysisMixing.batchInfo.expDate ||
          !requestForAnalysisMixing.batchInfo.date ||
          !requestForAnalysisMixing.batchInfo.time ||
          !requestForAnalysisMixing.batchInfo.packSize ||
          !requestForAnalysisMixing.batchInfo.sampleQuantity ||
          !requestForAnalysisMixing.batchInfo.weightPerUnit ||
          !requestForAnalysisMixing.batchInfo.bSize ||
          !requestForAnalysisMixing.qa.sampleType ||
          !requestForAnalysisMixing.qa.releaseRequiredFor ||
          !requestForAnalysisMixing.qa.collectedBy ||
          !requestForAnalysisMixing.qa.dateCollected ||
          !requestForAnalysisMixing.qa.collectedBy ||
          !requestForAnalysisMixing.qa.quantityOfSample ||
          !requestForAnalysisMixing.qa.containerNumbers ||
          !requestForAnalysisMixing.qaObservations.every(
            (obs) => obs.parameter && obs.statusMixing && obs.remarks
          ) ||
          !requestForAnalysisMixing.qaOfficer ||
          !requestForAnalysisMixing.qaManager
        ) {
          alert("Pleaserequired fields on this page before proceeding.");
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
      dispatch(setMixingRecord(record));
      const newTabValue = tabValue + 1;
      setTabValue(newTabValue);
      setTabStatus((prevStatus) => {
        const updatedStatus = [...prevStatus];
        updatedStatus[newTabValue] = true; // Enable the next tab
        return updatedStatus;
      });
      localStorage.setItem("activeTabMixing", JSON.stringify(newTabValue)); // Save the updated tabValue
    // }
  };

  const handleBackTab = () => {
    setTabValue((prevTabValue) => Math.max(prevTabValue - 1, 0));
    localStorage.setItem(
      "activeTabMixing",
      JSON.stringify(Math.max(tabValue - 1, 0))
    ); // Save the updated tabValue
  };

  const handleSave = async () => {
    // if (!validateFields()) {
    //   return; // Exit if validation fails
    // }

    try {
      const response = await fetch(`${REACT_APP_INTERNAL_API_PATH}/api/mixing/save`, {
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
      console.log("Mixing saved:", data);

      // Optional: Show a success message to the user
      alert(`Data for Tab ${tabValue + 1} saved successfully!`);

    } catch (error) {
      console.error("Error saving mixing data:", error);
      alert("Failed to save data. Please try again.");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // if (!validateFields()) {
    //   return; // Exit if validation fails
    // }

    // try {
    //   const response = await fetch(`${REACT_APP_INTERNAL_API_PATH}/api/mixing`, {
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
    //     localStorage.setItem("mixingId", data._id);
    //     console.log("MixingID stored in localStorage:", data._id);
    //   }

      const processes = JSON.parse(localStorage.getItem("processes"));
      const currentIndex = processes.findIndex(
        process => process.name.toLowerCase() === 'mixing'
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
        localStorage.removeItem("activeTabMixing");
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
      <h1 className="text-center mt-4 print-hide">Mixing</h1>

      <Box sx={{ width: "100%", borderBottom: 1, borderColor: "divider" }} className="print-container">
        <Tabs
          value={tabValue}
          onChange={handleChangeTab}
          aria-label="mixing tabs"
            variant="scrollable" 
          scrollButtons="auto"
          className="print-hide"
        
        >
          <Tab label="Precautions" />
          <Tab label="Line Clearance" />
          <Tab label="Manufacturing Process" />
          <Tab
            label="Weight of granules/bulk & Yield"
            // disabled={!tabStatus[3]}
          />
          <Tab label="Request for analysis"  />
          <Tab label="QC"  />
        </Tabs>
      </Box>

      <div>
        {tabValue === 0 &&  (
          <div>
            <BatchManufacturingFormPage4 />
            <Button variant="contained" onClick={handlePrint} className="mt-3 print-container">
              Print Page
            </Button>
          </div>
        )}
      
        {tabValue === 1 && (
          <div className="mt-6">
            <BatchManufacturingFormPage5 />
            <Button variant="contained" onClick={handlePrint} className="mt-3 print-container">
              Print Page
            </Button>
          </div>
        )}
    
        {tabValue === 2 && (
          <div className="mt-6">
            <BatchManufacturingFormPage6 />
            <Button variant="contained" onClick={handlePrint} className="mt-3 print-container">
              Print Page
            </Button>
          </div>
        )}
       
        {tabValue === 3 && (
          <div className="mt-6">
            <BatchManufacturingFormPage7 />
            <Button variant="contained" onClick={handlePrint} className="mt-3 print-container">
              Print Page
            </Button>
          </div>
        )}
      
        {tabValue === 4 && (
          <div className="mt-2">
            <BatchManufacturingFormPage8 />
            <Button variant="contained" onClick={handlePrint} className="mt-3 print-container">
              Print Page
            </Button>
          </div>
        )}
          
        {tabValue === 5 && (
          <div className="mt-6">
            <MixingQC />
            <Button variant="contained" onClick={handlePrint} className="mt-3 print-container">
              Print Page
            </Button>
          </div>
        )}
     
      </div>
    

      <div
        className="mt-6 print-hide"
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

        {tabValue < 5 && (
          <Button
            variant="contained"
            color="primary"
            onClick={handleNextTab}
            className="mt-4"
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
    </div >
      </div>
  );
};

export default Mixing;
