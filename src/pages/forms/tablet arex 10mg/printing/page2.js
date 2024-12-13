import React, { useState } from "react";
import { Row, Col, Card, Form } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { setPrinting } from "../../../../store/printingSlice";
import { FormControlLabel, Radio, RadioGroup, TextField, Button } from "@mui/material";
import { Plus, Trash2 } from "lucide-react";
import { usePermissions } from "../../../../hooks/usePermissions";

const BatchPackingFormPage2 = ({ isReport }) => {
  const dispatch = useDispatch();
  const printing = useSelector((state) => state.printing);
  const [newLabels, setNewLabels] = useState({
    remnants: "",
    cleanliness: ""
  });
  const { hasPermission } = usePermissions();
  const permission = {
    canReadProduction: isReport ? true : hasPermission('production', 'read'),
    canReadQA: isReport ? true : hasPermission('qa', 'read'),
    canEditProduction: isReport ? true : hasPermission('production', 'update'),
    canEditQA: isReport ? true : hasPermission('qa', 'update')
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    // if (name in printing.batchInfo) {
    //     dispatch(setPrinting({ ...printing, batchInfo: { ...printing.batchInfo, [name]: value } }));
    if (name in printing.batchRecord) {
      dispatch(
        setPrinting({
          ...printing,
          batchRecord: { ...printing.batchRecord, [name]: value },
        })
      );
    } else if (name in printing.authorization) {
      dispatch(
        setPrinting({
          ...printing,
          authorization: { ...printing.authorization, [name]: value },
        })
      );
    } else if (name in printing.tempAndHumidity) {
      dispatch(
        setPrinting({
          ...printing,
          tempAndHumidity: { ...printing.tempAndHumidity, [name]: value },
        })
      );
    } 
  };

 
  const handleCheckboxChange = (section, label, value) => {
    dispatch(
      setPrinting({
        ...printing,
        checkboxes: {
          ...printing.checkboxes,
          [section]: {
            ...printing.checkboxes[section],
            values: {
              ...printing.checkboxes[section]?.values,
              [label]: value
            }
          }
        }
      })
    );
  };

  const handleAddLabel = (section) => {
    const newLabel = newLabels[section].trim();
    if (newLabel) {
      dispatch(
        setPrinting({
          ...printing,
          checkboxes: {
            ...printing.checkboxes,
            [section]: {
              ...printing.checkboxes[section],
              labels: [...(printing.checkboxes[section]?.labels || []), newLabel]
            }
          }
        })
      );
      setNewLabels(prev => ({
        ...prev,
        [section]: ""
      }));
    }
  };

  const handleDeleteLabel = (section, labelToDelete) => {
    const updatedLabels = printing.checkboxes[section]?.labels.filter(
      label => label !== labelToDelete
    );
    const updatedValues = { ...printing.checkboxes[section]?.values };
    delete updatedValues[labelToDelete];

    dispatch(
      setPrinting({
        ...printing,
        checkboxes: {
          ...printing.checkboxes,
          [section]: {
            ...printing.checkboxes[section],
            labels: updatedLabels,
            values: updatedValues
          }
        }
      })
    );
  };

  const renderCheckboxSection = (title, section) => {
    const canEditSection = permission.canEditQA;

    return (
      <div className="flex justify-center items-center ">
        <div className=" w-full">
          <div className="flex justify-between items-center ">
            <h5 className="text-lg font-semibold">{title}</h5>
            {canEditSection && (
              <div className="flex gap-2">
                <TextField
                  size="small"
                  value={newLabels[section]}
                  onChange={(e) => setNewLabels(prev => ({
                    ...prev,
                    [section]: e.target.value
                  }))}
                  // placeholder="Enter new label"
                  className="w-48 print-hide"
                />
                <Button
                  variant="contained"
                  onClick={() => handleAddLabel(section)}
                  className="bg-blue-500 hover:bg-blue-600 print-hide"
                  startIcon={<Plus className="w-4 h-4" />}
                >
                  Add
                </Button>
              </div>
            )}
          </div>
        
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {(printing.checkboxes[section]?.labels || []).map((label) => (
              <div key={label} className="flex flex-col items-center rounded-lg p-3 relative">
                {canEditSection && (
                  <Button
                    onClick={() => handleDeleteLabel(section, label)}
                    className="absolute top-1 right-1 text-red-500 hover:text-red-700"
                    size="small"
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                )}
                
                <h6 className=" text-center">{label}</h6>
                <RadioGroup
                  row
                  value={printing.checkboxes[section]?.values?.[label] || ""}
                  onChange={(e) => handleCheckboxChange(section, label, e.target.value)}
                  style={{ 
                    justifyContent: "center",
                    flexWrap: "nowrap" 
                  }}
                  className="print-radio-group"
                  disabled={!canEditSection}
                >
                  <FormControlLabel
                    value="satisfactory"
                    control={<Radio />}
                    label="✔️"
                    disabled={!canEditSection}
                  />
                  <FormControlLabel
                    value="unsatisfactory"
                    control={<Radio />}
                    label="❌"
                    disabled={!canEditSection}
                  />
                  <FormControlLabel
                    value="notApplicable"
                    control={<Radio />}
                    label="—"
                    disabled={!canEditSection}
                  />
                </RadioGroup>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  // Helper function to render input fields with permission-based editing
  const renderInputField = (name, value, section, isDateTime = false) => {
    const isProductionSection = [
      'date', 'lineClearance', 'department', 'section', 
      'currentProduct', 'currentProductBatchNo', 
      'previousProduct', 'previousProductBatchNo', 
      'signature'
    ].includes(name);

    const isQASection = [
      'temperature', 'humidity', 'remarks', 
      'authorizedForUse', 'dateAndTime'
    ].includes(name);

    const canEdit = 
      (isProductionSection && permission.canEditProduction) ||
      (isQASection && permission.canEditQA);

    return (
      <input
        type={isDateTime ? 'datetime-local' : 'text'}
        name={name}
        value={value || ""}
        onChange={handleInputChange}
        className="border border-gray-300 p-1"
        readOnly={!canEdit}
        disabled={!canEdit}
      />
    );
  };

  // Check if user can read either production or QA sections
  if (!(permission.canReadProduction || permission.canReadQA)) {
    return (
      <div style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh',
        fontSize: '2rem',
        fontWeight: 'bold',
        textAlign: 'center',
      }}>
        Access denied!!
      </div>
    );
  }


  return (
    <Card className="max-w-4xl mx-auto p-4 ">
    <Card.Body>
      {/* <h2 className="text-lg font-bold mb-2 text-center">FOR QUALITY ASSURANCE DEPARTMENT USE ONLY</h2> */}
      {(permission.canReadProduction && permission.canReadQA) && (
        <>
          <table className="w-full" style={{ textAlign: "center" }}>
            <tbody>
              <tr>
                <td><strong>Date & Time:</strong></td>
                <td>
                  {renderInputField('date', printing.batchRecord.date, 'production', true)}
                </td>
                <td><strong>Line Clearance Required For:</strong></td>
                <td>
                  {renderInputField('lineClearance', printing.batchRecord.lineClearance, 'production')}
                </td>
              </tr>
              <tr>
                <td><strong>Department:</strong></td>
                <td>
                  {renderInputField('department', printing.batchRecord.department, 'production')}
                </td>
                <td><strong>Section:</strong></td>
                <td>
                  {renderInputField('section', printing.batchRecord.section, 'production')}
                </td>
              </tr>
              <tr>
                <td><strong>Current Product:</strong></td>
                <td>
                  {renderInputField('currentProduct', printing.batchRecord.currentProduct, 'production')}
                </td>
                <td><strong>Current Product Batch #:</strong></td>
                <td>
                  {renderInputField('currentProductBatchNo', printing.batchRecord.currentProductBatchNo, 'production')}
                </td>
              </tr>
              <tr>
                <td><strong>Previous Product:</strong></td>
                <td>
                  {renderInputField('previousProduct', printing.batchRecord.previousProduct, 'production')}
                </td>
                <td><strong>Previous Product Batch #:</strong></td>
                <td>
                  {renderInputField('previousProductBatchNo', printing.batchRecord.previousProductBatchNo, 'production')}
                </td>
              </tr>
              <tr>
                <td><strong>Production Pharmacist:</strong></td>
                <td>
                  {renderInputField('signature', printing.batchRecord.signature, 'production')}
                </td>
              </tr>
            </tbody>
          </table>
          {renderCheckboxSection(
            "Ensure that there should be no remnants of the Previous Batch Dispensed related to the following:",
            "remnants"
          )}
      
          {renderCheckboxSection(
            "Check the cleanliness of the following:",
            "cleanliness"
          )}
      
          <h4>• Check the Temperature & Humidity of the Area:-</h4>
          <table className="w-full mb-3" style={{ textAlign: "center" }}>
            <tbody>
              <tr>
                <td><strong>Temperature:</strong></td>
                <td>
                  {renderInputField('temperature', printing.tempAndHumidity.temperature, 'qa')}
                </td>
                <td><strong>Humidity:</strong></td>
                <td>
                  {renderInputField('humidity', printing.tempAndHumidity.humidity, 'qa')}
                </td>
              </tr>
              <tr>
                <td><strong>Remarks:</strong></td>
                <td colSpan={4}>
                  <TextField
                    fullWidth
                    multiline
                    name="remarks"
                    value={printing.tempAndHumidity.remarks || ""}
                    onChange={handleInputChange}
                    InputProps={{
                      readOnly: !permission.canEditQA,
                    }}
                  />
                </td>
              </tr>

              <tr>
                <td><strong>Authorized For Use (Sign.):</strong></td>
                <td>
                  {renderInputField('authorizedForUse', printing.authorization.authorizedForUse, 'qa')}
                </td>
                <td><strong>Date & Time of Authorization:</strong></td>
                <td>
                  {renderInputField('dateAndTime', printing.authorization.dateAndTime, 'qa', true)}
                </td>
              </tr>
            </tbody>
          </table>

          <p className="text-sm text-gray-600 mt-3 text-center">
            <strong>Note:</strong> ✔️ = Satisfactory, ❌ = Unsatisfactory, — = Not
            Applicable
          </p>
        </>
      )}
    </Card.Body>
  </Card>
  );
};

export default BatchPackingFormPage2;
