import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { setPrinting } from "../../../../store/printingSlice";
import {
  Card,
  CardContent,
  TextField,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
  IconButton,
} from "@mui/material";
import { Add as AddIcon, Remove as RemoveIcon } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import "./page15.css";
import { usePermissions } from "../../../../hooks/usePermissions";

export default function BatchPackingFormPage5({ isReport }) {
  const dispatch = useDispatch();
  const printingState = useSelector((state) => state.printing);
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

    const updatedLabels = [...printingState.checkSheet.labels];

  
      updatedLabels[index] = { ...updatedLabels[index], [field]: value };

    dispatch(
      setPrinting({
        ...printingState,
        checkSheet: {
          ...printingState.checkSheet,
          labels: updatedLabels,
        },
      })
    );
  };

  const handleGeneralInputChange = (field, value) => {
    if (!canEditGeneral) return;

    dispatch(
      setPrinting({
        ...printingState,
        checkSheet: {
          ...printingState.checkSheet,
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
      setPrinting({
        ...printingState,
        checkSheet: {
          ...printingState.checkSheet,
          labels: [...printingState.checkSheet.labels, newRow],
        },
      })
    );
  };

  const handleRemoveRow = (index) => {
    if (!canEditTable) return;

    const updatedLabels = printingState.checkSheet.labels.filter(
      (_, i) => i !== index
    );
    dispatch(
      setPrinting({
        ...printingState,
        checkSheet: {
          ...printingState.checkSheet,
          labels: updatedLabels,
        },
      })
    );
  };

  return (
    <Card className="max-w-7xl mx-auto">
      <CardContent>
        <h2 className="text-2xl font-bold mb-4 text-center">
        PRINTING IN PROCESS SHEET
        </h2>

        <div className="mb-4">
          <table cellPadding="5" style={{ width: "100%", textAlign: "center" }}>
            <tbody>
              <tr>
                <td>
                  <strong>Date started: </strong>
                </td>
                <td colSpan="1">
                  <TextField
                    label="Date started"
                    type="date"
                    value={printingState.checkSheet.dateStarted}
                    onChange={(e) =>
                      handleGeneralInputChange("dateStarted", e.target.value)
                    }
                    className="w-1/4 mt-4"
                    InputLabelProps={{ shrink: true }}
                    disabled={!canEditGeneral}
                  />
                </td>
                <td>
                  <strong>Date completed: </strong>
                </td>

                <td colSpan="1">
                  <TextField
                    label="Date completed"
                    type="date"
                    value={printingState.checkSheet.dateCompleted}
                    onChange={(e) =>
                      handleGeneralInputChange("dateCompleted", e.target.value)
                    }
                    className="w-1/4 mt-4"
                    InputLabelProps={{ shrink: true }}
                    disabled={!canEditGeneral}
                  />
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        <TableContainer component={Paper}>
          <Table size="small">
            <TableHead>
              <TableRow>
                <TableCell
                  style={{ fontWeight: "bold", borderRight: "1px solid #ddd" }}
                >
                  Date & Time
                </TableCell>
                <TableCell
                  style={{ fontWeight: "bold", borderRight: "1px solid #ddd" }}
                >
                  U/C OR LABEL
                </TableCell>
                <TableCell
                  style={{ fontWeight: "bold", borderRight: "1px solid #ddd" }}
                >
                  COMM PACK/EXPORT
                </TableCell>
                <TableCell
                  style={{ fontWeight: "bold", borderRight: "1px solid #ddd" }}
                >
                  BATCH #
                </TableCell>
                <TableCell
                  style={{ fontWeight: "bold", borderRight: "1px solid #ddd" }}
                >
                  MFG DATE
                </TableCell>
                <TableCell
                  style={{ fontWeight: "bold", borderRight: "1px solid #ddd" }}
                >
                  EXP DATE
                </TableCell>
                <TableCell
                  style={{ fontWeight: "bold", borderRight: "1px solid #ddd" }}
                >
                  M.R.P
                </TableCell>
                <TableCell
                  style={{ fontWeight: "bold", borderRight: "1px solid #ddd" }}
                >
                CHECKED BY
                </TableCell>
                <TableCell
                  style={{ fontWeight: "bold" }}
                  className="actions-column"
                >
                  Actions
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {printingState.checkSheet.labels.map((row, index) => (
                <TableRow key={index}>
                  <TableCell style={{ borderRight: "1px solid #ddd" }}>
                    <div style={{ display: "flex", flexDirection: "column" }}>
                      {/* Date Field */}
                      <TextField
                        type="date"
                        value={row.dateAndTime.split("T")[0]} // Extracts the date part
                        onChange={(e) =>
                          handleInputChange(
                            index,
                            "dateAndTime",
                            `${e.target.value}T${row.dateAndTime.split("T")[1]}`
                          )
                        }
                        InputLabelProps={{ shrink: true }}
                        className="weight"
                        disabled={!canEditTable}
                      />
                      {/* Time Field */}
                      <TextField
                        type="time"
                        value={row.dateAndTime.split("T")[1]} // Extracts the time part
                        onChange={(e) =>
                          handleInputChange(
                            index,
                            "dateAndTime",
                            `${row.dateAndTime.split("T")[0]}T${e.target.value}`
                          )
                        }
                        InputLabelProps={{ shrink: true }}
                        className="weight"
                        disabled={!canEditTable}
                      />
                    </div>
                  </TableCell>

                  <TableCell style={{ borderRight: "1px solid #ddd" }}>
                    <TextField
                      fullWidth
                      multiline
                      value={row.ucOrLabel}
                      inputProps={{ style: { minWidth: "20px" } }}
                      onChange={(e) =>
                        handleInputChange(
                          index,
                          "ucOrLabel",
                          e.target.value
                        )
                      }
                      disabled={!canEditTable}
                    />
                  </TableCell>
                  <TableCell style={{ borderRight: "1px solid #ddd" }}>
                    <TextField
                      fullWidth
                      multiline
                      value={row.commPackeOrExport}
                      inputProps={{ style: { minWidth: "25px" } }}
                      onChange={(e) =>
                        handleInputChange(index, "commPackeOrExport", e.target.value)
                      }
                      disabled={!canEditTable}
                    />
                  </TableCell>
                  <TableCell style={{ borderRight: "1px solid #ddd" }}>
                    <TextField
                      fullWidth
                      multiline
                      value={row.batchNo}
                      inputProps={{ style: { minWidth: "25px" } }}
                      onChange={(e) =>
                        handleInputChange(index, "batchNo", e.target.value)
                      }
                      disabled={!canEditTable}
                    />
                  </TableCell>
                  <TableCell style={{ borderRight: "1px solid #ddd" }}>
                    <TextField
                      fullWidth
                      type="date"
                      value={row.mfgDate}
                      onChange={(e) =>
                        handleInputChange(index, "mfgDate", e.target.value)
                      }
                      disabled={!canEditTable}
                    />
                  </TableCell>
                  <TableCell style={{ borderRight: "1px solid #ddd" }}>
                    <TextField
                      fullWidth
                      type="date"
                      value={row.expDate}
                      onChange={(e) =>
                        handleInputChange(index, "expDate", e.target.value)
                      }
                      disabled={!canEditTable}
                    />
                  </TableCell>
                  <TableCell style={{ borderRight: "1px solid #ddd" }}>
                    <TextField
                      fullWidth
                      multiline
                      value={row.mrp}
                      onChange={(e) =>
                        handleInputChange(index, "mrp", e.target.value)
                      }
                      disabled={!canEditTable}
                    />
                  </TableCell>
                  <TableCell style={{ borderRight: "1px solid #ddd" }}>
                    <TextField
                      fullWidth
                      multiline
                      value={row.checkedBy}
                      onChange={(e) =>
                        handleInputChange(index, "checkedBy", e.target.value)
                      }
                      disabled={!canEditTable}
                    />
                  </TableCell>
                  <TableCell className="actions-column">
                    <IconButton onClick={() => handleRemoveRow(index)} disabled={!canEditTable}>
                      <RemoveIcon />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>

        <div className="mt-4 flex justify-between items-center">
          <Button
            variant="contained"
            color="primary"
            startIcon={<AddIcon />}
            onClick={handleAddRow}
            disabled={!canEditTable}
          >
            Add Row
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
