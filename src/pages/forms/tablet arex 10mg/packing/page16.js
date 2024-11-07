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

export default function BatchPackingFormPage16() {
  const dispatch = useDispatch();
  const packingState = useSelector((state) => state.packing);

  const handleInputChange = (index, field, value) => {
    const updatedLabels = [...packingState.stockTransferReport.labels];

  
      updatedLabels[index] = { ...updatedLabels[index], [field]: value };

    dispatch(
      setPacking({
        ...packingState,
        stockTransferReport: {
          ...packingState.stockTransferReport,
          labels: updatedLabels,
        },
      })
    );
  };

  const handleGeneralInputChange = (field, value) => {
    dispatch(
      setPacking({
        ...packingState,
        stockTransferReport: {
          ...packingState.stockTransferReport,
          [field]: value,
        },
      })
    );
  };

  const handleAddRow = () => {
    const newRow = {
        date: "",
        transferNote: "",
        packSize: "",
        noOfLimitsPack: "",
        noOfMasterCartonPacked: "",
        packingSupervisor: "",
        storeOfficer: "",
    };
    dispatch(
      setPacking({
        ...packingState,
        stockTransferReport: {
          ...packingState.stockTransferReport,
          labels: [...packingState.stockTransferReport.labels, newRow],
        },
      })
    );
  };

  const handleRemoveRow = (index) => {
    const updatedLabels = packingState.stockTransferReport.labels.filter(
      (_, i) => i !== index
    );
    dispatch(
      setPacking({
        ...packingState,
        stockTransferReport: {
          ...packingState.stockTransferReport,
          labels: updatedLabels,
        },
      })
    );
  };

  return (
    <Card className="max-w-7xl mx-auto">
      <CardContent>
        <h2 className="text-2xl font-bold mb-4 text-center">
        STOCK TRANSFER REPORT
        </h2>
        <div className="mt-5">
        <Table bordered>
          <thead>
            <tr>
              <th>
                Manufacturing Started:
              </th>
              <th>
              Expiry Date :
              </th>
            </tr>
          </thead>
          <tbody>
          <tr>
              <td>
                
                <Form.Control
                  type="date"
                  name="mfgDate"
                  value={packingState.stockTransferReport.mfgDate || ""}
                  onChange={(e) =>
                    handleGeneralInputChange("mfgDate", e.target.value)
                  }
                />
              </td>
              <td>
                <Form.Control
                  type="date"
                  name="expDate"
                  value={packingState.stockTransferReport.expDate || ""}
                  onChange={(e) =>
                    handleGeneralInputChange("expDate", e.target.value)
                  }
                />
              </td>
            </tr>
          </tbody>
        </Table>
      </div>


        <TableContainer component={Paper}>
          <Table size="small">
            <TableHead>
              <TableRow>
                <TableCell
                  style={{ fontWeight: "bold", borderRight: "1px solid #ddd" }}
                >
                  Date 
                </TableCell>
                <TableCell
                  style={{ fontWeight: "bold", borderRight: "1px solid #ddd" }}
                >
                 Transfer Note #
                </TableCell>
                <TableCell
                  style={{ fontWeight: "bold", borderRight: "1px solid #ddd" }}
                >
                  Pack Size
                </TableCell>
                <TableCell
                  style={{ fontWeight: "bold", borderRight: "1px solid #ddd" }}
                >
                  No. of Unit Packs
                </TableCell>
                <TableCell
                  style={{ fontWeight: "bold", borderRight: "1px solid #ddd" }}
                >
                  No. of Master Carton Packed
                </TableCell>
                <TableCell
                  style={{ fontWeight: "bold", borderRight: "1px solid #ddd" }}
                >
                  Packing Supervisor
                </TableCell>
                <TableCell
                  style={{ fontWeight: "bold", borderRight: "1px solid #ddd" }}
                >
                  Store Officer
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
              {packingState.stockTransferReport.labels.map((row, index) => (
                <TableRow key={index}>

                  <TableCell style={{ borderRight: "1px solid #ddd" }}>
                    <TextField
                      fullWidth
                      type="date"
                      value={row.date}
                      inputProps={{ style: { minWidth: "20px" } }}
                      onChange={(e) =>
                        handleInputChange(
                          index,
                          "date",
                          e.target.value
                        )
                      }
                    />
                  </TableCell>
                  <TableCell style={{ borderRight: "1px solid #ddd" }}>
                    <TextField
                      fullWidth
                      multiline
                      value={row.transferNote}
                      inputProps={{ style: { minWidth: "25px" } }}
                      onChange={(e) =>
                        handleInputChange(index, "transferNote", e.target.value)
                      }
                    />
                  </TableCell>
                  <TableCell style={{ borderRight: "1px solid #ddd" }}>
                    <TextField
                      fullWidth
                      multiline
                      value={row.packSize}
                      inputProps={{ style: { minWidth: "25px" } }}
                      onChange={(e) =>
                        handleInputChange(index, "packSize", e.target.value)
                      }
                    />
                  </TableCell>
                  <TableCell style={{ borderRight: "1px solid #ddd" }}>
                    <TextField
                      fullWidth
                      multiline
                      value={row.noOfLimitsPack}
                      onChange={(e) =>
                        handleInputChange(index, "noOfLimitsPack", e.target.value)
                      }
                    />
                  </TableCell>
                  <TableCell style={{ borderRight: "1px solid #ddd" }}>
                    <TextField
                      fullWidth
                      multiline
                      value={row.noOfMasterCartonPacked}
                      onChange={(e) =>
                        handleInputChange(index, "noOfMasterCartonPacked", e.target.value)
                      }
                    />
                  </TableCell>
                  <TableCell style={{ borderRight: "1px solid #ddd" }}>
                    <TextField
                      fullWidth
                      multiline
                      value={row.packingSupervisor}
                      onChange={(e) =>
                        handleInputChange(index, "packingSupervisor", e.target.value)
                      }
                    />
                  </TableCell>
                  <TableCell style={{ borderRight: "1px solid #ddd" }}>
                    <TextField
                      fullWidth
                      multiline
                      value={row.storeOfficer}
                      onChange={(e) =>
                        handleInputChange(index, "storeOfficer", e.target.value)
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
                Production Officer:
              </th>
              <th>
                Quality Assurance Officer:
              </th>
            </tr>
          </thead>
          <tbody>
          <tr>
              <td>
                
                <Form.Control
                  type="text"
                  name="productionOfficer"
                  value={packingState.stockTransferReport.productionOfficer || ""}
                  onChange={(e) =>
                    handleGeneralInputChange("productionOfficer", e.target.value)
                  }
                />
              </td>
              <td>
                <Form.Control
                  type="text"
                  name="qaOfficer"
                  value={packingState.stockTransferReport.qaOfficer || ""}
                  onChange={(e) =>
                    handleGeneralInputChange("qaOfficer", e.target.value)
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
