import React from "react";
import { Table, Form, Button } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { setDispensing } from "../../../../store/dispensingSlice";
import { Plus } from "lucide-react";
import { usePermissions } from "../../../../hooks/usePermissions";

const BatchManufacturingFormPage3 = ({ isReport }) => {
  const dispatch = useDispatch();
  const dispensing = useSelector((state) => state.dispensing);
  const { hasPermission } = usePermissions();

  const permission = {
    canReadProduction: isReport ? true : hasPermission('production', 'read'),
    canReadQA: isReport ? true : hasPermission('qa', 'read'),
    canEditProduction: isReport ? true : hasPermission('production', 'update'),
    canEditQA: isReport ? true : hasPermission('qa', 'update')
  };

  const handleWeighingRecordChange = (index, field, value) => {
    if (!permission.canEditProduction) return;

    const newWeighingRecord = dispensing.weighingRecordCoating.map(
      (item, idx) => (idx === index ? { ...item, [field]: value } : item)
    );
    dispatch(
      setDispensing({ ...dispensing, weighingRecordCoating: newWeighingRecord })
    );
  };

  const handleCheckRecordChange = (name, value) => {
     // Determine if the field is QA-specific or production-specific
     const qaFields = ['checkedByQAOfficer', 'dateQA'];
     const productionFields = [
       'checkedByDispensingPharmacist', 'dateDP', 
       'receivedByProductionPharmacist', 'datePP', 
       'receivedBySupervisor', 'dateS'
    ];
    
    // Check permissions based on the field
    if ((qaFields.includes(name) && !permission.canEditQA) ||
        (productionFields.includes(name) && !permission.canEditProduction)) {
      return;
    }

    const updatedCheckRecord = {
      ...dispensing.checkRecordCoating,
      [name]: value,
    };
    dispatch(
      setDispensing({ ...dispensing, checkRecordCoating: updatedCheckRecord })
    );
  };

  const addWeighingRecordRow = () => {
    if (!permission.canEditProduction) return;

    const newWeighingRecord = [
      ...dispensing.weighingRecordCoating,
      {
        item: "",
        unit: "",
        tareWt: "",
        netWt: "",
        grossWt: "",
        noOfContainers: "",
      },
    ];
    dispatch(
      setDispensing({ ...dispensing, weighingRecordCoating: newWeighingRecord })
    );
  };

  const deleteWeighingRecordRow = (index) => {
    if (!permission.canEditProduction) return;

    const newWeighingRecord = dispensing.weighingRecordCoating.filter(
      (_, idx) => idx !== index
    );
    dispatch(
      setDispensing({ ...dispensing, weighingRecordCoating: newWeighingRecord })
    );
  };

  if (!(permission.canReadProduction || permission.canReadQA)) {
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
    <div className="batch-manufacturing-form-page-2 p-4 ">
      <h5 className="text-lg font-semibold mt-5">
        Weighing Record Sheet Dispensing (Coating Material):
      </h5>
      <Table bordered>
        <thead>
          <tr>
            <th>S.#</th>
            <th>Item</th>
            <th>Unit</th>
            <th>Tare Wt.</th>
            <th>Net Wt.</th>
            <th>Gross Wt.</th>
            <th>No. of Containers</th>
            <th className="actions-column">Actions</th>
          </tr>
        </thead>
        <tbody>
          {dispensing.weighingRecordCoating.map((row, index) => (
            <tr key={index}>
              <td>{index + 1}</td>
              <td>
                <Form.Control
                  type="text"
                  value={row.item}
                  onChange={(e) =>
                    handleWeighingRecordChange(index, "item", e.target.value)
                  }
                  readOnly={!permission.canEditProduction}
                  disabled={!permission.canEditProduction}
                />
              </td>
              <td>
                <Form.Control
                  type="text"
                  value={row.unit}
                  onChange={(e) =>
                    handleWeighingRecordChange(index, "unit", e.target.value)
                  }
                  readOnly={!permission.canEditProduction}
                  disabled={!permission.canEditProduction}
                />
              </td>
              <td>
                <Form.Control
                  type="text"
                  value={row.tareWt}
                  onChange={(e) =>
                    handleWeighingRecordChange(index, "tareWt", e.target.value)
                  }
                  readOnly={!permission.canEditProduction}
                  disabled={!permission.canEditProduction}
                />
              </td>
              <td>
                <Form.Control
                  type="text"
                  value={row.netWt}
                  onChange={(e) =>
                    handleWeighingRecordChange(index, "netWt", e.target.value)
                  }
                  readOnly={!permission.canEditProduction}
                  disabled={!permission.canEditProduction}
                />
              </td>
              <td>
                <Form.Control
                  type="text"
                  value={row.grossWt}
                  onChange={(e) =>
                    handleWeighingRecordChange(index, "grossWt", e.target.value)
                  }
                  readOnly={!permission.canEditProduction}
                  disabled={!permission.canEditProduction}
                />
              </td>
              <td>
                <Form.Control
                  type="text"
                  value={row.noOfContainers}
                  onChange={(e) =>
                    handleWeighingRecordChange(
                      index,
                      "noOfContainers",
                      e.target.value
                    )
                  }
                  readOnly={!permission.canEditProduction}
                  disabled={!permission.canEditProduction}
                />
              </td>
              <td className="actions-column">
                <Button
                  variant="outline-danger"
                  onClick={() => deleteWeighingRecordRow(index)}
                  disabled={!permission.canEditProduction}
                >
                  Delete
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
      <Button
        onClick={addWeighingRecordRow}
        className="mt-2"
        variant="contained"
        color="primary"
        startIcon={<Plus className="w-4 h-4" />}
        disabled={!permission.canEditProduction}
      >
        Add Row
      </Button>

      <div className="mt-5">
        <Table bordered>
          <thead>
            <tr>
              <th>
                Checked by Dispensing Pharmacist <br /> Sign & Date
              </th>
              <th>
                Checked by QA Officer <br /> Sign & Date
              </th>
              <th>
                Received by Production Pharmacist <br /> Sign & Date
              </th>
              <th>
                Received by Supervisor <br /> Sign & Date
              </th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>
                <Form.Control
                  name="checkedByDispensingPharmacist"
                  value={
                    dispensing.checkRecordCoating
                      .checkedByDispensingPharmacist || ""
                  }
                  onChange={(e) =>
                    handleCheckRecordChange(
                      "checkedByDispensingPharmacist",
                      e.target.value
                    )
                  }
                  readOnly={!permission.canEditProduction}
                  disabled={!permission.canEditProduction}
                />
                <Form.Control
                  type="date"
                  name="dateDP"
                  value={dispensing.checkRecordCoating.dateDP || ""}
                  onChange={(e) =>
                    handleCheckRecordChange("dateDP", e.target.value)
                  }
                  readOnly={!permission.canEditProduction}
                  disabled={!permission.canEditProduction}
                />
              </td>
              <td>
                <Form.Control
                  name="checkedByQAOfficer"
                  value={dispensing.checkRecordCoating.checkedByQAOfficer || ""}
                  onChange={(e) =>
                    handleCheckRecordChange(
                      "checkedByQAOfficer",
                      e.target.value
                    )
                  }
                  readOnly={!permission.canEditQA}
                  disabled={!permission.canEditQA}
                />
                <Form.Control
                  type="date"
                  name="dateQA"
                  value={dispensing.checkRecordCoating.dateQA || ""}
                  onChange={(e) =>
                    handleCheckRecordChange("dateQA", e.target.value)
                  }
                  readOnly={!permission.canEditQA}
                  disabled={!permission.canEditQA}
                />
              </td>
              <td>
                <Form.Control
                  name="receivedByProductionPharmacist"
                  value={
                    dispensing.checkRecordCoating
                      .receivedByProductionPharmacist || ""
                  }
                  onChange={(e) =>
                    handleCheckRecordChange(
                      "receivedByProductionPharmacist",
                      e.target.value
                    )
                  }
                  readOnly={!permission.canEditProduction}
                  disabled={!permission.canEditProduction}
                />
                <Form.Control
                  type="date"
                  name="datePP"
                  value={dispensing.checkRecordCoating.datePP || ""}
                  onChange={(e) =>
                    handleCheckRecordChange("datePP", e.target.value)
                  }
                  readOnly={!permission.canEditProduction}
                  disabled={!permission.canEditProduction}
                />
              </td>
              <td>
                <Form.Control
                  name="receivedBySupervisor"
                  value={
                    dispensing.checkRecordCoating.receivedBySupervisor || ""
                  }
                  onChange={(e) =>
                    handleCheckRecordChange(
                      "receivedBySupervisor",
                      e.target.value
                    )
                  }
                  readOnly={!permission.canEditProduction}
                  disabled={!permission.canEditProduction}
                />
                <Form.Control
                  type="date"
                  name="dateS"
                  value={dispensing.checkRecordCoating.dateS || ""}
                  onChange={(e) =>
                    handleCheckRecordChange("dateS", e.target.value)
                  }
                  readOnly={!permission.canEditProduction}
                  disabled={!permission.canEditProduction}
                />
              </td>
            </tr>
          </tbody>
        </Table>
      </div>
    </div>
  );
};

export default BatchManufacturingFormPage3;
