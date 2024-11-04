import React, { useEffect } from "react";
import { Tabs, Tab, Box, Button } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import BatchManufacturingFormPage1 from "./page1";
import BatchManufacturingFormPage2 from "./page2";
// import { setscDispensing } from "../../../../store/sulpeol/scdispensingSlice";
import { setscDispensing } from "../../../../store/sidikcream/dispensingSlice";
import FormHeaderCream from "../../../header/formHeaderCream";

const DispensingCream = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const scdispensing = useSelector((state) => state.scdispensing);

  // Load saved tabValue from localStorage or default to 0
  const savedTabValue =
    JSON.parse(localStorage.getItem("activeTabDispensing")) || 0;
  const [tabValue, setTabValue] = React.useState(savedTabValue); // For controlling the active tab
  const [tabStatus, setTabStatus] = React.useState([true, false, false]); // Manage enabled/disabled state of tabs

  useEffect(() => {
    const storedRecord = JSON.parse(localStorage.getItem("sc-dispensing"));
    if (storedRecord) {
      dispatch(setscDispensing(storedRecord));
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
    } = scdispensing;

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
        !checkboxes.cartons ||
        !checkboxes.documents ||
        !checkboxes.rawMaterial ||
        !checkboxes.remnantOfPreviousProduct ||
        !checkboxes.area ||
        !checkboxes.weighingBalance ||
        !checkboxes.dispensingBoard ||
        !checkboxes.scoops ||
        !checkboxes.pallets ||
        !tempAndHumidity.temperature ||
        !tempAndHumidity.humidity ||
        !authorization.authorizedForUse ||
        !authorization.dateAndTime ||
        !remarks
      ) {
        alert(
          "Please fill out all required fields on Page 1 before proceeding."
        );
        return false;
      }
    } else if (tabValue === 1) {
      // Page 2
      // Check if any weighing scdispensing fields are missing (Raw)
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
          "Please fill out all weighing scdispensing fields for raw material before proceeding."
        );
        return false;
      }

      // Validate check scdispensings (Raw)
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
          "Please fill out all check scdispensing fields for raw material before proceeding."
        );
        return false;
      }
    } 

    return true; // All validations passed
  };

  const handleNextTab = () => {
    if (validateFields()) {
      dispatch(setscDispensing(scdispensing));
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
      const response = await fetch("http://localhost:5000/api/dispensing", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ ...scdispensing }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const data = await response.json();
      console.log("Dispensing created:", data);

      if (data && data._id) {
        localStorage.setItem("sc-dispensingId", data._id);
        console.log("Dispensing ID stored in localStorage:", data._id);
      }

      const processes = JSON.parse(localStorage.getItem("processes"));
      if (processes) {
        const currentProcessIndex = processes.indexOf("dispensing-cream");
        if (
          currentProcessIndex !== -1 &&
          currentProcessIndex < processes.length - 1
        ) {
          const nextProcess = processes[currentProcessIndex + 1];
          // Remove 'activeTabDispensing' from local storage before navigating
          localStorage.removeItem("activeTabDispensing");
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
      <h1 className="text-center mt-4">Dispensing</h1>

      <Box sx={{ width: "100%", borderBottom: 1, borderColor: "divider" }}>
        <Tabs
          value={tabValue}
          onChange={handleChangeTab}
          aria-label="scdispensing tabs"
        >
          <Tab label="Line Clearance" disabled={!tabStatus[0]} />
          <Tab
            label="Weighing Record "
            disabled={!tabStatus[1]}
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

        {tabValue < 1 && (
          <Button
            variant="contained"
            color="primary"
            onClick={handleNextTab}
            className="mt-4"
          >
            Next
          </Button>
        )}

        {tabValue === 1 && (
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

export default DispensingCream;
