import React, { useState } from "react";
import { Row, Col, Card, Form } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { setPacking } from "../../../../store/packingSlice";
import { FormControlLabel, Radio, RadioGroup, TextField, Button } from "@mui/material";
import { Plus, Trash2 } from "lucide-react";
import { usePermissions } from "../../../../hooks/usePermissions";

const BatchPackingFormPage10 = ({ isReport }) => {
  const dispatch = useDispatch();
  const packing = useSelector((state) => state.packing);
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

    // if (name in packing.batchInfo) {
    //     dispatch(setPacking({ ...packing, batchInfo: { ...packing.batchInfo, [name]: value } }));
    if (name in packing.batchRecord) {
      dispatch(
        setPacking({
          ...packing,
          batchRecord: { ...packing.batchRecord, [name]: value },
        })
      );
    } else if (name in packing.authorization) {
      dispatch(
        setPacking({
          ...packing,
          authorization: { ...packing.authorization, [name]: value },
        })
      );
    } else if (name in packing.tempAndHumidity) {
      dispatch(
        setPacking({
          ...packing,
          tempAndHumidity: { ...packing.tempAndHumidity, [name]: value },
        })
      );
    } 
  };

 
  const handleCheckboxChange = (section, label, value) => {
    dispatch(
      setPacking({
        ...packing,
        checkboxes: {
          ...packing.checkboxes,
          [section]: {
            ...packing.checkboxes[section],
            values: {
              ...packing.checkboxes[section]?.values,
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
        setPacking({
          ...packing,
          checkboxes: {
            ...packing.checkboxes,
            [section]: {
              ...packing.checkboxes[section],
              labels: [...(packing.checkboxes[section]?.labels || []), newLabel]
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
    const updatedLabels = packing.checkboxes[section]?.labels.filter(
      label => label !== labelToDelete
    );
    const updatedValues = { ...packing.checkboxes[section]?.values };
    delete updatedValues[labelToDelete];

    dispatch(
      setPacking({
        ...packing,
        checkboxes: {
          ...packing.checkboxes,
          [section]: {
            ...packing.checkboxes[section],
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
        <div className="mt-6 w-full">
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
            {(packing.checkboxes[section]?.labels || []).map((label) => (
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
                  value={packing.checkboxes[section]?.values?.[label] || ""}
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
      'previousProduct', 'previousProductBatchNo', 'lineNo',
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
                  {renderInputField('date', packing.batchRecord.date, 'production', true)}
                </td>
                <td><strong>Line Clearance Required For:</strong></td>
                <td>
                  {renderInputField('lineClearance', packing.batchRecord.lineClearance, 'production')}
                </td>
              </tr>
              <tr>
                <td><strong>Department:</strong></td>
                <td>
                  {renderInputField('department', packing.batchRecord.department, 'production')}
                </td>
                <td><strong>Section:</strong></td>
                <td>
                  {renderInputField('section', packing.batchRecord.section, 'production')}
                </td>
              </tr>
              <tr>
                <td><strong>Current Product:</strong></td>
                <td>
                  {renderInputField('currentProduct', packing.batchRecord.currentProduct, 'production')}
                </td>
                <td><strong>Current Product Batch #:</strong></td>
                <td>
                  {renderInputField('currentProductBatchNo', packing.batchRecord.currentProductBatchNo, 'production')}
                </td>
              </tr>
              <tr>
                <td><strong>Previous Product:</strong></td>
                <td>
                  {renderInputField('previousProduct', packing.batchRecord.previousProduct, 'production')}
                </td>
                <td><strong>Previous Product Batch #:</strong></td>
                <td>
                  {renderInputField('previousProductBatchNo', packing.batchRecord.previousProductBatchNo, 'production')}
                </td>
              </tr>
                <tr>
                <td><strong>Line Number:</strong></td>
                <td>
                  {renderInputField('lineNo', packing.batchRecord.lineNo, 'production')}
                </td>
                <td><strong>Signature:</strong></td>
                <td>
                  {renderInputField('signature', packing.batchRecord.signature, 'production')}
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
          <table className="w-full mb-4" style={{ textAlign: "center" }}>
            <tbody>
              <tr>
                <td><strong>Temperature:</strong></td>
                <td>
                  {renderInputField('temperature', packing.tempAndHumidity.temperature, 'qa')}
                </td>
                <td><strong>Humidity:</strong></td>
                <td>
                  {renderInputField('humidity', packing.tempAndHumidity.humidity, 'qa')}
                </td>
              </tr>
              <tr>
                <td><strong>Remarks:</strong></td>
                <td colSpan={4}>
                  <TextField
                    fullWidth
                    multiline
                    name="remarks"
                    value={packing.tempAndHumidity.remarks || ""}
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
                  {renderInputField('authorizedForUse', packing.authorization.authorizedForUse, 'qa')}
                </td>
                <td><strong>Date & Time of Authorization:</strong></td>
                <td>
                  {renderInputField('dateAndTime', packing.authorization.dateAndTime, 'qa', true)}
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

export default BatchPackingFormPage10;
