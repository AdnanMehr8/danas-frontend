import React, { useState } from 'react';
import { Row, Col, Card, Form } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { setCoatingRecord } from '../../../../store/coatingSlice';
import { FormControlLabel, Button, Radio, RadioGroup, TextField } from '@mui/material';
import { Plus, Trash2 } from "lucide-react";

const BatchManufacturingFormPage20 = () => {
    const dispatch = useDispatch();
    const coating = useSelector((state) => state.coating);
    const [newLabels, setNewLabels] = useState({
        remnants: "",
        cleanliness: ""
      });
    const handleInputChange = (e) => {
        
        // if (name in coating.batchInfo) {
            //     dispatch(setCoatingRecord({ ...coating, batchInfo: { ...coating.batchInfo, [name]: value } }));
            const { name, value } = e.target;
         if (name in coating.batchRecord) {
            dispatch(setCoatingRecord({ ...coating, batchRecord: { ...coating.batchRecord, [name]: value } }));
        } else if (name in coating.authorization) {
            dispatch(setCoatingRecord({ ...coating, authorization: { ...coating.authorization, [name]: value } }));
        } else if (name in coating.tempAndHumidity) {
            dispatch(setCoatingRecord({ ...coating, tempAndHumidity: { ...coating.tempAndHumidity, [name]: value } }));
        } 
    };

    const handleCheckboxChange = (section, label, value) => {
        dispatch(
          setCoatingRecord({
            ...coating,
            checkboxes: {
              ...coating.checkboxes,
              [section]: {
                ...coating.checkboxes[section],
                values: {
                  ...coating.checkboxes[section]?.values,
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
            setCoatingRecord({
              ...coating,
              checkboxes: {
                ...coating.checkboxes,
                [section]: {
                  ...coating.checkboxes[section],
                  labels: [...(coating.checkboxes[section]?.labels || []), newLabel]
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
        const updatedLabels = coating.checkboxes[section]?.labels.filter(
          label => label !== labelToDelete
        );
        const updatedValues = { ...coating.checkboxes[section]?.values };
        delete updatedValues[labelToDelete];
    
        dispatch(
          setCoatingRecord({
            ...coating,
            checkboxes: {
              ...coating.checkboxes,
              [section]: {
                ...coating.checkboxes[section],
                labels: updatedLabels,
                values: updatedValues
              }
            }
          })
        );
      };
    
      const renderCheckboxSection = (title, section) => (
        <div className="flex justify-center items-center mb-4">
          <div className="mt-6 w-full">
            <div className="flex justify-between items-center mb-4">
              <h5 className="text-lg font-semibold">{title}</h5>
              <div className="flex gap-2">
                <TextField
                  size="small"
                  value={newLabels[section]}
                  onChange={(e) => setNewLabels(prev => ({
                    ...prev,
                    [section]: e.target.value
                  }))}
                  placeholder="Enter new label"
                  className="w-48"
                />
                <Button
                  variant="contained"
                  onClick={() => handleAddLabel(section)}
                  className="bg-blue-500 hover:bg-blue-600"
                  startIcon={<Plus className="w-4 h-4" />}
                >
                  Add
                </Button>
              </div>
            </div>
            
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {(coating.checkboxes[section]?.labels || []).map((label) => (
                <div key={label} className="flex flex-col items-center border rounded-lg p-3 relative">
                  <Button
                    onClick={() => handleDeleteLabel(section, label)}
                    className="absolute top-1 right-1 text-red-500 hover:text-red-700"
                    size="small"
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                  <h6 className="mb-2 text-center">{label}</h6>
                  <RadioGroup
                    row
                    value={coating.checkboxes[section]?.values?.[label] || ""}
                    onChange={(e) => handleCheckboxChange(section, label, e.target.value)}
                    style={{ justifyContent: "center" }}

                  >
                    <FormControlLabel
                      value="satisfactory"
                      control={<Radio />}
                      label="✔️"
                    />
                    <FormControlLabel
                      value="unsatisfactory"
                      control={<Radio />}
                      label="❌"
                    />
                    <FormControlLabel
                      value="notApplicable"
                      control={<Radio />}
                      label="—"
                    />
                  </RadioGroup>
                </div>
              ))}
            </div>
          </div>
        </div>
      );

    return (
        <Card className="max-w-4xl mx-auto p-4 ">
            <Card.Body>
                {/* <h2 className="text-lg font-bold mb-2 text-center">FOR QUALITY ASSURANCE DEPARTMENT USE ONLY</h2> */}
                
                <table className="w-full mb-4" style={{ textAlign: 'center' }}>
                    <tbody>
                        <tr>
                            <td><strong>Date & Time:</strong></td>
                            <td>
                                <input 
                                    type="datetime-local"
                                    name="date"
                                    value={coating.batchRecord.date || ''}
                                    onChange={handleInputChange}
                                    className="border border-gray-300 p-1"
                                />
                            </td>
                            <td><strong>Line Clearance Required For:</strong></td>
                            <td>
                                <input 
                                    type="text"
                                    name="lineClearance"
                                    value={coating.batchRecord.lineClearance || ''}
                                    onChange={handleInputChange}
                                    className="border border-gray-300 p-1"
                                />
                            </td>
                        </tr>
                        <tr>
                            <td><strong>Department:</strong></td>
                            <td>
                                <input 
                                    type="text"
                                    name="department"
                                    value={coating.batchRecord.department || ''}
                                    onChange={handleInputChange}
                                    className="border border-gray-300 p-1"
                                />
                            </td>
                            <td><strong>Section:</strong></td>
                            <td>
                                <input 
                                    type="text"
                                    name="section"
                                    value={coating.batchRecord.section || ''}
                                    onChange={handleInputChange}
                                    className="border border-gray-300 p-1"
                                />
                            </td>
                        </tr>
                        <tr>
                            <td><strong>Current Product:</strong></td>
                            <td>
                                <input 
                                    type="text"
                                    name="currentProduct"
                                    value={coating.batchRecord.currentProduct || ''}
                                    onChange={handleInputChange}
                                    className="border border-gray-300 p-1"
                                />
                            </td>
                            <td><strong>Current Product Batch #:</strong></td>
                            <td>
                                <input 
                                    type="text"
                                    name="currentProductBatchNo"
                                    value={coating.batchRecord.currentProductBatchNo || ''}
                                    onChange={handleInputChange}
                                    className="border border-gray-300 p-1"
                                />
                            </td>
                        </tr>
                        <tr>
                            <td><strong>Previous Product:</strong></td>
                            <td>
                                <input 
                                    type="text"
                                    name="previousProduct"
                                    value={coating.batchRecord.previousProduct || ''}
                                    onChange={handleInputChange}
                                    className="border border-gray-300 p-1"
                                />
                            </td>
                            <td><strong>Previous Product Batch #:</strong></td>
                            <td>
                                <input 
                                    type="text"
                                    name="previousProductBatchNo"
                                    value={coating.batchRecord.previousProductBatchNo || ''}
                                    onChange={handleInputChange}
                                    className="border border-gray-300 p-1"
                                />
                            </td>
                        </tr>
                        <tr>
                            <td><strong>Signature:</strong></td>
                            <td>
                                <input 
                                    type="text"
                                    name="signature"
                                    value={coating.batchRecord.signature || ''}
                                    onChange={handleInputChange}
                                    className="border border-gray-300 p-1"
                                />
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
                <h4>•	Check the Temperature & Humidity of the Area:-</h4>
                <table className="w-full mb-4" style={{ textAlign: 'center' }}>
                <tbody>
                    <tr>
                <td><strong>Temperature:</strong></td>
                            <td>
                                <input 
                                   type="text" 
                                   name="temperature"
                                   value={coating.tempAndHumidity.temperature || ''}
                                   onChange={handleInputChange}
                                    className="border border-gray-300 p-1"
                                />
                        </td>
                        <td><strong>Humidity:</strong></td>
                            <td>
                                <input 
                                 type="text" 
                                 name="humidity"
                                 value={coating.tempAndHumidity.humidity || ''}
                                 onChange={handleInputChange}
                                    className="border border-gray-300 p-1"
                                />
                            </td>
                            </tr>
                        <tr>

                        <td><strong>Remarks:</strong></td>
                            <td colSpan={4}>
                                <TextField 
                                    fullWidth
                                    multiline
                               
                                name="coatingRemarks"
                                value={coating.tempAndHumidity.coatingRemarks || ''}
                                onChange={handleInputChange}
                                />
                            </td>
                        
                        </tr>

                        <tr>
                <td><strong>Authorized For Use (Sign.):</strong></td>
                            <td>
                                <input 
                                   type="text" 
                                   name="authorizedForUse"
                                   value={coating.authorization.authorizedForUse || ''}
                                   onChange={handleInputChange}
                                    className="border border-gray-300 p-1"
                                />
                        </td>
                        <td><strong>Date & Time of Authorization:</strong></td>
                            <td>
                                <input 
                                   type="datetime-local" 
                                   name="dateAndTime"
                                   value={coating.authorization.dateAndTime || ''}
                                   onChange={handleInputChange}
                                    className="border border-gray-300 p-1"
                                />
                            </td>
                            </tr>
                        </tbody>
                </table>
               
         

            <p className="text-sm text-gray-600 mt-4 text-center">
       <strong>Note:</strong> ✔️ = Satisfactory, ❌ = Unsatisfactory, — = Not Applicable
   </p>
            </Card.Body>
        </Card>
    );
};

export default BatchManufacturingFormPage20;
