import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { setPacking } from "../../../../store/packingSlice";
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
import { Form } from "react-bootstrap";

export default function BatchPackingFormPage12() {
  const dispatch = useDispatch();
  const packingState = useSelector((state) => state.packing);

  const handleInputChange = (index, field, value) => {
    const updatedLabels = [...packingState.teamSheet.labels];

  
      updatedLabels[index] = { ...updatedLabels[index], [field]: value };

    dispatch(
      setPacking({
        ...packingState,
        teamSheet: {
          ...packingState.teamSheet,
          labels: updatedLabels,
        },
      })
    );
  };

  const handleGeneralInputChange = (field, value) => {
    dispatch(
      setPacking({
        ...packingState,
        teamSheet: {
          ...packingState.teamSheet,
          [field]: value,
        },
      })
    );
  };

  const handleAddRow = () => {
    const newRow = {
      name: "",
      process: "",
      timeIn: "",
      timeOut: "",
      timeIn2: "",
      timeOut2: "",
      timeIn3: "",
      timeOut3: "",
    };
    dispatch(
      setPacking({
        ...packingState,
        teamSheet: {
          ...packingState.teamSheet,
          labels: [...packingState.teamSheet.labels, newRow],
        },
      })
    );
  };

  const handleRemoveRow = (index) => {
    const updatedLabels = packingState.teamSheet.labels.filter(
      (_, i) => i !== index
    );
    dispatch(
      setPacking({
        ...packingState,
        teamSheet: {
          ...packingState.teamSheet,
          labels: updatedLabels,
        },
      })
    );
  };

  return (
    <Card className="max-w-7xl mx-auto">
      <CardContent>
        <h2 className="text-2xl font-bold mb-4 text-center">
        TEAM LAYOUT SHEET <br /> (PACKAGING)
        </h2>

        <TableContainer component={Paper}>
          <Table size="small">
            <TableHead>
              <TableRow>
                <TableCell>S. #</TableCell>
                <TableCell
                  style={{ fontWeight: "bold", borderRight: "1px solid #ddd" }}
                >
                  Name
                </TableCell>
                <TableCell
                  style={{ fontWeight: "bold", borderRight: "1px solid #ddd" }}
                >
                 Process
                </TableCell>
                <TableCell
                  style={{ fontWeight: "bold", borderRight: "1px solid #ddd" }}
                >
                  Time In
                </TableCell>
                <TableCell
                  style={{ fontWeight: "bold", borderRight: "1px solid #ddd" }}
                >
                  Time out
                </TableCell>
                <TableCell
                  style={{ fontWeight: "bold", borderRight: "1px solid #ddd" }}
                >
                  Time In
                </TableCell>
                <TableCell
                  style={{ fontWeight: "bold", borderRight: "1px solid #ddd" }}
                >
                  Time out
                </TableCell>
                <TableCell
                  style={{ fontWeight: "bold", borderRight: "1px solid #ddd" }}
                >
                  Time In
                </TableCell>
                <TableCell
                  style={{ fontWeight: "bold", borderRight: "1px solid #ddd" }}
                >
                Time out
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
              {packingState.teamSheet.labels.map((row, index) => (
                <TableRow key={index}>
                  <TableCell>{index + 1 }</TableCell>
                  <TableCell style={{ borderRight: "1px solid #ddd" }}>
                    <TextField
                      fullWidth
                      multiline
                      value={row.name}
                      inputProps={{ style: { minWidth: "20px" } }}
                      onChange={(e) =>
                        handleInputChange(
                          index,
                          "name",
                          e.target.value
                        )
                      }
                    />
                  </TableCell>
                  <TableCell style={{ borderRight: "1px solid #ddd" }}>
                    <TextField
                      fullWidth
                      multiline
                      value={row.process}
                      inputProps={{ style: { minWidth: "25px" } }}
                      onChange={(e) =>
                        handleInputChange(index, "process", e.target.value)
                      }
                    />
                  </TableCell>
                  <TableCell style={{ borderRight: "1px solid #ddd" }}>
                    <TextField
                      fullWidth
                      multiline
                      value={row.timeIn}
                      inputProps={{ style: { minWidth: "25px" } }}
                      onChange={(e) =>
                        handleInputChange(index, "timeIn", e.target.value)
                      }
                    />
                  </TableCell>
                  <TableCell style={{ borderRight: "1px solid #ddd" }}>
                    <TextField
                      fullWidth
                      multiline
                      value={row.timeOut}
                      onChange={(e) =>
                        handleInputChange(index, "timeOut", e.target.value)
                      }
                    />
                  </TableCell>
                  <TableCell style={{ borderRight: "1px solid #ddd" }}>
                    <TextField
                      fullWidth
                      multiline
                      value={row.timeIn2}
                      onChange={(e) =>
                        handleInputChange(index, "timeIn2", e.target.value)
                      }
                    />
                  </TableCell>
                  <TableCell style={{ borderRight: "1px solid #ddd" }}>
                    <TextField
                      fullWidth
                      multiline
                      value={row.timeOut2}
                      onChange={(e) =>
                        handleInputChange(index, "timeOut2", e.target.value)
                      }
                    />
                  </TableCell>
                  <TableCell style={{ borderRight: "1px solid #ddd" }}>
                    <TextField
                      fullWidth
                      multiline
                      value={row.timeIn3}
                      onChange={(e) =>
                        handleInputChange(index, "timeIn3", e.target.value)
                      }
                    />
                  </TableCell>
                  <TableCell style={{ borderRight: "1px solid #ddd" }}>
                    <TextField
                      fullWidth
                      multiline
                      value={row.timeOut3}
                      onChange={(e) =>
                        handleInputChange(index, "timeOut3", e.target.value)
                      }
                    />
                  </TableCell>
                  <TableCell className="actions-column">
                    <IconButton onClick={() => handleRemoveRow(index)}>
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
          >
            Add Row
          </Button>
        </div>
    
        <div className="mt-5">
        <Table bordered>
          <thead>
            <tr>
              <th>
                In Charge<br /> (Sign & Date)
              </th>
              <th>
              Packing Officer <br /> (Sign & Date)
              </th>
            </tr>
          </thead>
          <tbody>
          <tr>
              <td>
                <Form.Control
                  name="incharge"
                  value={
                    packingState.teamSheet.incharge ||
                    ""
                  }
                  onChange={(e) =>
                    handleGeneralInputChange(
                      "incharge",
                      e.target.value
                    )
                  }
                />
                <Form.Control
                  type="date"
                  name="inchargeDate"
                  value={packingState.teamSheet.inchargeDate || ""}
                  onChange={(e) =>
                    handleGeneralInputChange("inchargeDate", e.target.value)
                  }
                />
              </td>
              <td>
                <Form.Control
                  name="packingOfficer"
                  value={packingState.teamSheet.packingOfficer || ""}
                  onChange={(e) =>
                    handleGeneralInputChange(
                      "packingOfficer",
                      e.target.value
                    )
                  }
                />
                <Form.Control
                  type="date"
                  name="packingOfficerDate"
                  value={packingState.teamSheet.packingOfficerDate || ""}
                  onChange={(e) =>
                    handleGeneralInputChange("packingOfficerDate", e.target.value)
                  }
                />
              </td>
            </tr>
          </tbody>
        </Table>
      </div>
      </CardContent>
    </Card>
  );
}
