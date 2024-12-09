import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Button, Tabs, Tab, Box } from "@mui/material";
import { setCompressionRecord } from "../../../../store/compressionSlice";

import FormHeader from "../../../header/formHeader";
import BatchManufacturingFormPage9 from "./page9";
import BatchManufacturingFormPage10 from "./page10";
import BatchManufacturingFormPage11 from "./page11";
import BatchManufacturingFormPage12 from "./page12";
import BatchManufacturingFormPage13 from "./page13";
import BatchManufacturingFormPage14 from "./page14";
import BatchManufacturingFormPage15 from "./page15";
import BatchManufacturingFormPage17 from "./page17";
import BatchManufacturingFormPage18 from "./page18";
import ProcessBox from "../coated/Coated";
import { usePermissions } from "../../../../hooks/usePermissions";
import CompressionQC from "./qC";
import FormHeaderQCCompression from "../../../header/formHeaderQCCompression";

const Compression = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const record = useSelector((state) => state.compression);
  const REACT_APP_INTERNAL_API_PATH = process.env.REACT_APP_INTERNAL_API_PATH;
  const processes = JSON.parse(localStorage.getItem("processes"));
  const batchInfo = useSelector((state) => state.batchInfo.batch);

  // Load saved tabValue from localStorage or default to 0
  const savedTabValue =
    JSON.parse(localStorage.getItem("activeTabCompression")) || 0;
  const [tabValue, setTabValue] = React.useState(savedTabValue);
  const [tabStatus, setTabStatus] = React.useState([
    true,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false
  ]);
  const { hasPermission } = usePermissions();
  const permission = {
    canReadPrecautions: hasPermission('compression-precautions', 'read'),
    canReadLineClearance: hasPermission('compression-line-clearance', 'read'),
    canReadCompressionRecord: hasPermission('compression-compression-record', 'read'),
    canReadRequestForAnalysis: hasPermission('compression-analysis', 'read'),
    canReadCompressionSpecifications: hasPermission('compression-specification', 'read'),
    canReadFollowUp: hasPermission('compression-follow-up', 'read'),
    canReadCheckSheet: hasPermission('compression-check-sheet', 'read'),
    canReadWeightOfCompressedTablets: hasPermission('compression-weight-yeild', 'read'),
    canReadRequestForAnalysisEnd: hasPermission('compression-analysis-end', 'read'),
    canReadQC: hasPermission('compression-qc', 'read'),
    canCreate: hasPermission('compression', 'create'),
    canCreateQC: hasPermission('compression-qc', 'create'),
    canUpdatePrecautions: hasPermission('compression-precautions', 'update'),
    canUpdateLineClearance: hasPermission('compression-line-clearance', 'update'),
    canUpdateCompressionRecord: hasPermission('compression-compression-record', 'update'),
    canUpdateRequestForAnalysis: hasPermission('compression-analysis', 'update'),
    canUpdateCompressionSpecifications: hasPermission('compression-compression-specification', 'update'),
    canUpdateFollowUp: hasPermission('compression-follow-up', 'update'),
    canUpdateCheckSheet: hasPermission('compression-check-sheet', 'update'),
    canUpdateWeightOfCompressedTablets: hasPermission('compression-weight-yeild', 'update'),
    canUpdateRequestForAnalysisEnd: hasPermission('compression-analysis-end', 'update'),
    canUpdateQC: hasPermission('compression-qc', 'update'),
    canDeletePrecautions: hasPermission('compression-precautions', 'delete'),
    canDeleteLineClearance: hasPermission('compression-line-clearance', 'delete'),
    canDeleteCompressionRecord: hasPermission('compression-compression-record', 'delete'),
    canDeleteRequestForAnalysis: hasPermission('compression-analysis', 'delete'),
    canDeleteCompressionSpecifications: hasPermission('compression-compression-specification', 'delete'),
    canDeleteFollowUp: hasPermission('compression-follow-up', 'delete'),
    canDeleteCheckSheet: hasPermission('compression-check-sheet', 'delete'),
    canDeleteWeightOfCompressedTablets: hasPermission('compression-weight-yeild', 'delete'),
    canDeleteRequestForAnalysisEnd: hasPermission('compression-analysis-end', 'delete'),
    canDeleteQC: hasPermission('compression-qc', 'delete'),
  };
  // New state to store the fetched record
