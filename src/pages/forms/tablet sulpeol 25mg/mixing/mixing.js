import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Button, Tabs, Tab, Box } from "@mui/material";
import { setsMixingRecord } from "../../../../store/sulpeol/mixingSlice";
import BatchManufacturingFormPage4 from "./page4";
import BatchManufacturingFormPage5 from "./page5";
import BatchManufacturingFormPage6 from "./page6";
import BatchManufacturingFormPage7 from "./page7";
import FormHeader from "../../../header/formHeaderSulpeol";
import BatchManufacturingFormPage8 from "./page8";
import FormHeaderSulpeol from "../../../header/formHeaderSulpeol";

const MixingSulpeol = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const record = useSelector((state) => state.smixing);
  const REACT_APP_INTERNAL_API_PATH = process.env.REACT_APP_INTERNAL_API_PATH;

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
  ]); // Control which tabs are enabled

  useEffect(() => {
    const storedRecord = JSON.parse(localStorage.getItem("s-mixingRecord"));
    if (storedRecord) {
      dispatch(setsMixingRecord(storedRecord));
    }
  }, [dispatch]);

  const handleChangeTab = (event, newValue) => {
    if (tabStatus[newValue]) {
      setTabValue(newValue);
      localStorage.setItem("activeTabMixing", JSON.stringify(newValue)); // Save tabValue to localStorage
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
      mixingRemarks,
      authorization,
      manufacturingRecord,
      weightOfGranules,
      granulationYield,
      batchManufacturingYield,
      checkboxes,
      requestForAnalysisMixing,
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
          !batchRecord ||
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
    }

    return true; // All validations passed
  };

  const handleNextTab = () => {
    if (validateFields()) {
      dispatch(setsMixingRecord(record));
      const newTabValue = tabValue + 1;
      setTabValue(newTabValue);
      setTabStatus((prevStatus) => {
        const updatedStatus = [...prevStatus];
        updatedStatus[newTabValue] = true; // Enable the next tab
        return updatedStatus;
      });
      localStorage.setItem("activeTabMixing", JSON.stringify(newTabValue)); // Save the updated tabValue
    }
  };

  const handleBackTab = () => {
    setTabValue((prevTabValue) => Math.max(prevTabValue - 1, 0));
    localStorage.setItem(
      "activeTabMixing",
      JSON.stringify(Math.max(tabValue - 1, 0))
    ); // Save the updated tabValue
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateFields()) {
      return; // Exit if validation fails
    }

    try {
      const response = await fetch(`${REACT_APP_INTERNAL_API_PATH}/api/mixing`, {
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
        localStorage.setItem("s-mixingId", data._id);
        console.log("MixingID stored in localStorage:", data._id);
      }

      const processes = JSON.parse(localStorage.getItem("processes"));
      if (processes) {
        const currentProcessIndex = processes.indexOf("mixing-sulpeol");
        if (
          currentProcessIndex !== -1 &&
          currentProcessIndex < processes.length - 1
        ) {
          const nextProcess = processes[currentProcessIndex + 1];
          localStorage.removeItem("activeTabMixing");
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
      <FormHeaderSulpeol />
      <h1 className="text-center mt-4">Mixing</h1>

      <Box sx={{ width: "100%", borderBottom: 1, borderColor: "divider" }}>
        <Tabs
          value={tabValue}
          onChange={handleChangeTab}
          aria-label="smixing tabs"
        >
          <Tab label="Precautions" disabled={!tabStatus[0]} />
          <Tab label="Line Clearance" disabled={!tabStatus[1]} />
          <Tab label="Manufacturing Process" disabled={!tabStatus[2]} />
          <Tab
            label="Weight of granules/bulk & Yield"
            disabled={!tabStatus[3]}
          />
          <Tab label="Request for analysis" disabled={!tabStatus[4]} />
        </Tabs>
      </Box>

      <div>
        {tabValue === 0 && (
          <div>
            <BatchManufacturingFormPage4 />
            <Button variant="contained" onClick={handlePrint} className="mt-3">
              Print Page
            </Button>
          </div>
        )}
        {tabValue === 1 && (
          <div className="mt-6">
            <BatchManufacturingFormPage5 />
            <Button variant="contained" onClick={handlePrint} className="mt-3">
              Print Page
            </Button>
          </div>
        )}
        {tabValue === 2 && (
          <div className="mt-6">
            <BatchManufacturingFormPage6 />
            <Button variant="contained" onClick={handlePrint} className="mt-3">
              Print Page
            </Button>
          </div>
        )}
        {tabValue === 3 && (
          <div className="mt-6">
            <BatchManufacturingFormPage7 />
            <Button variant="contained" onClick={handlePrint} className="mt-3">
              Print Page
            </Button>
          </div>
        )}
        {tabValue === 4 && (
          <div className="mt-6">
            <BatchManufacturingFormPage8 />
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

        {tabValue < 4 && (
          <Button
            variant="contained"
            color="primary"
            onClick={handleNextTab}
            className="mt-4"
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

export default MixingSulpeol;
