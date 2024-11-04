import React from "react";
import { Table, Form, Button } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { setsDispensing } from "../../../../store/sulpeol/dispensingSlice";

const BatchManufacturingFormPage2 = () => {
  const dispatch = useDispatch();
  const sdispensing = useSelector((state) => state.sdispensing);

  const handleWeighingsdispensingChange = (index, field, value) => {
    const newWeighingsdispensing = sdispensing.weighingRecordRaw.map(
      (item, idx) => (idx === index ? { ...item, [field]: value } : item)
    );
    dispatch(
      setsDispensing({ ...sdispensing, weighingRecordRaw: newWeighingsdispensing })
    );
  };

  const handleChecksdispensingChange = (name, value) => {
    const updatedChecksdispensing = {
      ...sdispensing.checkRecordRaw,
      [name]: value,
    };
    dispatch(
      setsDispensing({ ...sdispensing, checkRecordRaw: updatedChecksdispensing })
    );
  };

  const addWeighingsdispensingRow = () => {
    const newWeighingsdispensing = [
      ...sdispensing.weighingRecordRaw,
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
      setsDispensing({ ...sdispensing, weighingRecordRaw: newWeighingsdispensing })
    );
  };

  const deleteWeighingsdispensingRow = (index) => {
    const newWeighingsdispensing = sdispensing.weighingRecordRaw.filter(
      (_, idx) => idx !== index
    );
    dispatch(
      setsDispensing({ ...sdispensing, weighingRecordRaw: newWeighingsdispensing })
    );
  };

  return (
    <div className="batch-manufacturing-form-page-2 p-4 ">
      <h5 className="text-lg font-semibold mt-5">
        Weighing sdispensing Sheet Dispensing:
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
          {sdispensing.weighingRecordRaw.map((row, index) => (
            <tr key={index}>
              <td>{index + 1}</td>
              <td>
                <Form.Control
                  type="text"
                  value={row.item}
                  onChange={(e) =>
                    handleWeighingsdispensingChange(
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
                    handleWeighingsdispensingChange(
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
                    handleWeighingsdispensingChange(
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
                    handleWeighingsdispensingChange(
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
                    handleWeighingsdispensingChange(
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
                    handleWeighingsdispensingChange(
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
                  onClick={() => deleteWeighingsdispensingRow(index)}
                >
                  Delete
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
      <Button onClick={addWeighingsdispensingRow} className="mt-2">
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
                    sdispensing.checkRecordRaw.checkedByDispensingPharmacist ||
                    ""
                  }
                  onChange={(e) =>
                    handleChecksdispensingChange(
                      "checkedByDispensingPharmacist",
                      e.target.value
                    )
                  }
                />
                <Form.Control
                  type="date"
                  name="dateDP"
                  value={sdispensing.checkRecordRaw.dateDP || ""}
                  onChange={(e) =>
                    handleChecksdispensingChange("dateDP", e.target.value)
                  }
                />
              </td>
              <td>
                <Form.Control
                  name="checkedByQAOfficer"
                  value={sdispensing.checkRecordRaw.checkedByQAOfficer || ""}
                  onChange={(e) =>
                    handleChecksdispensingChange(
                      "checkedByQAOfficer",
                      e.target.value
                    )
                  }
                />
                <Form.Control
                  type="date"
                  name="dateQA"
                  value={sdispensing.checkRecordRaw.dateQA || ""}
                  onChange={(e) =>
                    handleChecksdispensingChange("dateQA", e.target.value)
                  }
                />
              </td>
              <td>
                <Form.Control
                  name="receivedByProductionPharmacist"
                  value={
                    sdispensing.checkRecordRaw.receivedByProductionPharmacist ||
                    ""
                  }
                  onChange={(e) =>
                    handleChecksdispensingChange(
                      "receivedByProductionPharmacist",
                      e.target.value
                    )
                  }
                />
                <Form.Control
                  type="date"
                  name="datePP"
                  value={sdispensing.checkRecordRaw.datePP || ""}
                  onChange={(e) =>
                    handleChecksdispensingChange("datePP", e.target.value)
                  }
                />
              </td>
              <td>
                <Form.Control
                  name="receivedBySupervisor"
                  value={sdispensing.checkRecordRaw.receivedBySupervisor || ""}
                  onChange={(e) =>
                    handleChecksdispensingChange(
                      "receivedBySupervisor",
                      e.target.value
                    )
                  }
                />
                <Form.Control
                  type="date"
                  name="dateS"
                  value={sdispensing.checkRecordRaw.dateS || ""}
                  onChange={(e) =>
                    handleChecksdispensingChange("dateS", e.target.value)
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
