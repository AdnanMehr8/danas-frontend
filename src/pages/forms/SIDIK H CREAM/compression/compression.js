import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Button, Tabs, Tab, Box } from "@mui/material";
import { setscCompressionRecord } from "../../../../store/sidikcream/compressionSlice";

import BatchManufacturingFormPage9 from "./page9";
import BatchManufacturingFormPage10 from "./page10";
import BatchManufacturingFormPage11 from "./page11";
import BatchManufacturingFormPage15 from "./page15";
import BatchManufacturingFormPage17 from "./page17";
import BatchManufacturingFormPage18 from "./page18";
import FormHeaderCream from "../../../header/formHeaderCream";

const CompressionCream = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const record = useSelector((state) => state.sccompression);

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
  ]);

  useEffect(() => {
    const storedRecord = JSON.parse(localStorage.getItem("sc-compressionRecord"));
    if (storedRecord) {
      dispatch(setscCompressionRecord(storedRecord));
    }
  }, [dispatch]);

  const handleChangeTab = (event, newValue) => {
    if (tabStatus[newValue]) {
      setTabValue(newValue);
      localStorage.setItem("activeTabCompression", JSON.stringify(newValue)); // Save tabValue to localStorage
    }
  };

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
      checkSheet,
      weightOfCompressedTablets,
      compressionYield,
      requestForAnalysisEnd,
      checkboxes,
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
          !checkboxes.pallets ||
          !checkboxes.documents ||
          !checkboxes.tubesOrBottles ||
          !checkboxes.remnantOfPreviousProduct ||
          !checkboxes.area ||
          !checkboxes.fullingMachine ||
          !checkboxes.containers ||
          !checkboxes.jugs ||
          !tempAndHumidity.temperature ||
          !tempAndHumidity.humidity ||
          !compressionRemarks ||
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
          ) ||
          !compressionRecord.batchNumber ||
          !compressionRecord.expiryDate ||
          !compressionRecord.fillingStartedAt ||
          !compressionRecord.fillingCompletedOn ||
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

      case 4:
        if (
          // Check for sccompressionYieldd
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

      case 5:
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
    }

    return true; // All validations passed
  };

  const handleNextTab = () => {
    if (validateFields()) {
      dispatch(setscCompressionRecord(record));
      const newTabValue = tabValue + 1;
      setTabValue(newTabValue);
      setTabStatus((prevStatus) => {
        const updatedStatus = [...prevStatus];
        updatedStatus[newTabValue] = true; // Enable the next tab
        return updatedStatus;
      });
      localStorage.setItem("activeTabCompression", JSON.stringify(newTabValue)); // Save the updated tabValue
    }
  };

  const handleBackTab = () => {
    setTabValue((prevTabValue) => Math.max(prevTabValue - 1, 0));
    localStorage.setItem(
      "activeTabCompression",
      JSON.stringify(Math.max(tabValue - 1, 0))
    ); // Save the updated tabValue
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateFields()) {
      return;
    }

    try {
      const response = await fetch("http://localhost:5000/api/compression", {
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
        localStorage.setItem("sc-compressionID", data._id);
        console.log("Compression ID stored in localStorage:", data._id);
      }

      const processes = JSON.parse(localStorage.getItem("processes"));
      if (processes) {
        const currentProcessIndex = processes.indexOf("compression-cream");
        if (
          currentProcessIndex !== -1 &&
          currentProcessIndex < processes.length - 1
        ) {
          const nextProcess = processes[currentProcessIndex + 1];
          localStorage.removeItem("activeTabCompression");
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
      <FormHeaderCream />
      <h1 className="text-center mt-4">Compression</h1>

      <Box sx={{ width: "100%", borderBottom: 1, borderColor: "divider" }}>
        <Tabs
          value={tabValue}
          onChange={handleChangeTab}
          aria-label="sccompression tabs"
        >
          <Tab label="Precautions" disabled={!tabStatus[0]} />
          <Tab label="Line Clearance" disabled={!tabStatus[1]} />
          <Tab label="Compression Process" disabled={!tabStatus[2]} />
          {/* <Tab label="Request for analysis" disabled={!tabStatus[3]} /> */}
          {/* <Tab label="Compression specifications" disabled={!tabStatus[4]} /> */}
          {/* <Tab label="Follow up" disabled={!tabStatus[5]} /> */}
          <Tab label="Check-sheet" disabled={!tabStatus[3]} />
          <Tab label="Yield" disabled={!tabStatus[4]} />
          <Tab label="Request for analysis" disabled={!tabStatus[5]} />
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
        {/* {tabValue === 3 && (
          <div>
            <BatchManufacturingFormPage12 />
            <Button variant="contained" onClick={handlePrint} className="mt-3">
              Print Page
            </Button>
          </div>
        )} */}
        {/* {tabValue === 4 && (
          <div>
            <BatchManufacturingFormPage13 />
            <Button variant="contained" onClick={handlePrint} className="mt-3">
              Print Page
            </Button>
          </div>
        )} */}
        {/* {tabValue === 5 && (
          <div>
            <BatchManufacturingFormPage14 />
            <Button variant="contained" onClick={handlePrint} className="mt-3">
              Print Page
            </Button>
          </div>
        )} */}
        {tabValue === 3 && (
          <div>
            <BatchManufacturingFormPage15 />
            <Button variant="contained" onClick={handlePrint} className="mt-3">
              Print Page
            </Button>
          </div>
        )}
        {tabValue === 4 && (
          <div>
            <BatchManufacturingFormPage17 />
            <Button variant="contained" onClick={handlePrint} className="mt-3">
              Print Page
            </Button>
          </div>
        )}
        {tabValue === 5 && (
          <div>
            <BatchManufacturingFormPage18 />
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
            Save and Next
          </Button>
        )}
      </div>
    </div>
  );
};

export default CompressionCream;
