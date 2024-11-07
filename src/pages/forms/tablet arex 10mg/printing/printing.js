import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Button, Tabs, Tab, Box } from "@mui/material";
import { setPrinting } from "../../../../store/printingSlice";
import BatchPackingFormPage1 from "./page1";
import BatchPackingFormPage2 from "./page2";
import BatchPackingFormPage3 from "./page3";
import BatchPackingFormPage4 from "./page4";
import BatchPackingFormPage5 from "./page5";
import FormHeaderPacking from "../../../header/formHeaderPacking";

const Printing = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const record = useSelector((state) => state.printing);
  const REACT_APP_INTERNAL_API_PATH = process.env.REACT_APP_INTERNAL_API_PATH;

  // Load saved tabValue from localStorage or default to 0
  const savedTabValue =
    JSON.parse(localStorage.getItem("activeTabPrinting")) || 0;
  const [tabValue, setTabValue] = React.useState(savedTabValue); // Control active tab
  const [tabStatus, setTabStatus] = React.useState([
    true,
    false,
    false,
    false,
    false,
  ]); // Control which tabs are enabled

  useEffect(() => {
    const storedRecord = JSON.parse(localStorage.getItem("printing"));
    if (storedRecord) {
      dispatch(setPrinting(storedRecord));
    }
  }, [dispatch]);

  const handleChangeTab = (event, newValue) => {
    if (tabStatus[newValue]) {
      setTabValue(newValue);
      localStorage.setItem("activeTabPrinting", JSON.stringify(newValue)); // Save tabValue to localStorage
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
      tailLineClearancePrinting,
      tailLineClearancePrinting2,
      instructions,
      checkSheet
    } = record;

    switch (tabValue) {
      case 0:
        if (
          batchQRecord.some(
            (row) =>
              !row.material ||
              !row.grnNo ||
              !row.units ||
              !row.standard ||
              !row.actual ||
              !row.return ||
              !row.vendor ||
              !row.inProcess ||
              !row.totalRejection ||
              !row.packingStoreSupervisor ||
              !row.packingSupervisor
          ),
          !batchQRecordSignAndRemarks.remarks ||
          !batchQRecordSignAndRemarks.manufacturingDate ||
          !batchQRecordSignAndRemarks.expiryDate ||
          !batchQRecordSignAndRemarks.packagingStarted ||
          !batchQRecordSignAndRemarks.packagingCompleted ||
          !batchQRecordSignAndRemarks.productionManager ||
          !batchQRecordSignAndRemarks.materialIssuedBy ||
          !batchQRecordSignAndRemarks.materialCheckedAndRecievedBy ||
          !batchQRecordSignAndRemarks.datePM ||
          !batchQRecordSignAndRemarks.dateMIB ||
          !batchQRecordSignAndRemarks.dateCARB 
        ) {
          alert(
            "Please fill out all weighing dispensing fields for raw material before proceeding."
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

      case 2: // Combined case for coating solution preparation and coating procedure
        if (
          !tailLineClearancePrinting.lineProduct ||
          !tailLineClearancePrinting.lineProductBatchNo ||
          !tailLineClearancePrinting.mfg ||
          !tailLineClearancePrinting.exp ||
          !tailLineClearancePrinting.price ||
          !tailLineClearancePrinting.date ||
          !tailLineClearancePrinting.previousProduct ||
          !tailLineClearancePrinting.previousProductBatchNo ||
          !tailLineClearancePrinting.productionSignature ||
          !tailLineClearancePrinting.qaSignature ||
          !tailLineClearancePrinting.pDate ||
          !tailLineClearancePrinting.qaDate ||
          !tailLineClearancePrinting2.lineProduct ||
          !tailLineClearancePrinting2.lineProductBatchNo ||
          !tailLineClearancePrinting2.mfg ||
          !tailLineClearancePrinting2.exp ||
          !tailLineClearancePrinting2.price ||
          !tailLineClearancePrinting2.date ||
          !tailLineClearancePrinting2.previousProduct ||
          !tailLineClearancePrinting2.previousProductBatchNo ||
          !tailLineClearancePrinting2.productionSignature ||
          !tailLineClearancePrinting2.qaSignature ||
          !tailLineClearancePrinting2.pDate ||
          !tailLineClearancePrinting2.qaDate 
        ) {
          alert("Please fill fields on this page before proceeding.");
          return false;
        }
        break;

      case 3: // Combined case for weight of coated tablets and batch manufacturing yield
        if (
          !instructions.codingOperator ||
          !instructions.codingChecker ||
          !instructions.productionOfficer 
        ) {
          alert(
            "Please fill out all required fields on this page before proceeding."
          );
          return false;
        }
        break;

      case 4:
        if (
          !checkSheet.labels.every(
            (label) =>
              label.dateAndTime &&
              label.ucOrLabel &&
              label.commPackeOrExport &&
              label.batchNo &&
              label.mfgDate &&
              label.expDate &&
              label.mrp &&
              label.checkedBy 
          ) ||
          !checkSheet.dateStarted ||
          !checkSheet.dateCompleted 
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
      dispatch(setPrinting(record));
      const newTabValue = tabValue + 1;
      setTabValue(newTabValue);
      setTabStatus((prevStatus) => {
        const updatedStatus = [...prevStatus];
        updatedStatus[newTabValue] = true; // Enable the next tab
        return updatedStatus;
      });
      localStorage.setItem("activeTabPrinting", JSON.stringify(newTabValue)); // Save the updated tabValue
    }
  };

  const handleBackTab = () => {
    setTabValue((prevTabValue) => Math.max(prevTabValue - 1, 0));
    localStorage.setItem(
      "activeTabPrinting",
      JSON.stringify(Math.max(tabValue - 1, 0))
    ); // Save the updated tabValue
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateFields()) {
      return; // Exit if validation fails
    }

    try {
      const response = await fetch(`${REACT_APP_INTERNAL_API_PATH}/api/printing`, {
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
        localStorage.setItem("printingId", data._id);
        console.log("MixingID stored in localStorage:", data._id);
      }

      const processes = JSON.parse(localStorage.getItem("processes"));
      if (processes) {
        const currentProcessIndex = processes.indexOf("printing");
        if (
          currentProcessIndex !== -1 &&
          currentProcessIndex < processes.length - 1
        ) {
          const nextProcess = processes[currentProcessIndex + 1];
          localStorage.removeItem("activeTabPrinting");

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
      <h1 className="text-center mt-4">Printing</h1>

      <Box sx={{ width: "100%", borderBottom: 1, borderColor: "divider" }}>
        <Tabs
          value={tabValue}
          onChange={handleChangeTab}
          aria-label="printing tabs"
        >
          <Tab label="Record" disabled={!tabStatus[0]} />
          <Tab label="Line Clearance" disabled={!tabStatus[1]} />
          <Tab label="Tail Line Clearance" disabled={!tabStatus[2]} />
          <Tab
            label="Instructions"
            disabled={!tabStatus[3]}
          />
          <Tab label="Check Sheet" disabled={!tabStatus[4]} />
        </Tabs>
      </Box>

      <div>
        {tabValue === 0 && (
          <div>
            <BatchPackingFormPage1 />
            <Button variant="contained" onClick={handlePrint} className="mt-3">
              Print Page
            </Button>
          </div>
        )}
        {tabValue === 1 && (
          <div className="mt-6">
            <BatchPackingFormPage2 />
            <Button variant="contained" onClick={handlePrint} className="mt-3">
              Print Page
            </Button>
          </div>
        )}
        {tabValue === 2 && (
          <div className="mt-6">
            <BatchPackingFormPage3 />
            <Button variant="contained" onClick={handlePrint} className="mt-3">
              Print Page
            </Button>
          </div>
        )}
        {tabValue === 3 && (
          <div className="mt-6">
            <BatchPackingFormPage4 />
            <Button variant="contained" onClick={handlePrint} className="mt-3">
              Print Page
            </Button>
          </div>
        )}
        {tabValue === 4 && (
          <div className="mt-6">
            <BatchPackingFormPage5 />
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

export default Printing;
