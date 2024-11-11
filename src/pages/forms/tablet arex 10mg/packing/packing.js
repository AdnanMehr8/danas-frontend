import React, { useEffect } from "react";
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

const Packing = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const record = useSelector((state) => state.packing);
  const REACT_APP_INTERNAL_API_PATH = process.env.REACT_APP_INTERNAL_API_PATH;

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

  useEffect(() => {
    const storedRecord = JSON.parse(localStorage.getItem("packing"));
    if (storedRecord) {
      dispatch(setPacking(storedRecord));
    }
  }, [dispatch]);

  const handleChangeTab = (event, newValue) => {
    if (tabStatus[newValue]) {
      setTabValue(newValue);
      localStorage.setItem("activeTabPacking", JSON.stringify(newValue)); // Save tabValue to localStorage
    }
  };

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
      stockTransferReport
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
              (obs) => obs.parameter && obs.statusMixing && obs.remarks
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

          case 6:
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
    if (validateFields()) {
      dispatch(setPacking(record));
      const newTabValue = tabValue + 1;
      setTabValue(newTabValue);
      setTabStatus((prevStatus) => {
        const updatedStatus = [...prevStatus];
        updatedStatus[newTabValue] = true; // Enable the next tab
        return updatedStatus;
      });
      localStorage.setItem("activeTabPacking", JSON.stringify(newTabValue)); // Save the updated tabValue
    }
  };

  const handleBackTab = () => {
    setTabValue((prevTabValue) => Math.max(prevTabValue - 1, 0));
    localStorage.setItem(
      "activeTabPacking",
      JSON.stringify(Math.max(tabValue - 1, 0))
    ); // Save the updated tabValue
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateFields()) {
      return; // Exit if validation fails
    }

    try {
      const response = await fetch(`${REACT_APP_INTERNAL_API_PATH}/api/packing`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ ...record }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const data = await response.json();
      console.log("Batch created:", data);

      if (data && data._id) {
        localStorage.setItem("packingId", data._id);
        console.log("MixingID stored in localStorage:", data._id);
      }

      const processes = JSON.parse(localStorage.getItem("processes"));
      if (processes) {
        const currentProcessIndex = processes.indexOf("packing");
        if (
          currentProcessIndex !== -1 &&
          currentProcessIndex < processes.length - 1
        ) {
          const nextProcess = processes[currentProcessIndex + 1];
          localStorage.removeItem("activeTabPacking");

          navigate(`/${nextProcess}`);
        } else {
          console.log("No next process available.");
        }
      }
    } catch (error) {
      console.error("Error creating batch:", error);
    }
  };

  return (
    <div>
      <FormHeaderPacking />
      <h1 className="text-center mt-4">Packing</h1>

      <Box sx={{ width: "100%", borderBottom: 1, borderColor: "divider" }}>
        <Tabs
          value={tabValue}
          onChange={handleChangeTab}
          aria-label="packing tabs"
        >
          <Tab label="Line Clearance" disabled={!tabStatus[0]} />
          <Tab label="Tail Line Clearance" disabled={!tabStatus[1]} />
          <Tab
            label="Team Layout Sheet"
            disabled={!tabStatus[2]}
          />
          <Tab label="Packaging In Process Sheet" disabled={!tabStatus[3]} />
          <Tab label="Request For Analysis" disabled={!tabStatus[4]} />
          <Tab label="Reconcillation Sheet" disabled={!tabStatus[5]} />
          <Tab label="Stock Transfer Report" disabled={!tabStatus[6]} />


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
        {tabValue === 1 && (
          <div className="mt-6">
            <BatchPackingFormPage11 />
            <Button variant="contained" onClick={handlePrint} className="mt-3">
              Print Page
            </Button>
          </div>
        )}
        {tabValue === 2 && (
          <div className="mt-6">
            <BatchPackingFormPage12 />
            <Button variant="contained" onClick={handlePrint} className="mt-3">
              Print Page
            </Button>
          </div>
        )}
        {tabValue === 3 && (
          <div className="mt-6">
            <BatchPackingFormPage13 />
            <Button variant="contained" onClick={handlePrint} className="mt-3">
              Print Page
            </Button>
          </div>
        )}
        {tabValue === 4 && (
          <div className="mt-6">
            <BatchPackingFormPage14 />
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
            Save and Next
          </Button>
        )}
      </div>
    </div>
  );
};

export default Packing;
