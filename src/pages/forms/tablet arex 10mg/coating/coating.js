import React, { useEffect } from "react";
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

const Coating = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const record = useSelector((state) => state.coating);

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
  ]); // Manage tab enabled/disabled

  useEffect(() => {
    const storedRecord = JSON.parse(localStorage.getItem("coatingRecord"));
    if (storedRecord) {
      dispatch(setCoatingRecord(storedRecord));
    }
  }, [dispatch]);

  const handleChangeTab = (event, newValue) => {
    if (tabStatus[newValue]) {
      setTabValue(newValue);
      localStorage.setItem("activeTabCoating", JSON.stringify(newValue)); // Save tabValue to localStorage
    }
  };

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
          !checkboxes.documents ||
          !checkboxes.tabletsCoatingMaterial ||
          !checkboxes.remnantOfPreviousProduct ||
          !checkboxes.area ||
          !checkboxes.coatingMachine ||
          !checkboxes.containerOrDrums ||
          !checkboxes.scoops ||
          !checkboxes.pallets ||
          !tempAndHumidity.temperature ||
          !tempAndHumidity.humidity ||
          !coatingRemarks ||
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
    }

    return true; // All validations passed
  };

  const handleNextTab = () => {
    if (validateFields()) {
      dispatch(setCoatingRecord(record));
      const newTabValue = tabValue + 1;
      setTabValue(newTabValue);
      setTabStatus((prevStatus) => {
        const updatedStatus = [...prevStatus];
        updatedStatus[newTabValue] = true; // Enable the next tab
        return updatedStatus;
      });
      localStorage.setItem("activeTabCoating", JSON.stringify(newTabValue)); // Save the updated tabValue
    }
  };

  const handleBackTab = () => {
    setTabValue((prevTabValue) => Math.max(prevTabValue - 1, 0)); // Min is 0 (first tab)
    localStorage.setItem(
      "activeTabCoating",
      JSON.stringify(Math.max(tabValue - 1, 0))
    ); // Save the updated tabValue
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Perform final validation before submitting
    if (!validateFields()) {
      return;
    }

    console.log("Record data to be sent:", record);

    try {
      const response = await fetch("http://localhost:5000/api/coating", {
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
        localStorage.setItem("coatingId", data._id);
        console.log("Coating ID stored in localStorage:", data._id);
      }

      const processes = JSON.parse(localStorage.getItem("processes"));
      if (processes) {
        const currentProcessIndex = processes.indexOf("coating");
        if (
          currentProcessIndex !== -1 &&
          currentProcessIndex < processes.length - 1
        ) {
          const nextProcess = processes[currentProcessIndex + 1];
          localStorage.removeItem("activeTabCoating");
          localStorage.removeItem("coatingRecord");

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
      <FormHeader />
      <h1 className="text-center mt-4">Coating</h1>

      <Box sx={{ width: "100%", borderBottom: 1, borderColor: "divider" }}>
        <Tabs
          value={tabValue}
          onChange={handleChangeTab}
          aria-label="coating tabs"
        >
          <Tab label="Precautions" disabled={!tabStatus[0]} />
          <Tab label="Line clearance" disabled={!tabStatus[1]} />
          <Tab
            label="Solution Preparation & Procedure"
            disabled={!tabStatus[2]}
          />
          <Tab label="weight & Yield" disabled={!tabStatus[3]} />
          <Tab label="Request for analysis" disabled={!tabStatus[4]} />
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

        {tabValue < 4 && (
          <Button
            variant="contained"
            color="primary"
            onClick={handleNextTab}
            className="mt-3"
          >
            Next
          </Button>
        )}

        {tabValue === 4 && (
          <Button variant="contained" color="primary" onClick={handleSubmit}>
            Save and Next
          </Button>
        )}
      </div>
    </div>
  );
};

export default Coating;
