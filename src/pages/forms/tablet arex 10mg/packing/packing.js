import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Button, Tabs, Tab, Box } from "@mui/material";
import { setPacking } from "../../../../store/packingSlice";
import FormHeaderPacking from "../../../header/formHeaderPacking";
import BatchPackingFormPage10 from "./page10";
import BatchPackingFormPage11 from "./page11";
import BatchPackingFormPage12 from "./page12";
import BatchPackingFormPage13 from "./page13";
import BatchPackingFormPage14 from "./page14";
import BatchPackingFormPage15 from "./page15";
import BatchPackingFormPage16 from "./page16";
import ProcessBox from "../coated/Coated";
import { usePermissions } from "../../../../hooks/usePermissions";
import PackingQC from "./qC";
import FormHeaderQCPacking from "../../../header/formHeaderQCPacking";

const Packing = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const record = useSelector((state) => state.packing);
  const REACT_APP_INTERNAL_API_PATH = process.env.REACT_APP_INTERNAL_API_PATH;
  const processes = JSON.parse(localStorage.getItem("processes"));
  const batchInfo = useSelector((state) => state.batchInfoPacking.batch);

  // Load saved tabValue from localStorage or default to 0
  const savedTabValue =
    JSON.parse(localStorage.getItem("activeTabPacking")) || 0;
  const [tabValue, setTabValue] = React.useState(savedTabValue); // Control active tab
  const [tabStatus, setTabStatus] = React.useState([
    true,
    false,
    false,
    false,
    false,
    false,
    // false,
  ]); // Control which tabs are enabled
  const { hasPermission } = usePermissions();
  const permission = {
    canReadLineClearance: hasPermission('packing-line-clearance', 'read'),
    canReadTailLine: hasPermission('packing-tail-line', 'read'),
    canReadTeamSheet: hasPermission('packing-team-sheet', 'read'),
    canReadCheckSheet: hasPermission('packing-checksheet', 'read'),
    canReadRequestForAnalysis: hasPermission('packing-analysis', 'read'),
    canReadQC: hasPermission('packing-qc', 'read'),
    canReadReconcillationSheet: hasPermission('packing-reconcillation-sheet', 'read'),
    canReadStockTransferReport: hasPermission('packing-stock-transfer', 'read'),
    canCreate: hasPermission('packing', 'create'),
    canCreateQC: hasPermission('packing-qc', 'create'),
    canUpdateLineClearance: hasPermission('packing-line-clearance', 'update'),
    canUpdateTailLine: hasPermission('packing-tail-line', 'update'),
    canUpdateTeamSheet: hasPermission('packing-team-sheet', 'update'),
    canUpdateCheckSheet: hasPermission('packing-checksheet', 'update'),
    canUpdateRequestForAnalysis: hasPermission('packing-checksheet', 'update'),
    canUpdateQC: hasPermission('packing-qc', 'update'),
    canUpdateReconcillationSheet: hasPermission('packing-reconcillation-sheet', 'update'),
    canUpdateStockTransferReport: hasPermission('packing-stock-transfer', 'update'),
    canDeleteLineClearance: hasPermission('packing-line-clearance', 'delete'),
    canDeleteTailLine: hasPermission('packing-tail-line', 'delete'),
    canDeleteTeamSheet: hasPermission('packing-team-sheet', 'delete'),
    canDeleteCheckSheet: hasPermission('packing-checksheet', 'delete'),
    canDeleteRequestForAnalysis: hasPermission('packing-checksheet', 'delete'),
    canDeleteReconcillationSheet: hasPermission('packing-reconcillation-sheet', 'delete'),
    canDeleteStockTransferReport: hasPermission('packing-stock-transfer', 'delete'),
    canDeleteQC: hasPermission('packing-qc', 'delete'),
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
        `${REACT_APP_INTERNAL_API_PATH}/api/packing/batch/${batchInfo.batchNo}`, 
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
        dispatch(setPacking(data));
        setFetchedBlistering(data);
      }
    } catch (error) {
      console.error("Error fetching dispensing record:", error);
    }
  };

  fetchExistingDispensing();
}, [batchInfo?.batchNo, dispatch, REACT_APP_INTERNAL_API_PATH]);


  // useEffect(() => {
  //   const storedRecord = JSON.parse(localStorage.getItem("packing"));
  //   if (storedRecord) {
  //     dispatch(setPacking(storedRecord));
  //   }
  // }, [dispatch]);


  const handleChangeTab = (event, newValue) => {
    setTabValue(newValue);
    localStorage.setItem("activeTabPacking", JSON.stringify(newValue)); // Save tabValue to localStorage
  };
  // const handleChangeTab = (event, newValue) => {
  //   if (tabStatus[newValue]) {
  //     setTabValue(newValue);
  //     localStorage.setItem("activeTabPacking", JSON.stringify(newValue)); // Save tabValue to localStorage
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
      tailLineClearancePacking,
      tailLineClearancePacking2,
      teamSheet,
      checkSheet,
      requestForAnalysisPacking,
      reconcilliationSheet,
      stockTransferReport,
      batch,
      testAndResults
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
          !tailLineClearancePacking.lineProduct ||
          !tailLineClearancePacking.lineProductBatchNo ||
          !tailLineClearancePacking.mfg ||
          !tailLineClearancePacking.exp ||
          !tailLineClearancePacking.price ||
          !tailLineClearancePacking.date ||
          !tailLineClearancePacking.previousProduct ||
          !tailLineClearancePacking.previousProductBatchNo ||
          !tailLineClearancePacking.productionSignature ||
          !tailLineClearancePacking.qaSignature ||
          !tailLineClearancePacking.pDate ||
          !tailLineClearancePacking.qaDate ||
          !tailLineClearancePacking2.lineProduct ||
          !tailLineClearancePacking2.lineProductBatchNo ||
          !tailLineClearancePacking2.mfg ||
          !tailLineClearancePacking2.exp ||
          !tailLineClearancePacking2.price ||
          !tailLineClearancePacking2.date ||
          !tailLineClearancePacking2.previousProduct ||
          !tailLineClearancePacking2.previousProductBatchNo ||
          !tailLineClearancePacking2.productionSignature ||
          !tailLineClearancePacking2.qaSignature ||
          !tailLineClearancePacking2.pDate ||
          !tailLineClearancePacking2.qaDate 
        ) {
          alert("Please fill fields on this page before proceeding.");
          return false;
        }
        break;

      case 2: // Combined case for weight of coated tablets and batch manufacturing yield
        if (
          !teamSheet.labels.every(
            (label) =>
              label.name &&
              label.process &&
              label.timeIn &&
              label.timeOut &&
              label.timeIn2 &&
              label.timeOut2 &&
              label.timeIn3 &&
              label.timeOut3 
          ) ||
          !teamSheet.incharge ||
          !teamSheet.inchargeDate ||
          !teamSheet.packingOfficer ||
          !teamSheet.packingOfficerDate 
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
              label.blister &&
              label.batchNo &&
              label.mfgDate &&
              label.expDate &&
              label.mrp &&
              label.packSize &&
              label.directionInsertion &&
              label.inner &&
              label.label && 
              label.bottleOrTube && 
              label.ucOrMc && 
              label.mcNo && 
              label.signedByProductionOrQA 
          ) ||
          !checkSheet.dateStarted ||
          !checkSheet.dateCompleted 
        ) {
          alert("Please fill required fields on this page before proceeding.");
          return false;
        }
        break;
      
        case 4:
          if (
            !requestForAnalysisPacking.batchInfo.product ||
            !requestForAnalysisPacking.batchInfo.qcNumber ||
            !requestForAnalysisPacking.batchInfo.section ||
            !requestForAnalysisPacking.batchInfo.stage ||
            !requestForAnalysisPacking.batchInfo.batchNumber ||
            !requestForAnalysisPacking.batchInfo.mfgDate ||
            !requestForAnalysisPacking.batchInfo.expDate ||
            !requestForAnalysisPacking.batchInfo.date ||
            !requestForAnalysisPacking.batchInfo.time ||
            !requestForAnalysisPacking.batchInfo.packSize ||
            !requestForAnalysisPacking.batchInfo.sampleQuantity ||
            !requestForAnalysisPacking.batchInfo.weightPerUnit ||
            !requestForAnalysisPacking.batchInfo.bSize ||
            !requestForAnalysisPacking.qa.sampleType ||
            !requestForAnalysisPacking.qa.releaseRequiredFor ||
            !requestForAnalysisPacking.qa.collectedBy ||
            !requestForAnalysisPacking.qa.dateCollected ||
            !requestForAnalysisPacking.qa.collectedBy ||
            !requestForAnalysisPacking.qa.quantityOfSample ||
            !requestForAnalysisPacking.qa.containerNumbers ||
            !requestForAnalysisPacking.qaObservations.every(
              (obs) => obs.parameter && obs.statusPacking && obs.remarks
            ) ||
            !requestForAnalysisPacking.qaOfficer ||
            !requestForAnalysisPacking.qaManager
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
    
      case 6:
        if (
          !reconcilliationSheet.labels.every(
            (label) =>
              label.description &&
              label.reconcillation 
          ) ||
          !reconcilliationSheet.productionManager ||
          !reconcilliationSheet.remarks 
        ) {
          alert("Please fill required fields on this page before proceeding.");
          return false;
        }
        break;

          case 7:
            if (
              !stockTransferReport.labels.every(
                (label) =>
                  label.date &&
                  label.transferNote &&
                  label.packSize && 
                  label.noOfLimitsPack && 
                  label.noOfMasterCartonPacked && 
                  label.packingSupervisor && 
                  label.storeOfficer             
              ) ||
              !stockTransferReport.mfgDate ||
              !stockTransferReport.expDate ||
              !stockTransferReport.productionOfficer ||
              !stockTransferReport.qaOfficer 

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
      dispatch(setPacking(record));
      const newTabValue = tabValue + 1;
      setTabValue(newTabValue);
      setTabStatus((prevStatus) => {
        const updatedStatus = [...prevStatus];
        updatedStatus[newTabValue] = true; // Enable the next tab
        return updatedStatus;
      });
      localStorage.setItem("activeTabPacking", JSON.stringify(newTabValue)); // Save the updated tabValue
    // }
  };

  const handleBackTab = () => {
    setTabValue((prevTabValue) => Math.max(prevTabValue - 1, 0));
    localStorage.setItem(
      "activeTabPacking",
      JSON.stringify(Math.max(tabValue - 1, 0))
    ); // Save the updated tabValue
  };

  const handleSave = async () => {
    // if (!validateFields()) {
    //   return; // Exit if validation fails
    // }

    try {
      const response = await fetch(`${REACT_APP_INTERNAL_API_PATH}/api/packing/save`, {
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
      console.log("Packing saved:", data);

      // Optional: Show a success message to the user
      alert(`Data for Tab ${tabValue + 1} saved successfully!`);

    } catch (error) {
      console.error("Error saving packing data:", error);
      alert("Failed to save data. Please try again.");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // if (!validateFields()) {
    //   return; // Exit if validation fails
    // }

    // try {
    //   const response = await fetch(`${REACT_APP_INTERNAL_API_PATH}/api/packing`, {
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
    //     localStorage.setItem("packingId", data._id);
    //     console.log("MixingID stored in localStorage:", data._id);
    //   }

     
      const processes = JSON.parse(localStorage.getItem("processes"));
      const currentIndex = processes.findIndex(
        process => process.name.toLowerCase() === 'packing'
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
        localStorage.removeItem("activeTabPacking");
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
      <h1 className="text-center mt-4">Packing</h1>

      <Box sx={{ width: "100%", borderBottom: 1, borderColor: "divider" }}>
        <Tabs
          value={tabValue}
          onChange={handleChangeTab}
          aria-label="packing tabs"
            variant="scrollable" 
          scrollButtons="auto"
        >
          <Tab label="Line Clearance"  />
          {/* <Tab label="Tail Line Clearance"  /> */}
          <Tab
            label="Team Layout Sheet"
            // disabled={!tabStatus[2]}
          />
          <Tab label="Packaging In Process Sheet"  />
          <Tab label="Request For Analysis" />
          <Tab label="QC" />
          <Tab label="Reconcillation Sheet"  />
          <Tab label="Stock Transfer Report" />

        </Tabs>
      </Box>

      <div>
        {tabValue === 0 && (
          <div>
            <BatchPackingFormPage10 />
            <Button variant="contained" onClick={handlePrint} className="mt-3">
              Print Page
            </Button>
          </div>
        )}
        
        {/* {tabValue === 1 && (
          <div className="mt-6">
            <BatchPackingFormPage11 />
            <Button variant="contained" onClick={handlePrint} className="mt-3">
              Print Page
            </Button>
          </div>
        )}
          */}
        {tabValue === 1 && (
          <div className="mt-6">
            <BatchPackingFormPage12 />
            <Button variant="contained" onClick={handlePrint} className="mt-3">
              Print Page
            </Button>
          </div>
        )}
        
        {tabValue === 2 && (
          <div className="mt-6">
            <BatchPackingFormPage13 />
            <Button variant="contained" onClick={handlePrint} className="mt-3">
              Print Page
            </Button>
          </div>
        )}
        
        {tabValue === 3 && (
          <div className="mt-6">
            <BatchPackingFormPage14 />
            <Button variant="contained" onClick={handlePrint} className="mt-3">
              Print Page
            </Button>
          </div>
        )}
         
         {tabValue === 4 && (
          <div className="mt-6">
             <PackingQC />
            <Button variant="contained" onClick={handlePrint} className="mt-3">
              Print Page
            </Button>
          </div>
        )}
        {tabValue === 5 && (
          <div className="mt-6">
            <BatchPackingFormPage15 />
           
            <Button variant="contained" onClick={handlePrint} className="mt-3">
              Print Page
            </Button>
          </div>
        )}
          
  
         {tabValue === 6 && (
          <div className="mt-6">
            <BatchPackingFormPage16 />
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

        {tabValue < 6 && (
          <Button
            variant="contained"
            color="primary"
            onClick={handleNextTab}
            className="mt-4"
          >
            Next
          </Button>
        )}

        {tabValue === 6 && (
          <Button variant="contained" color="primary" onClick={handleSubmit}>
          Next Process
          </Button>
        )}
      </div>
    </div>
  );
};

export default Packing;
