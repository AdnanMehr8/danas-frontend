import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { setsCompressionRecord } from "../../../../store/sulpeol/compressionSlice";
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
  const scompressionState = useSelector((state) => state.scompression);

  const handleInputChange = (index, field, value) => {
    const updatedParameters = [
      ...scompressionState.compressionSpecifications.parameters,
    ];
    updatedParameters[index] = { ...updatedParameters[index], [field]: value };

    dispatch(
      setsCompressionRecord({
        ...scompressionState,
        compressionSpecifications: {
          ...scompressionState.compressionSpecifications,
          parameters: updatedParameters,
        },
      })
    );
  };

  const handleQACheckChange = (value) => {
    dispatch(
      setsCompressionRecord({
        ...scompressionState,
        compressionSpecifications: {
          ...scompressionState.compressionSpecifications,
          checkedByQA: value,
        },
      })
    );
  };
  const handleQADateCheckChange = (value) => {
    dispatch(
      setsCompressionRecord({
        ...scompressionState,
        compressionSpecifications: {
          ...scompressionState.compressionSpecifications,
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
          {["", "", "", " ", " ", " ", "", " "].map((param, index) => (
            <tr key={index}>
              <td className="border border-gray-300 p-2 text-center">
                <TextField
                  value={
                    scompressionState.compressionSpecifications.parameters[index]
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
                    scompressionState.compressionSpecifications.parameters[index]
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
                    scompressionState.compressionSpecifications.parameters[index]
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
            value={scompressionState.compressionSpecifications.checkedByQA}
            onChange={(e) => handleQACheckChange(e.target.value)}
          />
          <input
            type="date"
            value={scompressionState.compressionSpecifications.checkedByQADate}
            onChange={(e) => handleQADateCheckChange(e.target.value)}
          />
          <br />
          (Sign & Date)
        </div>
      </div>
    </div>
  );
}
