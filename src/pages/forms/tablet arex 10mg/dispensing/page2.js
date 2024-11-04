import React from "react";
import { Table, Form, Button } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { setDispensing } from "../../../../store/dispensingSlice";

const BatchManufacturingFormPage2 = () => {
  const dispatch = useDispatch();
  const dispensing = useSelector((state) => state.dispensing);

  const handleWeighingdispensingChange = (index, field, value) => {
    const newWeighingdispensing = dispensing.weighingRecordRaw.map(
      (item, idx) => (idx === index ? { ...item, [field]: value } : item)
    );
    dispatch(
      setDispensing({ ...dispensing, weighingRecordRaw: newWeighingdispensing })
    );
  };

  const handleCheckdispensingChange = (name, value) => {
    const updatedCheckdispensing = {
      ...dispensing.checkRecordRaw,
      [name]: value,
    };
    dispatch(
      setDispensing({ ...dispensing, checkRecordRaw: updatedCheckdispensing })
    );
  };

  const addWeighingdispensingRow = () => {
    const newWeighingdispensing = [
      ...dispensing.weighingRecordRaw,
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
      setDispensing({ ...dispensing, weighingRecordRaw: newWeighingdispensing })
    );
  };

  const deleteWeighingdispensingRow = (index) => {
    const newWeighingdispensing = dispensing.weighingRecordRaw.filter(
      (_, idx) => idx !== index
    );
    dispatch(
      setDispensing({ ...dispensing, weighingRecordRaw: newWeighingdispensing })
    );
  };

  return (
    <div className="batch-manufacturing-form-page-2 p-4 ">
      <h5 className="text-lg font-semibold mt-5">
        Weighing dispensing Sheet Dispensing (Raw Material):
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
          {dispensing.weighingRecordRaw.map((row, index) => (
            <tr key={index}>
              <td>{index + 1}</td>
              <td>
                <Form.Control
                  type="text"
                  value={row.item}
                  onChange={(e) =>
                    handleWeighingdispensingChange(
                      index,
                      "item",
                      e.target.value
                    )
                  }
                />
              </td>
              <td>
                <Form.Control
                  type="text"
                  value={row.unit}
                  onChange={(e) =>
                    handleWeighingdispensingChange(
                      index,
                      "unit",
                      e.target.value
                    )
                  }
                />
              </td>
              <td>
                <Form.Control
                  type="text"
                  value={row.tareWt}
                  onChange={(e) =>
                    handleWeighingdispensingChange(
                      index,
                      "tareWt",
                      e.target.value
                    )
                  }
                />
              </td>
              <td>
                <Form.Control
                  type="text"
                  value={row.netWt}
                  onChange={(e) =>
                    handleWeighingdispensingChange(
                      index,
                      "netWt",
                      e.target.value
                    )
                  }
                />
              </td>
              <td>
                <Form.Control
                  type="text"
                  value={row.grossWt}
                  onChange={(e) =>
                    handleWeighingdispensingChange(
                      index,
                      "grossWt",
                      e.target.value
                    )
                  }
                />
              </td>
              <td>
                <Form.Control
                  type="text"
                  value={row.noOfContainers}
                  onChange={(e) =>
                    handleWeighingdispensingChange(
                      index,
                      "noOfContainers",
                      e.target.value
                    )
                  }
                />
              </td>
              <td className="actions-column">
                <Button
                  variant="outline-danger"
                  onClick={() => deleteWeighingdispensingRow(index)}
                >
                  Delete
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
      <Button onClick={addWeighingdispensingRow} className="mt-2">
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
                Checked by QA Officer
                <br /> Sign & Date
              </th>
              <th>
                Received by Production Pharmacist
                <br /> Sign & Date
              </th>
              <th>
                Received by Supervisor
                <br /> Sign & Date
              </th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>
                <Form.Control
                  name="checkedByDispensingPharmacist"
                  value={
                    dispensing.checkRecordRaw.checkedByDispensingPharmacist ||
                    ""
                  }
                  onChange={(e) =>
                    handleCheckdispensingChange(
                      "checkedByDispensingPharmacist",
                      e.target.value
                    )
                  }
                />
                <Form.Control
                  type="date"
                  name="dateDP"
                  value={dispensing.checkRecordRaw.dateDP || ""}
                  onChange={(e) =>
                    handleCheckdispensingChange("dateDP", e.target.value)
                  }
                />
              </td>
              <td>
                <Form.Control
                  name="checkedByQAOfficer"
                  value={dispensing.checkRecordRaw.checkedByQAOfficer || ""}
                  onChange={(e) =>
                    handleCheckdispensingChange(
                      "checkedByQAOfficer",
                      e.target.value
                    )
                  }
                />
                <Form.Control
                  type="date"
                  name="dateQA"
                  value={dispensing.checkRecordRaw.dateQA || ""}
                  onChange={(e) =>
                    handleCheckdispensingChange("dateQA", e.target.value)
                  }
                />
              </td>
              <td>
                <Form.Control
                  name="receivedByProductionPharmacist"
                  value={
                    dispensing.checkRecordRaw.receivedByProductionPharmacist ||
                    ""
                  }
                  onChange={(e) =>
                    handleCheckdispensingChange(
                      "receivedByProductionPharmacist",
                      e.target.value
                    )
                  }
                />
                <Form.Control
                  type="date"
                  name="datePP"
                  value={dispensing.checkRecordRaw.datePP || ""}
                  onChange={(e) =>
                    handleCheckdispensingChange("datePP", e.target.value)
                  }
                />
              </td>
              <td>
                <Form.Control
                  name="receivedBySupervisor"
                  value={dispensing.checkRecordRaw.receivedBySupervisor || ""}
                  onChange={(e) =>
                    handleCheckdispensingChange(
                      "receivedBySupervisor",
                      e.target.value
                    )
                  }
                />
                <Form.Control
                  type="date"
                  name="dateS"
                  value={dispensing.checkRecordRaw.dateS || ""}
                  onChange={(e) =>
                    handleCheckdispensingChange("dateS", e.target.value)
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

export default BatchManufacturingFormPage2;