const [fetchedCompression, setFetchedCompression] = useState(null);

// Fetch existing dispensing record on component mount
useEffect(() => {
  const fetchExistingDispensing = async () => {
    // Ensure we have a batch number
    if (!batchInfo?.batchNo) return;

    try {
      const response = await fetch(
        `${REACT_APP_INTERNAL_API_PATH}/api/compression/batch/${batchInfo.batchNo}`, 
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
        dispatch(setCompressionRecord(data));
        setFetchedCompression(data);
      }
    } catch (error) {
      console.error("Error fetching dispensing record:", error);
    }
  };

  fetchExistingDispensing();
}, [batchInfo?.batchNo, dispatch, REACT_APP_INTERNAL_API_PATH]);

  // useEffect(() => {
  //   const storedRecord = JSON.parse(localStorage.getItem("compressionRecord"));
  //   if (storedRecord) {
  //     dispatch(setCompressionRecord(storedRecord));
  //   }
  // }, [dispatch]);

  const handleChangeTab = (event, newValue) => {
    setTabValue(newValue);
    localStorage.setItem("activeTabCompression", JSON.stringify(newValue)); // Save tabValue to localStorage
  };
  // const handleChangeTab = (event, newValue) => {
  //   if (tabStatus[newValue]) {
  //     setTabValue(newValue);
  //     localStorage.setItem("activeTabCompression", JSON.stringify(newValue)); // Save tabValue to localStorage
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
      compressionRemarks,
      authorization,
      compressionRecord,
      compressionSpecifications,
      followUp,
      requestForAnalysis,
      checkSheet,
      weightOfCompressedTablets,
      compressionYield,
      requestForAnalysisEnd,
      checkboxes,
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
          !tempAndHumidity.compressionRemarks ||
          !authorization.authorizedForUse ||
          !authorization.dateAndTime
        ) {
          alert(
            "Please fill out all required fields on this page before proceeding."
          );
          return false;
        }
        break;

      case 2:
        if (
          !compressionRecord.verification.every(
            (prep) =>
              prep.performedByOperator &&
              prep.checkedByPO &&
              prep.checkedByQAI &&
              prep.pboDate &&
              prep.checkedByPODate &&
              prep.checkedByQAIDate 
              // prep.target
          ) ||
          !compressionRecord.temp ||
          !compressionRecord.rH ||
          !compressionRecord.weightOfGranules ||
          !compressionRecord.upperPunch ||
          !compressionRecord.lowerPunch ||
          !compressionRecord.compressionStartedAt ||
          !compressionRecord.compressionCompletedOn ||
          !compressionRecord.sampleTakenQty
        ) {
          alert(
            "Please fill out all required fields on this page before proceeding."
          );
          return false;
        }
        break;

      case 3:
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
            (obs) => obs.parameter && obs.statusCompression && obs.remarks
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

      case 4:
        if (
          !compressionSpecifications.parameters.every(
            (param) => param.parameters && param.specification && param.results
          ) ||
          !compressionSpecifications.checkedByQA ||
          !compressionSpecifications.checkedByQADate
        ) {
          alert(
            "Please fill out all required fields on this page before proceeding."
          );
          return false;
        }
        break;

      case 5:
        if (
          !followUp.labels.every(
            (label) =>
              label.date &&
              label.time &&
              label.avgWeight &&
              label.thickness &&
              label.hardness &&
              label.disintigrationTime &&
              label.friability &&
              label.performedBy
          ) ||
          !followUp.checkedByQA ||
          !followUp.checkedByQADate
        ) {
          alert(
            "Please fill out all required fields on this page before proceeding."
          );
          return false;
        }
        break;

      case 6:
        if (
          !checkSheet.labels.every(
            (label) =>
              label.dateAndTime &&
              label.weights.every((w) => w !== "") &&
              label.avgWeightOf10Tabs &&
              label.temp &&
              label.rH &&
              label.PoOrQoa
          ) ||
          !checkSheet.upperLimit ||
          !checkSheet.targetWeight ||
          !checkSheet.lowerLimit ||
          !checkSheet.dateStarted ||
          !checkSheet.dateCompleted ||
          !checkSheet.remarks
        ) {
          alert(
            "Please fill out all required fields on this page before proceeding."
          );
          return false;
        }
        break;

      case 7:
        if (
          // Check for weightOfCompressedTablets
          !weightOfCompressedTablets.containers.every(
            (container) =>
              container.grossWeight &&
              container.tareWeight &&
              container.netWeight
          ) ||
          !weightOfCompressedTablets.total.grossWeight ||
          !weightOfCompressedTablets.total.tareWeight ||
          !weightOfCompressedTablets.total.netWeight ||
          !weightOfCompressedTablets.weighedBy ||
          !weightOfCompressedTablets.receivedBy ||
          // Check for compressionYield
          !compressionYield.labels.every(
            (label) => label.description && label.yield
          ) ||
          !compressionYield.performedBy ||
          !compressionYield.performedByDate
        ) {
          alert(
            "Please fill out all required fields on this page before proceeding."
          );
          return false;
        }
        break;

      case 8:
        if (
          !requestForAnalysisEnd.batchInfo.product ||
          !requestForAnalysisEnd.batchInfo.qcNumber ||
          !requestForAnalysisEnd.batchInfo.section ||
          !requestForAnalysisEnd.batchInfo.stage ||
          !requestForAnalysisEnd.batchInfo.batchNumber ||
          !requestForAnalysisEnd.batchInfo.mfgDate ||
          !requestForAnalysisEnd.batchInfo.expDate ||
          !requestForAnalysisEnd.batchInfo.date ||
          !requestForAnalysisEnd.batchInfo.time ||
          !requestForAnalysisEnd.batchInfo.packSize ||
          !requestForAnalysisEnd.batchInfo.sampleQuantity ||
          !requestForAnalysisEnd.batchInfo.weightPerUnit ||
          !requestForAnalysisEnd.batchInfo.bSize ||
          !requestForAnalysisEnd.qa.sampleType ||
          !requestForAnalysisEnd.qa.releaseRequiredFor ||
          !requestForAnalysisEnd.qa.collectedBy ||
          !requestForAnalysisEnd.qa.dateCollected ||
          !requestForAnalysisEnd.qa.quantityOfSample ||
          !requestForAnalysisEnd.qa.containerNumbers ||
          !requestForAnalysisEnd.qaObservations.every(
            (obs) => obs.parameter && obs.statusCompressionEnd && obs.remarks
          ) ||
          !requestForAnalysisEnd.qaOfficer ||
          !requestForAnalysisEnd.qaManager
        ) {
          alert(
            "Please fill out all required fields on this page before proceeding."
          );
          return false;
        }
        break;
      
        case 9:
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
      dispatch(setCompressionRecord(record));
      const newTabValue = tabValue + 1;
      setTabValue(newTabValue);
      setTabStatus((prevStatus) => {
        const updatedStatus = [...prevStatus];
        updatedStatus[newTabValue] = true; // Enable the next tab
        return updatedStatus;
      });
      localStorage.setItem("activeTabCompression", JSON.stringify(newTabValue)); // Save the updated tabValue
    // }
  };

  const handleBackTab = () => {
    setTabValue((prevTabValue) => Math.max(prevTabValue - 1, 0));
    localStorage.setItem(
      "activeTabCompression",
      JSON.stringify(Math.max(tabValue - 1, 0))
    ); // Save the updated tabValue
  };

  const handleSave = async () => {
    // if (!validateFields()) {
    //   return; // Exit if validation fails
    // }

    try {
      const response = await fetch(`${REACT_APP_INTERNAL_API_PATH}/api/compression/save`, {
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
      console.log("Compression saved:", data);

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
    //   return;
    // }

    // try {
    //   const response = await fetch(`${REACT_APP_INTERNAL_API_PATH}/api/compression`, {
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
    //     localStorage.setItem("compressionID", data._id);
    //     console.log("Compression ID stored in localStorage:", data._id);
    //   }

      
      const processes = JSON.parse(localStorage.getItem("processes"));
      const currentIndex = processes.findIndex(
        process => process.name.toLowerCase() === 'compression'
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
        localStorage.removeItem("activeTabCompression");
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
      <h1 className="text-center mt-4">Compression</h1>

      <Box sx={{ width: "100%", borderBottom: 1, borderColor: "divider" }}>
        <Tabs
          value={tabValue}
          onChange={handleChangeTab}
          aria-label="compression tabs"
          variant="scrollable" 
          scrollButtons="auto"
        >
          <Tab label="Precautions"  />
          <Tab label="Line Clearance"  />
          <Tab label="Compression Process"  />
          <Tab label="Request for analysis"  />
          <Tab label="Compression specifications"  />
          <Tab label="Follow up"  />
          <Tab label="Check-sheet"  />
          <Tab label="Weight & Yield"  />
          <Tab label="Request for analysis" />
          <Tab label="QC"  />
        </Tabs>
      </Box>

      <div>
        {tabValue === 0 && (
          <div>
            <BatchManufacturingFormPage9 />
            <Button variant="contained" onClick={handlePrint} className="mt-3">
              Print Page
            </Button>
          </div>
        )}
       
        {tabValue === 1 && (
          <div>
            <BatchManufacturingFormPage10 />
            <Button variant="contained" onClick={handlePrint} className="mt-3">
              Print Page
            </Button>
          </div>
        )}
      
        {tabValue === 2 && (
          <div>
            <BatchManufacturingFormPage11 />
            <Button variant="contained" onClick={handlePrint} className="mt-3">
              Print Page
            </Button>
          </div>
        )}
       
        {tabValue === 3 && (
          <div>
            <BatchManufacturingFormPage12 />
            <Button variant="contained" onClick={handlePrint} className="mt-3">
              Print Page
            </Button>
          </div>
        )}
       
        {tabValue === 4 && (
          <div>
            <BatchManufacturingFormPage13 />
            <Button variant="contained" onClick={handlePrint} className="mt-3">
              Print Page
            </Button>
          </div>
        )}
        
        {tabValue === 5 && (
          <div>
            <BatchManufacturingFormPage14 />
            <Button variant="contained" onClick={handlePrint} className="mt-3">
              Print Page
            </Button>
          </div>
        )}
        
        {tabValue === 6 && (
          <div>
            <BatchManufacturingFormPage15 />
            <Button variant="contained" onClick={handlePrint} className="mt-3">
              Print Page
            </Button>
          </div>
        )}
        
        {tabValue === 7 && (
          <div>
            <BatchManufacturingFormPage17 />
            <Button variant="contained" onClick={handlePrint} className="mt-3">
              Print Page
            </Button>
          </div>
        )}
        
        {tabValue === 8 && (
          <div>
            <BatchManufacturingFormPage18 />
            <Button variant="contained" onClick={handlePrint} className="mt-3">
              Print Page
            </Button>
          </div>
        )}
  
         {tabValue === 9 && (
          <div className="mt-6">
            
            <CompressionQC />
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

        {tabValue < 9 && (
          <Button
            variant="contained"
            color="primary"
            onClick={handleNextTab}
            className="mt-4"
          >
            Next
          </Button>
        )}

        {tabValue === 9 && (
          <Button variant="contained" color="primary" onClick={handleSubmit}>
           Next Process
          </Button>
        )}
      </div>
    </div>
  );
};

export default Compression;
