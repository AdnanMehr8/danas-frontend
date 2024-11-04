import React, { useEffect, useState } from "react";
import axios from "axios";
import "./Machines.css";
const EquipmentTable = () => {
  const [equipmentData, setEquipmentData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchEquipmentData = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/equipment");
        setEquipmentData(response.data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchEquipmentData();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div>
      <h2 className="text-center">Equipment List</h2>
      <table>
        <thead>
          <tr>
            <th>Category</th>
            <th>S.No</th>
            <th>Equipment Name</th>
            <th>Make / Mfg By</th>
            <th>Capacity</th>
            <th>Equipment Code</th>
          </tr>
        </thead>
        <tbody>
          {equipmentData.map((equipment) =>
            equipment.equipmentList.map((item) => (
              <tr key={item.Equipment_Code}>
                <td>{item.S_No}</td>
                <td>{equipment.category}</td>
                <td>{item.Equipment_Name}</td>
                <td>{item.Make_Mfg_by}</td>
                <td>{item.Capacity}</td>
                <td>{item.Equipment_Code}</td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
};

export default EquipmentTable;
