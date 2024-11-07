import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Button, Tabs, Tab, Box } from "@mui/material";
import { setBlistering } from "../../../../store/blisteringSlice";
import FormHeaderPacking from "../../../header/formHeaderPacking";
import BatchPackingFormPage6 from "./page6";
import BatchPackingFormPage7 from "./page7";
import BatchPackingFormPage8 from "./page8";
import BatchPackingFormPage9 from "./page9";

const Blistering = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const record = useSelector((state) => state.blistering);
  const REACT_APP_INTERNAL_API_PATH = process.env.REACT_APP_INTERNAL_API_PATH;

  // Load saved tabValue from localStorage or default to 0
  const savedTabValue =
    JSON.parse(localStorage.getItem("activeTabBlistering")) || 0;
  const [tabValue, setTabValue] = React.useState(savedTabValue); // Control active tab
  const [tabStatus, setTabStatus] = React.useState([
    true,
    false,
    false,
    false,
  ]); // Control which tabs are enabled

  useEffect(() => {
    const storedRecord = JSON.parse(localStorage.getItem("blistering"));
    if (storedRecord) {
      dispatch(setBlistering(storedRecord));
    }
  }, [dispatch]);

  const handleChangeTab = (event, newValue) => {
    if (tabStatus[newValue]) {
      setTabValue(newValue);
      localStorage.setItem("activeTabBlistering", JSON.stringify(newValue)); // Save tabValue to localStorage
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
    if (validateFields()) {
      dispatch(setBlistering(record));
      const newTabValue = tabValue + 1;
      setTabValue(newTabValue);
      setTabStatus((prevStatus) => {
        const updatedStatus = [...prevStatus];
        updatedStatus[newTabValue] = true; // Enable the next tab
        return updatedStatus;
      });
      localStorage.setItem("activeTabBlistering", JSON.stringify(newTabValue)); // Save the updated tabValue
    }
  };

  const handleBackTab = () => {
    setTabValue((prevTabValue) => Math.max(prevTabValue - 1, 0));
    localStorage.setItem(
      "activeTabBlistering",
      JSON.stringify(Math.max(tabValue - 1, 0))
    ); // Save the updated tabValue
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateFields()) {
      return; // Exit if validation fails
    }

    try {
      const response = await fetch(`${REACT_APP_INTERNAL_API_PATH}/api/blistering`, {
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
        localStorage.setItem("blisteringId", data._id);
        console.log("MixingID stored in localStorage:", data._id);
      }

      const processes = JSON.parse(localStorage.getItem("processes"));
      if (processes) {
        const currentProcessIndex = processes.indexOf("blistering");
        if (
          currentProcessIndex !== -1 &&
          currentProcessIndex < processes.length - 1
        ) {
          const nextProcess = processes[currentProcessIndex + 1];
          localStorage.removeItem("activeTabBlistering");

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
      <h1 className="text-center mt-4">Blistering</h1>

      <Box sx={{ width: "100%", borderBottom: 1, borderColor: "divider" }}>
        <Tabs
          value={tabValue}
          onChange={handleChangeTab}
          aria-label="blistering tabs"
        >
          <Tab label="Line Clearance" disabled={!tabStatus[0]} />
          <Tab label="Tail Line Clearance" disabled={!tabStatus[1]} />
          <Tab
            label="Instructions"
            disabled={!tabStatus[2]}
          />
          <Tab label="Check Sheet" disabled={!tabStatus[3]} />
        </Tabs>
      </Box>

      <div>
        {tabValue === 0 && (
          <div>
            <BatchPackingFormPage6 />
            <Button variant="contained" onClick={handlePrint} className="mt-3">
              Print Page
            </Button>
          </div>
        )}
        {tabValue === 1 && (
          <div className="mt-6">
            <BatchPackingFormPage7 />
            <Button variant="contained" onClick={handlePrint} className="mt-3">
              Print Page
            </Button>
          </div>
        )}
        {tabValue === 2 && (
          <div className="mt-6">
            <BatchPackingFormPage8 />
            <Button variant="contained" onClick={handlePrint} className="mt-3">
              Print Page
            </Button>
          </div>
        )}
        {tabValue === 3 && (
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

        {tabValue < 3 && (
          <Button
            variant="contained"
            color="primary"
            onClick={handleNextTab}
            className="mt-4"
          >
            Next
          </Button>
        )}

        {tabValue === 3 && (
          <Button variant="contained" color="primary" onClick={handleSubmit}>
            Save and Next
          </Button>
        )}
      </div>
    </div>
  );
};

export default Blistering;
