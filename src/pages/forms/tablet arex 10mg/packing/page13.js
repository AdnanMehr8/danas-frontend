import React from "react";
import { Table, Form, Button } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { setPacking } from "../../../../store/packingSlice";
import { TextField } from "@mui/material";
import { usePermissions } from "../../../../hooks/usePermissions";

const BatchPackingFormPage13 = ({ isReport }) => {
  const dispatch = useDispatch();
  const packing = useSelector((state) => state.packing);
  const { hasPermission } = usePermissions();

  const permission = {
    canReadProduction: isReport ? true : hasPermission('production', 'read'),
    canReadQA: isReport ? true : hasPermission('qa', 'read'),
    canEditProduction: isReport ? true : hasPermission('production', 'update'),
    canEditQA: isReport ? true : hasPermission('qa', 'update')
  };

  // Table-specific permissions (both production and QA can edit)
  const canEditTable = permission.canEditProduction || permission.canEditQA;
  
  // General form permissions (only production can edit)
  const canEditGeneral = permission.canEditProduction;

  // Check if user can read either production or QA
  if (!permission.canReadProduction && !permission.canReadQA) {
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


  const handleInputChange = (index, field, value) => {
    if (!canEditTable) return;

    
    const updatedLabels = [...packing.checkSheet.labels];

  
      updatedLabels[index] = { ...updatedLabels[index], [field]: value };

    dispatch(
      setPacking({
        ...packing,
        checkSheet: {
          ...packing.checkSheet,
          labels: updatedLabels,
        },
      })
    );
  };

  const handleGeneralInputChange = (field, value) => {
    if (!canEditGeneral) return;

    dispatch(
      setPacking({
        ...packing,
        checkSheet: {
          ...packing.checkSheet,
          [field]: value,
        },
      })
    );
  };

  const handleAddRow = () => {
    if (!canEditTable) return;

    const newRow = {
        dateAndTime: "",
        ucOrLabel: "",
        commPackeOrExport: "",
        batchNo: "",
        mfgDate: "",
        expDate: "",
        mrp: "",
        checkedBy: "",
    };
    dispatch(
      setPacking({
        ...packing,
        checkSheet: {
          ...packing.checkSheet,
          labels: [...packing.checkSheet.labels, newRow],
        },
      })
    );
  };

  const handleRemoveRow = (index) => {
    if (!canEditTable) return;

    const updatedLabels = packing.checkSheet.labels.filter(
      (_, i) => i !== index
    );
    dispatch(
      setPacking({
        ...packing,
        checkSheet: {
          ...packing.checkSheet,
          labels: updatedLabels,
        },
      })
    );
  };

 

  return (
    <div className="batch-manufacturing-form-page-2 p-4 ">
             <h2 className="text-2xl font-bold mb-4 text-center">
        PACKAGING IN PROCESS SHEET
        </h2>
              <div className="mt-5">
        <Table bordered>
          <thead>
            <tr>
              <th>
                Date Started:
              </th>
              <th>
              Date Completed:
              </th>
            </tr>
          </thead>
          <tbody>
          <tr>
              <td>
                
                <Form.Control
                  type="date"
                  name="dateStarted"
                  value={packing.checkSheet.dateStarted || ""}
                  onChange={(e) =>
                    handleGeneralInputChange("dateStarted", e.target.value)
                  }
                  disabled={!canEditGeneral}
                />
              </td>
              <td>
                <Form.Control
                  type="date"
                  name="dateCompleted"
                  value={packing.checkSheet.dateCompleted || ""}
                  onChange={(e) =>
                    handleGeneralInputChange("dateCompleted", e.target.value)
                  }
                  disabled={!canEditGeneral}
                />
              </td>
            </tr>
          </tbody>
        </Table>
      </div>

      <Table bordered>
      <colgroup>
    <col span="1" />
    <col span="1" />
    <col span="4" />
    <col span="3" />
    <col span="1" />
    <col span="1" />
    <col span="1" />
    {/* <col span="1" /> */}
  </colgroup>
      <thead>
    <tr>
      <th>Date & Time</th>
      <th colSpan="9" style={{ borderRight: "1px solid #dee2e6", textAlign: "center" }}>
        Unit Pack
      </th>
      <th>Bottle / Tube</th>
      <th rowSpan={2}>UC / MC</th>
      <th rowSpan={2}>MC No.</th>
      <th rowSpan={2}>sign by produc./QA</th>
      <th className="actions-column">Actions</th>
    </tr>
    <tr>
      <th></th>
      {/* <th></th> */}
      
      <th>Blister</th>
      <th>B.NO.</th>
      <th>Mfg <br /> Date</th>
      <th>Exp <br /> Date</th>
      <th>MRP</th>
      <th>Pack <br /> size </th>
      <th>Direction Insertion</th>
      <th>Inner</th>
      <th>Label</th>
      <th style={{ borderRight: "1px solid #dee2e6" }}></th>
      {/* <th></th> */}
    
    </tr>
  </thead>
        <tbody>
          {packing.checkSheet.labels.map((row, index) => (
            <tr key={index}>
              <td>
                <Form.Control
                  type="datetime-local"
                  value={row.dateAndTime}
                  onChange={(e) =>
                    handleInputChange(
                      index,
                      "dateAndTime",
                      e.target.value
                    )
                  }
                  disabled={!canEditTable}
                />
              </td>
              <td>
                <Form.Control
                  type="text"
                  value={row.blister}
                  onChange={(e) =>
                    handleInputChange(
                      index,
                      "blister",
                      e.target.value
                    )
                  }
                  disabled={!canEditTable}
                />
              </td>
              <td>
                <Form.Control
                  type="text"
                  value={row.batchNo}
                  onChange={(e) =>
                    handleInputChange(
                      index,
                      "batchNo",
                      e.target.value
                    )
                  }
                  disabled={!canEditTable}
                />
              </td>
              <td>
                <Form.Control
                  type="date"
                  value={row.mfgDate}
                  onChange={(e) =>
                    handleInputChange(
                      index,
                      "mfgDate",
                      e.target.value
                    )
                  }
                  disabled={!canEditTable}
                />
              </td>
              <td>
                <Form.Control
                  type="date"
                  value={row.expDate}
                  onChange={(e) =>
                    handleInputChange(
                      index,
                      "expDate",
                      e.target.value
                    )
                  }
                  disabled={!canEditTable}
                />
              </td>
              <td>
                <Form.Control
                  type="text"
                  value={row.mrp}
                  onChange={(e) =>
                    handleInputChange(
                      index,
                      "mrp",
                      e.target.value
                    )
                  }
                  disabled={!canEditTable}
                />
              </td>
              <td>
                <Form.Control
                  type="text"
                  value={row.packSize}
                  onChange={(e) =>
                    handleInputChange(
                      index,
                      "packSize",
                      e.target.value
                    )
                  }
                  disabled={!canEditTable}
                />
              </td>
              <td>
                <Form.Control
                  type="text"
                  value={row.directionInsertion}
                  onChange={(e) =>
                    handleInputChange(
                      index,
                      "directionInsertion",
                      e.target.value
                    )
                  }
                  disabled={!canEditTable}
                />
              </td>
              <td>
                <Form.Control
                  type="text"
                  value={row.inner}
                  onChange={(e) =>
                    handleInputChange(
                      index,
                      "inner",
                      e.target.value
                    )
                  }
                  disabled={!canEditTable}
                />
              </td>
              <td>
                <Form.Control
                  type="text"
                  value={row.label}
                  onChange={(e) =>
                    handleInputChange(
                      index,
                      "label",
                      e.target.value
                    )
                  }
                  disabled={!canEditTable}
                />
              </td>
              <td>
                <Form.Control
                  type="text"
                  value={row.bottleOrTube}
                  onChange={(e) =>
                    handleInputChange(
                      index,
                      "bottleOrTube",
                      e.target.value
                    )
                  }
                  disabled={!canEditTable}
                />
              </td>
              <td>
                <Form.Control
                  type="text"
                  value={row.ucOrMc}
                  onChange={(e) =>
                    handleInputChange(
                      index,
                      "ucOrMc",
                      e.target.value
                    )
                  }
                  disabled={!canEditTable}
                />
              </td>
              <td>
                <Form.Control
                  type="text"
                  value={row.mcNo}
                  onChange={(e) =>
                    handleInputChange(
                      index,
                      "mcNo",
                      e.target.value
                    )
                  }
                  disabled={!canEditTable}
                />
              </td>
              <td>
                <Form.Control
                  type="text"
                  value={row.signedByProductionOrQA}
                  onChange={(e) =>
                    handleInputChange(
                      index,
                      "signedByProductionOrQA",
                      e.target.value
                    )
                  }
                  disabled={!canEditTable}
                />
              </td>
              <td className="actions-column">
                <Button
                  variant="outline-danger"
                  onClick={() => handleRemoveRow(index)}
                  disabled={!canEditTable}
                >
                  Delete
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
      <Button
        onClick={handleAddRow}
        className="mt-2"
        disabled={!canEditTable}
      >
        Add Row
      </Button>
    </div>
  );
};

export default BatchPackingFormPage13;
