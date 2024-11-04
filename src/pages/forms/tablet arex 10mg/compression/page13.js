import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { setCompressionRecord } from "../../../../store/compressionSlice";
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
} from "@mui/material";
import { useNavigate } from "react-router-dom";

export default function BatchManufacturingFormPage13() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const compressionState = useSelector((state) => state.compression);

  const handleInputChange = (index, field, value) => {
    const updatedParameters = [
      ...compressionState.compressionSpecifications.parameters,
    ];
    updatedParameters[index] = { ...updatedParameters[index], [field]: value };

    dispatch(
      setCompressionRecord({
        ...compressionState,
        compressionSpecifications: {
          ...compressionState.compressionSpecifications,
          parameters: updatedParameters,
        },
      })
    );
  };

  const handleQACheckChange = (value) => {
    dispatch(
      setCompressionRecord({
        ...compressionState,
        compressionSpecifications: {
          ...compressionState.compressionSpecifications,
          checkedByQA: value,
        },
      })
    );
  };
  const handleQADateCheckChange = (value) => {
    dispatch(
      setCompressionRecord({
        ...compressionState,
        compressionSpecifications: {
          ...compressionState.compressionSpecifications,
          checkedByQADate: value,
        },
      })
    );
  };

  return (
    <div className="p-4 mb-4">
      <h2 className="text-2xl font-bold mb-4 text-center">
        Compression Specifications:
      </h2>

      <table className="w-full border-collapse border border-gray-300">
        <thead>
          <tr className="bg-gray-100">
            <th className="text-center border">Parameters</th>
            <th className="text-center border">Specification</th>
            <th className="text-center border">Results</th>
          </tr>
        </thead>

        <tbody>
          {["", "", "", " ", " ", " ", "", " ", ""].map((param, index) => (
            <tr key={index}>
              <td className="border border-gray-300 p-2 text-center">
                <TextField
                  value={
                    compressionState.compressionSpecifications.parameters[index]
                      ?.parameters || param
                  }
                  onChange={(e) =>
                    handleInputChange(index, "parameters", e.target.value)
                  }
                  fullWidth
                  multiline
                />
              </td>
              <td className="border border-gray-300 p-2 text-center">
                <TextField
                  fullWidth
                  multiline
                  value={
                    compressionState.compressionSpecifications.parameters[index]
                      ?.specification || ""
                  }
                  onChange={(e) =>
                    handleInputChange(index, "specification", e.target.value)
                  }
                />
              </td>
              <td className="border border-gray-300 p-2 text-center">
                <TextField
                  fullWidth
                  multiline
                  value={
                    compressionState.compressionSpecifications.parameters[index]
                      ?.results || ""
                  }
                  onChange={(e) =>
                    handleInputChange(index, "results", e.target.value)
                  }
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {/* </TableContainer> */}

      <div
        style={{
          width: "100%",
          display: "flex",
          justifyContent: "space-between",
          gap: "1000px",
        }}
        className="mt-4"
      >
        <div className=" mr-4">
          {" "}
          {/* Add margin to the right */}
          <p>Checked by QA</p>
          <input
            value={compressionState.compressionSpecifications.checkedByQA}
            onChange={(e) => handleQACheckChange(e.target.value)}
          />
          <input
            type="date"
            value={compressionState.compressionSpecifications.checkedByQADate}
            onChange={(e) => handleQADateCheckChange(e.target.value)}
          />
          <br />
          (Sign & Date)
        </div>
      </div>
    </div>
  );
}
