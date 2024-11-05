import React from "react";
import { Table, Form, Button } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { setPrinting } from "../../../../store/printingSlice";
import { TextField } from "@mui/material";

const BatchPackingFormPage1 = () => {
  const dispatch = useDispatch();
  const printing = useSelector((state) => state.printing);

  const handleWeighingprintingChange = (index, field, value) => {
    const newWeighingprinting = printing.batchQRecord.map(
      (item, idx) => (idx === index ? { ...item, [field]: value } : item)
    );
    dispatch(
      setPrinting({ ...printing, batchQRecord: newWeighingprinting })
    );
  };

  const handleCheckprintingChange = (name, value) => {
    const updatedCheckprinting = {
      ...printing.batchQRecordSignAndRemarks,
      [name]: value,
    };
    dispatch(
      setPrinting({ ...printing, batchQRecordSignAndRemarks: updatedCheckprinting })
    );
  };

  const addWeighingprintingRow = () => {
    const newWeighingprinting = [
      ...printing.batchQRecord,
      {
        material: "",
        grnNo: "",
        units: "",
        standard: "",
        actual: "",
        return: "",
        vendor: "",
        inProcess: "",
        totalRejection: "",
        packingStoreSupervisor: "",
        packingSupervisor: "",
      },
    ];
    dispatch(
      setPrinting({ ...printing, batchQRecord: newWeighingprinting })
    );
  };

  const deleteWeighingprintingRow = (index) => {
    const newWeighingprinting = printing.batchQRecord.filter(
      (_, idx) => idx !== index
    );
    dispatch(
      setPrinting({ ...printing, batchQRecord: newWeighingprinting })
    );
  };

  return (
    <div className="batch-manufacturing-form-page-2 p-4 ">
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
      <th>MATERIAL</th>
      <th>GRN No.</th>
      <th colSpan="4" style={{ borderRight: "1px solid #dee2e6", textAlign: "center" }}>
        Batch Quantity
      </th>
      <th colSpan="2" style={{ borderRight: "1px solid #dee2e6", textAlign: "center" }}>
        Rejection
      </th>
      <th>Total Rejection</th>
      <th rowSpan={2}>Packing Store Supervisor (Sign./Date)</th>
      <th rowSpan={2}>Packing Supervisor (Sign./Date)</th>
      <th>Actions</th>
    </tr>
    <tr>
      <th></th>
      <th></th>
      
      <th>Units</th>
      <th>Standard</th>
      <th>Actual</th>
      <th style={{ borderRight: "1px solid #dee2e6" }}>Return</th>
      <th>Vendor</th>
      <th>In Process</th>
      <th style={{ borderRight: "1px solid #dee2e6" }}></th>
      <th></th>
    
    </tr>
  </thead>
        <tbody>
          {printing.batchQRecord.map((row, index) => (
            <tr key={index}>
              <td>
                <Form.Control
                  type="text"
                  value={row.material}
                  onChange={(e) =>
                    handleWeighingprintingChange(
                      index,
                      "material",
                      e.target.value
                    )
                  }
                />
              </td>
              <td>
                <Form.Control
                  type="text"
                  value={row.grnNo}
                  onChange={(e) =>
                    handleWeighingprintingChange(
                      index,
                      "grnNo",
                      e.target.value
                    )
                  }
                />
              </td>
              <td>
                <Form.Control
                  type="text"
                  value={row.units}
                  onChange={(e) =>
                    handleWeighingprintingChange(
                      index,
                      "units",
                      e.target.value
                    )
                  }
                />
              </td>
              <td>
                <Form.Control
                  type="text"
                  value={row.standard}
                  onChange={(e) =>
                    handleWeighingprintingChange(
                      index,
                      "standard",
                      e.target.value
                    )
                  }
                />
              </td>
              <td>
                <Form.Control
                  type="text"
                  value={row.actual}
                  onChange={(e) =>
                    handleWeighingprintingChange(
                      index,
                      "actual",
                      e.target.value
                    )
                  }
                />
              </td>
              <td>
                <Form.Control
                  type="text"
                  value={row.return}
                  onChange={(e) =>
                    handleWeighingprintingChange(
                      index,
                      "return",
                      e.target.value
                    )
                  }
                />
              </td>
              <td>
                <Form.Control
                  type="text"
                  value={row.vendor}
                  onChange={(e) =>
                    handleWeighingprintingChange(
                      index,
                      "vendor",
                      e.target.value
                    )
                  }
                />
              </td>
              <td>
                <Form.Control
                  type="text"
                  value={row.inProcess}
                  onChange={(e) =>
                    handleWeighingprintingChange(
                      index,
                      "inProcess",
                      e.target.value
                    )
                  }
                />
              </td>
              <td>
                <Form.Control
                  type="text"
                  value={row.totalRejection}
                  onChange={(e) =>
                    handleWeighingprintingChange(
                      index,
                      "totalRejection",
                      e.target.value
                    )
                  }
                />
              </td>
              <td>
                <Form.Control
                  type="text"
                  value={row.packingStoreSupervisor}
                  onChange={(e) =>
                    handleWeighingprintingChange(
                      index,
                      "packingStoreSupervisor",
                      e.target.value
                    )
                  }
                />
              </td>
              <td>
                <Form.Control
                  type="text"
                  value={row.packingSupervisor}
                  onChange={(e) =>
                    handleWeighingprintingChange(
                      index,
                      "packingSupervisor",
                      e.target.value
                    )
                  }
                />
              </td>
              <td className="actions-column">
                <Button
                  variant="outline-danger"
                  onClick={() => deleteWeighingprintingRow(index)}
                >
                  Delete
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
      <Button onClick={addWeighingprintingRow} className="mt-2">
        Add Row
      </Button>
      <div className="mt-4">
          {/* REMARKS: label in bold */}
          <div>
          <strong>REMARKS:</strong> <br />
          <strong>History:</strong> This is a new format of Batch Packing Record (BPR).
          </div>
          {/* TextField for the actual remarks */}
          <TextField
            label="" // Remove label since "REMARKS:" is already displayed
            multiline
            fullWidth
            value={printing.batchQRecordSignAndRemarks.remarks}
            onChange={(e) =>
              handleCheckprintingChange("remarks", e.target.value)
            }
          />
        </div>
      <div className="mt-5">
        <Table bordered>
          <thead>
            <tr>
              <th>
                Manufacturing Date <br /> (Month/Year)
              </th>
              <th>
              Expiry Date <br /> (Month/Year)
              </th>
              <th>
              Packaging Started <br /> (Day/Month/Year)
              </th>
              <th>
              Packaging Completed <br /> (Month/Year)
              </th>
            </tr>
          </thead>
          <tbody>
          <tr>
<td>
  <Form.Control
    type="date"
    name="manufacturingDate"
    value={
      printing.batchQRecordSignAndRemarks.manufacturingDate ||
      ""
    }
    onChange={(e) =>
      handleCheckprintingChange(
        "manufacturingDate",
        e.target.value
      )
    }
  />
</td>
<td>
  <Form.Control
    type="date"
    name="expiryDate"
    value={printing.batchQRecordSignAndRemarks.expiryDate || ""}
    onChange={(e) =>
      handleCheckprintingChange(
        "expiryDate",
        e.target.value
      )
    }
  />
</td>
<td>
  <Form.Control
    type="date"
    name="packagingStarted"
    value={
      printing.batchQRecordSignAndRemarks.packagingStarted ||
      ""
    }
    onChange={(e) =>
      handleCheckprintingChange(
        "packagingStarted",
        e.target.value
      )
    }
  />
</td>
<td>
  <Form.Control
    type="date"
    name="packagingCompleted"
    value={printing.batchQRecordSignAndRemarks.packagingCompleted || ""}
    onChange={(e) =>
      handleCheckprintingChange(
        "packagingCompleted",
        e.target.value
      )
    }
  />
</td>
        </tr>
          </tbody>
        </Table>
      </div>

      <div className="mt-5">
        <Table bordered>
          <thead>
            <tr>
              <th>
                Production MAnager<br /> (Sign & Date)
              </th>
              <th>
              Material Issued by (In-charge Packing Material) <br /> (Sign & Date)
              </th>
              <th>
              Material Checked and recieved by (Production)<br /> (Sign & Date)
              </th>
            </tr>
          </thead>
          <tbody>
          <tr>
              <td>
                <Form.Control
                  name="productionManager"
                  value={
                    printing.batchQRecordSignAndRemarks.productionManager ||
                    ""
                  }
                  onChange={(e) =>
                    handleCheckprintingChange(
                      "productionManager",
                      e.target.value
                    )
                  }
                />
                <Form.Control
                  type="date"
                  name="datePM"
                  value={printing.batchQRecordSignAndRemarks.datePM || ""}
                  onChange={(e) =>
                    handleCheckprintingChange("datePM", e.target.value)
                  }
                />
              </td>
              <td>
                <Form.Control
                  name="materialIssuedBy"
                  value={printing.batchQRecordSignAndRemarks.materialIssuedBy || ""}
                  onChange={(e) =>
                    handleCheckprintingChange(
                      "materialIssuedBy",
                      e.target.value
                    )
                  }
                />
                <Form.Control
                  type="date"
                  name="dateMIB"
                  value={printing.batchQRecordSignAndRemarks.dateMIB || ""}
                  onChange={(e) =>
                    handleCheckprintingChange("dateMIB", e.target.value)
                  }
                />
              </td>
              <td>
                <Form.Control
                  name="materialCheckedAndRecievedBy"
                  value={
                    printing.batchQRecordSignAndRemarks.materialCheckedAndRecievedBy ||
                    ""
                  }
                  onChange={(e) =>
                    handleCheckprintingChange(
                      "materialCheckedAndRecievedBy",
                      e.target.value
                    )
                  }
                />
                <Form.Control
                  type="date"
                  name="dateCARB"
                  value={printing.batchQRecordSignAndRemarks.dateCARB || ""}
                  onChange={(e) =>
                    handleCheckprintingChange("dateCARB", e.target.value)
                  }
                />
              </td>
            </tr>
          </tbody>
        </Table>
      </div>
    </div>
  );
};

export default BatchPackingFormPage1;
