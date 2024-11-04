import React from "react";
import {
  Card,
  CardContent,
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Paper,
  TextField,
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { setCoatingRecord } from "../../../../store/coatingSlice"; // Adjusted import path

const BatchManufacturingFormPage21 = () => {
  const dispatch = useDispatch();
  const coating = useSelector((state) => state.coating); // Using the entire coating state

  const handleCoatingSolutionPreparationChange = (index, field, value) => {
    const updatedCoatingSolutionPreparation = [
      ...coating.coatingSolutionPreparation,
    ];
    updatedCoatingSolutionPreparation[index] = {
      ...updatedCoatingSolutionPreparation[index],
      [field]: value,
    };
    dispatch(
      setCoatingRecord({
        ...coating,
        coatingSolutionPreparation: updatedCoatingSolutionPreparation,
      })
    );
  };

  const handleCoatingProcedureChange = (index, field, value) => {
    const updatedInstructions = [...coating.coatingProcedure];
    updatedInstructions[index] = {
      ...updatedInstructions[index],
      [field]: value,
    };
    dispatch(
      setCoatingRecord({
        ...coating,
        coatingProcedure: updatedInstructions,
      })
    );
  };

  return (
    <Card className="max-w-4xl mx-auto">
      <CardContent>
        <h2 className="text-2xl font-bold mb-4 text-center">
          COATING SOLUTION PREPARATION:
        </h2>
        <div>INSTRUCTIONS:</div>
        <p>
          1. Operator must wear mask and disposable gloves while handling the
          materials.
        </p>
        <p>2. Seal the container of solution to avoid evaporation.</p>
        <p>3. Avoid direct contact with the skin.</p>

        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell
                  sx={{
                    fontWeight: "bold",
                    borderRight: "1px solid rgba(224, 224, 224, 1)",
                  }}
                  className="text-center"
                >
                  Step(s)
                </TableCell>
                <TableCell
                  sx={{
                    fontWeight: "bold",
                    borderRight: "1px solid rgba(224, 224, 224, 1)",
                  }}
                  className="text-center"
                >
                  Instruction(s)
                </TableCell>
                <TableCell
                  sx={{
                    fontWeight: "bold",
                    borderRight: "1px solid rgba(224, 224, 224, 1)",
                  }}
                  className="text-center"
                >
                  Activity Compliance
                </TableCell>
                <TableCell
                  sx={{
                    fontWeight: "bold",
                    borderRight: "1px solid rgba(224, 224, 224, 1)",
                  }}
                  className="text-center"
                >
                  Performed by Operator (sign & date)
                </TableCell>
                <TableCell
                  sx={{
                    fontWeight: "bold",
                    borderRight: "1px solid rgba(224, 224, 224, 1)",
                  }}
                  className="text-center"
                >
                  Verified by P.O (sign & date)
                </TableCell>
                <TableCell sx={{ fontWeight: "bold" }}>
                  Verified by QAI (sign & date)
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {coating.coatingSolutionPreparation.map((procedure, index) => (
                <TableRow key={index}>
                  <TableCell
                    sx={{ borderRight: "1px solid rgba(224, 224, 224, 1)" }}
                  >
                    {index + 1}
                  </TableCell>
                  <TableCell
                    sx={{ borderRight: "1px solid rgba(224, 224, 224, 1)" }}
                    style={{ width: "500px" }}
                  >
                    <TextField
                      style={{ width: "500px" }}
                      fullWidth
                      multiline
                      value={procedure.instructions || ""}
                      onChange={(e) =>
                        handleCoatingSolutionPreparationChange(
                          index,
                          "instructions",
                          e.target.value
                        )
                      }
                    />
                  </TableCell>
                  <TableCell
                    sx={{ borderRight: "1px solid rgba(224, 224, 224, 1)" }}
                  >
                    <TextField
                      fullWidth
                      multiline
                      value={procedure.activityCompliance || ""}
                      onChange={(e) =>
                        handleCoatingSolutionPreparationChange(
                          index,
                          "activityCompliance",
                          e.target.value
                        )
                      }
                    />
                  </TableCell>
                  <TableCell
                    sx={{ borderRight: "1px solid rgba(224, 224, 224, 1)" }}
                  >
                    <TextField
                      fullWidth
                      multiline
                      value={procedure.performedByOperator || ""}
                      onChange={(e) =>
                        handleCoatingSolutionPreparationChange(
                          index,
                          "performedByOperator",
                          e.target.value
                        )
                      }
                    />
                    <TextField
                      fullWidth
                      type="date"
                      value={procedure.pboDate || ""}
                      onChange={(e) =>
                        handleCoatingSolutionPreparationChange(
                          index,
                          "pboDate",
                          e.target.value
                        )
                      }
                    />
                  </TableCell>
                  <TableCell
                    sx={{ borderRight: "1px solid rgba(224, 224, 224, 1)" }}
                  >
                    <TextField
                      fullWidth
                      multiline
                      value={procedure.checkedByPO || ""}
                      onChange={(e) =>
                        handleCoatingSolutionPreparationChange(
                          index,
                          "checkedByPO",
                          e.target.value
                        )
                      }
                    />
                    <TextField
                      fullWidth
                      type="date"
                      value={procedure.checkedByPODate || ""}
                      onChange={(e) =>
                        handleCoatingSolutionPreparationChange(
                          index,
                          "checkedByPODate",
                          e.target.value
                        )
                      }
                    />
                  </TableCell>
                  <TableCell>
                    <TextField
                      fullWidth
                      multiline
                      value={procedure.checkedByQAI || ""}
                      onChange={(e) =>
                        handleCoatingSolutionPreparationChange(
                          index,
                          "checkedByQAI",
                          e.target.value
                        )
                      }
                    />
                    <TextField
                      fullWidth
                      type="date"
                      value={procedure.checkedByQAIDate || ""}
                      onChange={(e) =>
                        handleCoatingSolutionPreparationChange(
                          index,
                          "checkedByQAIDate",
                          e.target.value
                        )
                      }
                    />
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>

        <h2 className="text-2xl font-bold mb-4 text-center mt-4">
          TABLETS COATING PROCEDURE:
        </h2>

        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell
                  sx={{
                    fontWeight: "bold",
                    borderRight: "1px solid rgba(224, 224, 224, 1)",
                  }}
                  className="text-center"
                >
                  Step(s)
                </TableCell>
                <TableCell
                  sx={{
                    fontWeight: "bold",
                    borderRight: "1px solid rgba(224, 224, 224, 1)",
                  }}
                  className="text-center"
                >
                  Instruction(s)
                </TableCell>
                <TableCell
                  sx={{
                    fontWeight: "bold",
                    borderRight: "1px solid rgba(224, 224, 224, 1)",
                  }}
                  className="text-center"
                >
                  Activity Compliance
                </TableCell>
                <TableCell
                  sx={{
                    fontWeight: "bold",
                    borderRight: "1px solid rgba(224, 224, 224, 1)",
                  }}
                  className="text-center"
                >
                  Performed by Operator (sign & date)
                </TableCell>
                <TableCell
                  sx={{
                    fontWeight: "bold",
                    borderRight: "1px solid rgba(224, 224, 224, 1)",
                  }}
                  className="text-center"
                >
                  Verified by P.O (sign & date)
                </TableCell>
                <TableCell sx={{ fontWeight: "bold" }}>
                  Verified by QAI (sign & date)
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {coating.coatingProcedure.map((procedure, index) => (
                <TableRow key={index}>
                  <TableCell
                    sx={{ borderRight: "1px solid rgba(224, 224, 224, 1)" }}
                  >
                    {index + 1}
                  </TableCell>
                  <TableCell
                    sx={{ borderRight: "1px solid rgba(224, 224, 224, 1)" }}
                  >
                    <TextField
                      style={{ width: "500px" }}
                      fullWidth
                      multiline
                      value={procedure.instructions || ""}
                      onChange={(e) =>
                        handleCoatingProcedureChange(
                          index,
                          "instructions",
                          e.target.value
                        )
                      }
                    />
                  </TableCell>
                  <TableCell
                    sx={{ borderRight: "1px solid rgba(224, 224, 224, 1)" }}
                  >
                    <TextField
                      fullWidth
                      multiline
                      value={procedure.activityCompliance || ""}
                      onChange={(e) =>
                        handleCoatingProcedureChange(
                          index,
                          "activityCompliance",
                          e.target.value
                        )
                      }
                    />
                  </TableCell>
                  <TableCell
                    sx={{ borderRight: "1px solid rgba(224, 224, 224, 1)" }}
                  >
                    <TextField
                      fullWidth
                      multiline
                      value={procedure.performedByOperator || ""}
                      onChange={(e) =>
                        handleCoatingProcedureChange(
                          index,
                          "performedByOperator",
                          e.target.value
                        )
                      }
                    />
                    <TextField
                      fullWidth
                      type="date"
                      value={procedure.pboDate || ""}
                      onChange={(e) =>
                        handleCoatingProcedureChange(
                          index,
                          "pboDate",
                          e.target.value
                        )
                      }
                    />
                  </TableCell>
                  <TableCell
                    sx={{ borderRight: "1px solid rgba(224, 224, 224, 1)" }}
                  >
                    <TextField
                      fullWidth
                      multiline
                      value={procedure.checkedByPO || ""}
                      onChange={(e) =>
                        handleCoatingProcedureChange(
                          index,
                          "checkedByPO",
                          e.target.value
                        )
                      }
                    />
                    <TextField
                      fullWidth
                      type="date"
                      value={procedure.checkedByPODate || ""}
                      onChange={(e) =>
                        handleCoatingProcedureChange(
                          index,
                          "checkedByPODate",
                          e.target.value
                        )
                      }
                    />
                  </TableCell>
                  <TableCell>
                    <TextField
                      fullWidth
                      multiline
                      value={procedure.checkedByQAI || ""}
                      onChange={(e) =>
                        handleCoatingProcedureChange(
                          index,
                          "checkedByQAI",
                          e.target.value
                        )
                      }
                    />
                    <TextField
                      fullWidth
                      type="date"
                      value={procedure.checkedByQAIDate || ""}
                      onChange={(e) =>
                        handleCoatingProcedureChange(
                          index,
                          "checkedByQAIDate",
                          e.target.value
                        )
                      }
                    />
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </CardContent>
    </Card>
  );
};

export default BatchManufacturingFormPage21;
