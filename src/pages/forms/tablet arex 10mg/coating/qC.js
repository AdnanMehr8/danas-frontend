
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { setCoatingRecord } from "../../../../store/coatingSlice";
import { TextField, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button } from "@mui/material";
import FormHeaderQCCoating from "../../../header/formHeaderQCCoating";
import { usePermissions } from "../../../../hooks/usePermissions";

export default function CoatingQC({ isReport }) {
  const dispatch = useDispatch();
  const coatingState = useSelector((state) => state.coating);
  const { hasPermission } = usePermissions();
  
  const permission = {
    canReadQC: isReport ? true : hasPermission('qc', 'read'),
    canEditQC: isReport ? true : hasPermission('qc', 'update')
  };

  const handleBatchInputChange = (field, value) => {
    if (!permission.canEditQC) return;

    dispatch(
      setCoatingRecord({
        ...coatingState,
        batch: {
          ...coatingState.batch,
          [field]: value,
        },
      })
    );
  };

  const handleParameterChange = (index, field, value) => {
    if (!permission.canEditQC) return;

    const updatedParameters = [...coatingState.testAndResults.parameters];
    updatedParameters[index] = { ...updatedParameters[index], [field]: value };

    dispatch(
      setCoatingRecord({
        ...coatingState,
        testAndResults: {
          ...coatingState.testAndResults,
          parameters: updatedParameters,
        },
      })
    );
  };

  const handleTestAndResultsChange = (field, value) => {
    if (!permission.canEditQC) return;

    dispatch(
      setCoatingRecord({
        ...coatingState,
        testAndResults: {
          ...coatingState.testAndResults,
          [field]: value,
        },
      })
    );
  };

  const setCheckedByQCA = () => {
    handleTestAndResultsChange("checkedByQCA", "Your QA Name");
    // handleTestAndResultsChange("checkedByQCADate", new Date().toISOString().split("T")[0]);
  };

  const setCheckedByQCM = () => {
    handleTestAndResultsChange("checkedByQCM", "Your QC Name");
    // handleTestAndResultsChange("checkedByQCMDate", new Date().toISOString().split("T")[0]);
  };

  const handleRemarksChange = (field, value) => {
    if (!permission.canEditQC) return;

    dispatch(
      setCoatingRecord({
        ...coatingState,
        testAndResults: {
          ...coatingState.testAndResults,
          [field]: value,
        },
      })
    );
  };

  const handleAddParameter = () => {
    if (!permission.canEditQC) return;

    const newParameter = { parameters: "", specification: "", results: "" };
    dispatch(setCoatingRecord({
        ...coatingState,
        testAndResults: {
            ...coatingState.testAndResults,
            parameters: [...coatingState.testAndResults.parameters, newParameter],
        },
    }));
};

  const handleDeleteParameter = (index) => {
    if (!permission.canEditQC) return;
  
    const updatedParameters = coatingState.testAndResults.parameters.filter((_, i) => i !== index);
    dispatch(setCoatingRecord({
        ...coatingState,
        testAndResults: {
            ...coatingState.testAndResults,
            parameters: updatedParameters,
        },
    }));
  };
  
  // If user cannot read, return null or a no access message
  if (!permission.canReadQC) {
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
    <div className="mb-4">
            <FormHeaderQCCoating />

    {/* <h2 className="text-2xl font-bold mb-4 text-center">Batch Information</h2> */}
    <table className="mb-6" style={{ width: '100%', border: '1px solid black', borderCollapse: 'collapse' }}>
  <tbody>
    <tr>
      <td>Product:</td>
      <td colSpan={3}>
        <input
          value={coatingState.batch.productName}
          onChange={(e) =>
            handleBatchInputChange("productName", e.target.value)
          }
          disabled={!permission.canEditQC}
          readOnly={!permission.canEditQC}
          style={{ width: '100%' }}
        />
      </td>
    </tr>
    <tr>
      <td>Batch No:</td>
      <td>
        <input
          value={coatingState.batch.batchNo}
          onChange={(e) =>
            handleBatchInputChange("batchNo", e.target.value)
          }
          disabled={!permission.canEditQC}
          readOnly={!permission.canEditQC}
          style={{ width: '100%' }}
        />
      </td>
      <td>QC No:</td>
      <td>
        <input
          value={coatingState.batch.qCNo}
          onChange={(e) => handleBatchInputChange("qCNo", e.target.value)}
          disabled={!permission.canEditQC}
          readOnly={!permission.canEditQC}
          style={{ width: '100%' }}
        />
      </td>
    </tr>
    <tr>
      <td>Batch Size:</td>
      <td>
        <input
          value={coatingState.batch.batchSize}
          onChange={(e) =>
            handleBatchInputChange("batchSize", e.target.value)
          }
          disabled={!permission.canEditQC}
          readOnly={!permission.canEditQC}
          style={{ width: '100%' }}
        />
      </td>
      <td>Packs Size:</td>
      <td>
        <input
          value={coatingState.batch.packsSize}
          onChange={(e) =>
            handleBatchInputChange("packsSize", e.target.value)
          }
          disabled={!permission.canEditQC}
          readOnly={!permission.canEditQC}
          style={{ width: '100%' }}
        />
      </td>
    </tr>
    <tr>
      <td>Mfg. Date:</td>
      <td>
        <input
          type="date"
          value={coatingState.batch.mfgDate}
          onChange={(e) =>
            handleBatchInputChange("mfgDate", e.target.value)
          }
          disabled={!permission.canEditQC}
          readOnly={!permission.canEditQC}
          style={{ width: '100%' }}
          InputLabelProps={{ shrink: true }}
        />
      </td>
      <td>Exp. Date:</td>
      <td>
        <input
          type="date"
          value={coatingState.batch.expiryDate}
          onChange={(e) =>
            handleBatchInputChange("expiryDate", e.target.value)
          }
          disabled={!permission.canEditQC}
          readOnly={!permission.canEditQC}
          style={{ width: '100%' }}
          InputLabelProps={{ shrink: true }}
        />
      </td>
    </tr>
    <tr>
      <td>Analysis Date:</td>
      <td>
        <input
          type="date"
          value={coatingState.batch.analysisDate}
          onChange={(e) =>
            handleBatchInputChange("analysisDate", e.target.value)
          }
          disabled={!permission.canEditQC}
          readOnly={!permission.canEditQC}
          style={{ width: '100%' }}
          InputLabelProps={{ shrink: true }}
        />
      </td>
      <td>Sample Type:</td>
      <td>
        <input
          value={coatingState.batch.sampleType}
          onChange={(e) =>
            handleBatchInputChange("sampleType", e.target.value)
          }
          disabled={!permission.canEditQC}
          readOnly={!permission.canEditQC}
          style={{ width: '100%' }}
        />
      </td>
    </tr>
  </tbody>
</table>

    
      <h2 className="text-2xl font-bold mb-4 text-center mt-4">Tests and Results</h2>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
            <TableCell className="text-center">S.No.</TableCell>
              <TableCell className="text-center">Parameters</TableCell>
              <TableCell className="text-center">Specification</TableCell>
              <TableCell className="text-center">Results</TableCell>
              <TableCell className="text-center actions-column">Actions</TableCell> 
            </TableRow>
          </TableHead>
          <TableBody>
            {coatingState.testAndResults.parameters.map((param, index) => (
              <TableRow key={index}>
                 <TableCell
                    className="text-center"
                
                >{index + 1}</TableCell>
                <TableCell
                    className="text-center"
                >
                  <TextField
                    multiline
                    value={param.parameters}
                    onChange={(e) =>
                      handleParameterChange(index, "parameters", e.target.value)
                    }
                    fullWidth
                    InputProps={{
                      readOnly: !permission.canEditQC,
                      disabled: !permission.canEditQC
                    }}
                  />
                </TableCell>
                <TableCell
                    className="text-center"
                >
                  <TextField
                    multiline
                    value={param.specification}
                    onChange={(e) =>
                      handleParameterChange(index, "specification", e.target.value)
                    }
                    fullWidth
                    InputProps={{
                      readOnly: !permission.canEditQC,
                      disabled: !permission.canEditQC
                    }}
                  />
                </TableCell>
                <TableCell
                    className="text-center"
                >
                  <TextField
                    multiline
                    value={param.results}
                    onChange={(e) =>
                      handleParameterChange(index, "results", e.target.value)
                    }
                    fullWidth
                    InputProps={{
                      readOnly: !permission.canEditQC,
                      disabled: !permission.canEditQC
                    }}
                  />
                </TableCell>
                <TableCell className="actions-column">
                                <Button disabled={!permission.canEditQC} onClick={() => handleDeleteParameter(index)} color="error" variant="contained">Delete</Button>
                            </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      <Button disabled={!permission.canEditQC} onClick={handleAddParameter} color="primary" variant="outlined">Add Row</Button>
          </TableContainer>

          <div className="mt-4">
          {/* REMARKS: label in bold */}
          <div>
            <strong>Remarks:</strong>
          </div>
          {/* TextField for the actual remarks */}
          <TextField
            label="" // Remove label since "REMARKS:" is already displayed
            multiline
            rows={4}
            fullWidth
            value={coatingState.testAndResults.remarks}
            onChange={(e) =>
              handleRemarksChange("remarks", e.target.value)
            }
            InputProps={{
              readOnly: !permission.canEditQC,
              disabled: !permission.canEditQC
            }}
          />
        </div>
          
          <table style={{ width: "100%", borderCollapse: "separate", borderSpacing: "20px"}}>
        <tr>
    <td>
        <p className="mt-4">Tested by: </p> 
        <span>
        <input
          value={coatingState.testAndResults.checkedByQCA}
          onChange={(e) =>
            handleTestAndResultsChange("checkedByQCA", e.target.value)
          }
        //   placeholder="Checked by QA"
          className="ml-2 border border-gray-300 p-1"
          disabled={!permission.canEditQC}
          readOnly={!permission.canEditQC}
          
        />
        <input
          type="date"
          value={coatingState.testAndResults.checkedByQCADate}
          onChange={(e) =>
            handleTestAndResultsChange("checkedByQCADate", e.target.value)
          }
          className="ml-2 border border-gray-300 p-1"
          disabled={!permission.canEditQC}
          readOnly={!permission.canEditQC}
          
        />
        <br/>
        <strong>Quality Control Analyst</strong>
    </span>
      </td>

      <td className="mt-6">
        <p className="mt-4">Checked by:</p>
        <span>
        <input
          value={coatingState.testAndResults.checkedByQCM}
          onChange={(e) =>
            handleTestAndResultsChange("checkedByQCM", e.target.value)
          }
          className="ml-2 border border-gray-300 p-1"
          disabled={!permission.canEditQC}
          readOnly={!permission.canEditQC}
          
        //   placeholder="Checked by QC"
        />
        <input
          type="date"
          value={coatingState.testAndResults.checkedByQCMDate}
          onChange={(e) =>
            handleTestAndResultsChange("checkedByQCMDate", e.target.value)
          }
          disabled={!permission.canEditQC}
          readOnly={!permission.canEditQC}
          
        />
        <br />
        <strong>Quality Control Manager</strong>
        </span>
      </td>
      </tr>
      </table>
    </div>
  );
}
