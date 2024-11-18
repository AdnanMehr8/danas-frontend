import React, { useEffect } from "react";
import { Tabs, Tab, Box, Button } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import BatchManufacturingFormPage1 from "./page1";
import BatchManufacturingFormPage2 from "./page2";
import BatchManufacturingFormPage3 from "./page3";
import { setDispensing } from "../../../../store/dispensingSlice";
import FormHeader from "../../../header/formHeader";
import ProcessBox from "../coated/Coated";

const Dispensing = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const dispensing = useSelector((state) => state.dispensing);
  const REACT_APP_INTERNAL_API_PATH = process.env.REACT_APP_INTERNAL_API_PATH;
  const processes = JSON.parse(localStorage.getItem("processes"));
  const batchInfo = useSelector((state) => state.batchInfo.batch);

  // Load saved tabValue from localStorage or default to 0
  const savedTabValue =
    JSON.parse(localStorage.getItem("activeTabDispensing")) || 0;
  const [tabValue, setTabValue] = React.useState(savedTabValue); // For controlling the active tab
  const [tabStatus, setTabStatus] = React.useState([true, false, false]); // Manage enabled/disabled state of tabs

  useEffect(() => {
    const storedRecord = JSON.parse(localStorage.getItem("dispensing"));
    if (storedRecord) {
      dispatch(setDispensing(storedRecord));
    }
  }, [dispatch]);

  // Save the active tab value to localStorage whenever it changes
  const handleChangeTab = (event, newValue) => {
    if (tabStatus[newValue]) {
      setTabValue(newValue);
      localStorage.setItem("activeTabDispensing", JSON.stringify(newValue)); // Save tabValue to localStorage
    }
  };

  const handlePrint = () => {
    window.print(); // This triggers the browser print dialog
  };

  const validateFields = () => {
    const {
      batchRecord,
      checkboxes,
      tempAndHumidity,
      authorization,
      remarks,
      weighingRecordRaw,
      checkRecordRaw,
      weighingRecordCoating,
      checkRecordCoating,
    } = dispensing;

    if (tabValue === 0) {
      // Page 1
      // Validate required fields for batchRecord
      if (
        !batchRecord.date ||
        !batchRecord.lineClearance ||
        !batchRecord.department ||
        !batchRecord.section ||
        !batchRecord.currentProduct ||
        !batchRecord.currentProductBatchNo ||
        !batchRecord.previousProduct ||
        !batchRecord.previousProductBatchNo ||
        !batchRecord.signature ||
        !checkboxes ||
        !tempAndHumidity.temperature ||
        !tempAndHumidity.humidity ||
        !authorization.authorizedForUse ||
        !authorization.dateAndTime ||
        !tempAndHumidity.remarks
      ) {
        alert(
          "Please fill out all required fields on Page 1 before proceeding."
        );
        return false;
      }
    } else if (tabValue === 1) {
      // Page 2
      // Check if any weighing dispensing fields are missing (Raw)
      if (
        weighingRecordRaw.some(
          (row) =>
            !row.item ||
            !row.unit ||
            !row.tareWt ||
            !row.netWt ||
            !row.grossWt ||
            !row.noOfContainers
        )
      ) {
        alert(
          "Please fill out all weighing dispensing fields for raw material before proceeding."
        );
        return false;
      }

      // Validate check dispensings (Raw)
      if (
        !checkRecordRaw.checkedByDispensingPharmacist ||
        !checkRecordRaw.dateDP ||
        !checkRecordRaw.checkedByQAOfficer ||
        !checkRecordRaw.dateQA ||
        !checkRecordRaw.receivedByProductionPharmacist ||
        !checkRecordRaw.datePP ||
        !checkRecordRaw.dateS ||
        !checkRecordRaw.receivedBySupervisor
      ) {
        alert(
          "Please fill out all check dispensing fields for raw material before proceeding."
        );
        return false;
      }
    } else if (tabValue === 2) {
      // Page 3
      // Check if any weighing dispensing fields are missing (Coating)
      if (
        weighingRecordCoating.some(
          (row) =>
            !row.item ||
            !row.unit ||
            !row.tareWt ||
            !row.netWt ||
            !row.grossWt ||
            !row.noOfContainers
        )
      ) {
        alert(
          "Please fill out all weighing dispensing fields for coating material before proceeding."
        );
        return false;
      }

      // Validate check dispensings (Coating)
      if (
        !checkRecordCoating.checkedByDispensingPharmacist ||
        !checkRecordCoating.checkedByQAOfficer ||
        !checkRecordCoating.receivedByProductionPharmacist ||
        !checkRecordCoating.receivedBySupervisor ||
        !checkRecordCoating.dateDP ||
        !checkRecordCoating.dateQA ||
        !checkRecordCoating.datePP ||
        !checkRecordCoating.dateS
      ) {
        alert(
          "Please fill out all check dispensing fields for coating material before proceeding."
        );
        return false;
      }
    }

    return true; // All validations passed
  };

  const handleNextTab = () => {
    if (validateFields()) {
      dispatch(setDispensing(dispensing));
      const newTabValue = tabValue + 1;
      setTabValue(newTabValue);
      setTabStatus((prevStatus) => {
        const updatedStatus = [...prevStatus];
        updatedStatus[newTabValue] = true; // Enable the next tab
        return updatedStatus;
      });
      localStorage.setItem("activeTabDispensing", JSON.stringify(newTabValue)); // Save the updated tabValue
    }
  };

  const handleBackTab = () => {
    setTabValue((prevTabValue) => Math.max(prevTabValue - 1, 0)); // Min is 0 (first tab)
    localStorage.setItem(
      "activeTabDispensing",
      JSON.stringify(Math.max(tabValue - 1, 0))
    ); // Save the updated tabValue
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Call the validation before submitting
    if (!validateFields()) {
      return; // Exit if validation fails
    }

    try {
      const response = await fetch(`${REACT_APP_INTERNAL_API_PATH}/api/dispensing`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ ...dispensing }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const data = await response.json();
      console.log("Dispensing created:", data);

      if (data && data._id) {
        localStorage.setItem("dispensingId", data._id);
        console.log("Dispensing ID stored in localStorage:", data._id);
      }

      const processes = JSON.parse(localStorage.getItem("processes"));
      const currentIndex = processes.findIndex(
        process => process.name.toLowerCase() === 'dispensing'
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
        localStorage.removeItem("activeTabDispensing");
        navigate(`/${nextRoute}`);
      } else {
        console.log("No next process available.");
      }
    } catch (error) {
      console.error("Error creating batch:", error);
    }
  }

  return (
    <div>
      <ProcessBox processes={processes} />

      <FormHeader />
      <h1 className="text-center mt-4">Dispensing</h1>

      <Box sx={{ width: "100%", borderBottom: 1, borderColor: "divider" }}>
        <Tabs
          value={tabValue}
          onChange={handleChangeTab}
          aria-label="dispensing tabs"
        >
          <Tab label="Line Clearance" disabled={!tabStatus[0]} />
          <Tab
            label="Weighing Record (Raw Material)"
            disabled={!tabStatus[1]}
          />
          <Tab
            label="Weighing Record (Coating Material)"
            disabled={!tabStatus[2]}
          />
        </Tabs>
      </Box>

      <div>
        {tabValue === 0 && (
          <div>
            <BatchManufacturingFormPage1 />
            <Button variant="contained" onClick={handlePrint} className="mt-3">
              Print Page
            </Button>
          </div>
        )}
        {tabValue === 1 && (
          <div className="mt-6">
            <BatchManufacturingFormPage2 />
            <Button variant="contained" onClick={handlePrint} className="mt-3">
              Print Page
            </Button>
          </div>
        )}
        {tabValue === 2 && (
          <div className="mt-6">
            <BatchManufacturingFormPage3 />
            <Button variant="contained" onClick={handlePrint} className="mt-3">
              Print Page
            </Button>
          </div>
        )}
      </div>

      <div className="mt-6 flex justify-between">
        {tabValue > 0 && (
          <Button
            variant="contained"
            color="primary"
            onClick={handleBackTab}
            style={{ display: "flex", justifyContent: "space-between" }}
          >
            Back
          </Button>
        )}

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
          <Button
            variant="contained"
            color="primary"
            onClick={handleSubmit}
            className="mt-4"
          >
            Save and Next
          </Button>
        )}
      </div>
    </div>
  );
};

export default Dispensing;
