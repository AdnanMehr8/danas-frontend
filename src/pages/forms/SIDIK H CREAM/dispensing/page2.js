import React from "react";
import { Table, Form, Button } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { setscDispensing } from "../../../../store/sidikcream/dispensingSlice";

const BatchManufacturingFormPage2 = () => {
  const dispatch = useDispatch();
  const scdispensing = useSelector((state) => state.scdispensing);

  const handleWeighingscdispensingChange = (index, field, value) => {
    const newWeighingscdispensing = scdispensing.weighingRecordRaw.map(
      (item, idx) => (idx === index ? { ...item, [field]: value } : item)
    );
    dispatch(
      setscDispensing({ ...scdispensing, weighingRecordRaw: newWeighingscdispensing })
    );
  };

  const handleCheckscdispensingChange = (name, value) => {
    const updatedCheckscdispensing = {
      ...scdispensing.checkRecordRaw,
      [name]: value,
    };
    dispatch(
      setscDispensing({ ...scdispensing, checkRecordRaw: updatedCheckscdispensing })
    );
  };

  const addWeighingscdispensingRow = () => {
    const newWeighingscdispensing = [
      ...scdispensing.weighingRecordRaw,
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
      setscDispensing({ ...scdispensing, weighingRecordRaw: newWeighingscdispensing })
    );
  };

  const deleteWeighingscdispensingRow = (index) => {
    const newWeighingscdispensing = scdispensing.weighingRecordRaw.filter(
      (_, idx) => idx !== index
    );
    dispatch(
      setscDispensing({ ...scdispensing, weighingRecordRaw: newWeighingscdispensing })
    );
  };

  return (
    <div className="batch-manufacturing-form-page-2 p-4 ">
      <h5 className="text-lg font-semibold mt-5">
      Weighing Record Sheet Dispensing::
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
          {scdispensing.weighingRecordRaw.map((row, index) => (
            <tr key={index}>
              <td>{index + 1}</td>
              <td>
                <Form.Control
                  type="text"
                  value={row.item}
                  onChange={(e) =>
                    handleWeighingscdispensingChange(
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
                    handleWeighingscdispensingChange(
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
                    handleWeighingscdispensingChange(
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
                    handleWeighingscdispensingChange(
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
                    handleWeighingscdispensingChange(
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
                    handleWeighingscdispensingChange(
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
                  onClick={() => deleteWeighingscdispensingRow(index)}
                >
                  Delete
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
      <Button onClick={addWeighingscdispensingRow} className="mt-2">
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
                    scdispensing.checkRecordRaw.checkedByDispensingPharmacist ||
                    ""
                  }
                  onChange={(e) =>
                    handleCheckscdispensingChange(
                      "checkedByDispensingPharmacist",
                      e.target.value
                    )
                  }
                />
                <Form.Control
                  type="date"
                  name="dateDP"
                  value={scdispensing.checkRecordRaw.dateDP || ""}
                  onChange={(e) =>
                    handleCheckscdispensingChange("dateDP", e.target.value)
                  }
                />
              </td>
              <td>
                <Form.Control
                  name="checkedByQAOfficer"
                  value={scdispensing.checkRecordRaw.checkedByQAOfficer || ""}
                  onChange={(e) =>
                    handleCheckscdispensingChange(
                      "checkedByQAOfficer",
                      e.target.value
                    )
                  }
                />
                <Form.Control
                  type="date"
                  name="dateQA"
                  value={scdispensing.checkRecordRaw.dateQA || ""}
                  onChange={(e) =>
                    handleCheckscdispensingChange("dateQA", e.target.value)
                  }
                />
              </td>
              <td>
                <Form.Control
                  name="receivedByProductionPharmacist"
                  value={
                    scdispensing.checkRecordRaw.receivedByProductionPharmacist ||
                    ""
                  }
                  onChange={(e) =>
                    handleCheckscdispensingChange(
                      "receivedByProductionPharmacist",
                      e.target.value
                    )
                  }
                />
                <Form.Control
                  type="date"
                  name="datePP"
                  value={scdispensing.checkRecordRaw.datePP || ""}
                  onChange={(e) =>
                    handleCheckscdispensingChange("datePP", e.target.value)
                  }
                />
              </td>
              <td>
                <Form.Control
                  name="receivedBySupervisor"
                  value={scdispensing.checkRecordRaw.receivedBySupervisor || ""}
                  onChange={(e) =>
                    handleCheckscdispensingChange(
                      "receivedBySupervisor",
                      e.target.value
                    )
                  }
                />
                <Form.Control
                  type="date"
                  name="dateS"
                  value={scdispensing.checkRecordRaw.dateS || ""}
                  onChange={(e) =>
                    handleCheckscdispensingChange("dateS", e.target.value)
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
