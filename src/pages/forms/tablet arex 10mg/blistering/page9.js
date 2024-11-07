import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { setBlistering } from "../../../../store/blisteringSlice";
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

export default function BatchPackingFormPage9() {
  const dispatch = useDispatch();
  const blisteringState = useSelector((state) => state.blistering);

  const handleInputChange = (index, field, value) => {
    const updatedLabels = [...blisteringState.checkSheet.labels];

  
      updatedLabels[index] = { ...updatedLabels[index], [field]: value };

    dispatch(
      setBlistering({
        ...blisteringState,
        checkSheet: {
          ...blisteringState.checkSheet,
          labels: updatedLabels,
        },
      })
    );
  };

  const handleGeneralInputChange = (field, value) => {
    dispatch(
      setBlistering({
        ...blisteringState,
        checkSheet: {
          ...blisteringState.checkSheet,
          [field]: value,
        },
      })
    );
  };

  const handleAddRow = () => {
    const newRow = {
      dateAndTime: "",
      sealingTemp: "",
      appearance: "",
      embossing: "",
      tabsOrCapsPerBlister: "",
      text: "",
      sealing: "",
      leakTest: "",
      performedByProductionQA: "",
    };
    dispatch(
      setBlistering({
        ...blisteringState,
        checkSheet: {
          ...blisteringState.checkSheet,
          labels: [...blisteringState.checkSheet.labels, newRow],
        },
      })
    );
  };

  const handleRemoveRow = (index) => {
    const updatedLabels = blisteringState.checkSheet.labels.filter(
      (_, i) => i !== index
    );
    dispatch(
      setBlistering({
        ...blisteringState,
        checkSheet: {
          ...blisteringState.checkSheet,
          labels: updatedLabels,
        },
      })
    );
  };

  return (
    <Card className="max-w-7xl mx-auto">
      <CardContent>
        <h2 className="text-2xl font-bold mb-4 text-center">
        BLISTER IN PROCESS SHEET
        </h2>

        <div style={{display: "flex", alignItems: "center", justifyContent: "center", marginBottom: "20px"}}>
       
                  <strong>Blister Machine ID: </strong>
           
                  <TextField
                    label="Blister Machine ID"
                    type="text"
                    value={blisteringState.checkSheet.blisterMachineId}
                    onChange={(e) =>
                      handleGeneralInputChange("blisterMachineId", e.target.value)
                    }
                    // className=" mt-4"
                    // InputLabelProps={{ shrink: true }}
                  />

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
                 Sealing Temp. <br /> (130 - 160) C
                </TableCell>
                <TableCell
                  style={{ fontWeight: "bold", borderRight: "1px solid #ddd" }}
                >
                  Appearance
                </TableCell>
                <TableCell
                  style={{ fontWeight: "bold", borderRight: "1px solid #ddd" }}
                >
                  Embossing
                </TableCell>
                <TableCell
                  style={{ fontWeight: "bold", borderRight: "1px solid #ddd" }}
                >
                  Tabs. / Caps Per Blister
                </TableCell>
                <TableCell
                  style={{ fontWeight: "bold", borderRight: "1px solid #ddd" }}
                >
                  Text
                </TableCell>
                <TableCell
                  style={{ fontWeight: "bold", borderRight: "1px solid #ddd" }}
                >
                  Sealing
                </TableCell>
                <TableCell
                  style={{ fontWeight: "bold", borderRight: "1px solid #ddd" }}
                >
                Leak Test
                </TableCell>
                <TableCell
                  style={{ fontWeight: "bold", borderRight: "1px solid #ddd" }}
                >
                Performed By Production / QA <br /> (Sign. & date)
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
              {blisteringState.checkSheet.labels.map((row, index) => (
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
                      />
                    </div>
                  </TableCell>

                  <TableCell style={{ borderRight: "1px solid #ddd" }}>
                    <TextField
                      fullWidth
                      multiline
                      value={row.sealingTemp}
                      inputProps={{ style: { minWidth: "20px" } }}
                      onChange={(e) =>
                        handleInputChange(
                          index,
                          "sealingTemp",
                          e.target.value
                        )
                      }
                    />
                  </TableCell>
                  <TableCell style={{ borderRight: "1px solid #ddd" }}>
                    <TextField
                      fullWidth
                      multiline
                      value={row.appearance}
                      inputProps={{ style: { minWidth: "25px" } }}
                      onChange={(e) =>
                        handleInputChange(index, "appearance", e.target.value)
                      }
                    />
                  </TableCell>
                  <TableCell style={{ borderRight: "1px solid #ddd" }}>
                    <TextField
                      fullWidth
                      multiline
                      value={row.embossing}
                      inputProps={{ style: { minWidth: "25px" } }}
                      onChange={(e) =>
                        handleInputChange(index, "embossing", e.target.value)
                      }
                    />
                  </TableCell>
                  <TableCell style={{ borderRight: "1px solid #ddd" }}>
                    <TextField
                      fullWidth
                      multiline
                      value={row.tabsOrCapsPerBlister}
                      onChange={(e) =>
                        handleInputChange(index, "tabsOrCapsPerBlister", e.target.value)
                      }
                    />
                  </TableCell>
                  <TableCell style={{ borderRight: "1px solid #ddd" }}>
                    <TextField
                      fullWidth
                      multiline
                      value={row.text}
                      onChange={(e) =>
                        handleInputChange(index, "text", e.target.value)
                      }
                    />
                  </TableCell>
                  <TableCell style={{ borderRight: "1px solid #ddd" }}>
                    <TextField
                      fullWidth
                      multiline
                      value={row.sealing}
                      onChange={(e) =>
                        handleInputChange(index, "sealing", e.target.value)
                      }
                    />
                  </TableCell>
                  <TableCell style={{ borderRight: "1px solid #ddd" }}>
                    <TextField
                      fullWidth
                      multiline
                      value={row.leakTest}
                      onChange={(e) =>
                        handleInputChange(index, "leakTest", e.target.value)
                      }
                    />
                  </TableCell>
                  <TableCell style={{ borderRight: "1px solid #ddd" }}>
                    <TextField
                      fullWidth
                      multiline
                      value={row.performedByProductionQA}
                      onChange={(e) =>
                        handleInputChange(index, "performedByProductionQA", e.target.value)
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
        <div style={{display: "flex", alignItems: "center", gap: "10px", marginTop: "20px"}}>
         <strong> Production Pharmacist: <br /> (Sign. & date)</strong>
          <input
            type="text"
            value={blisteringState.checkSheet.productionPharmacist}
            onChange={(e) =>
              handleGeneralInputChange("productionPharmacist", e.target.value)
            }
          />
           <input
            type="date"
            value={blisteringState.checkSheet.productionPharmacistDate}
            onChange={(e) =>
              handleGeneralInputChange( "productionPharmacistDate", e.target.value)
            }
          />
        </div>
      </CardContent>
    </Card>
  );
}
