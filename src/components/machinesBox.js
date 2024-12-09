import React from 'react';
import Chip from "@mui/material/Chip";

const SelectedMachinesDisplay = ({ machines, selectedMachines }) => {
  // Filter the full machines list to only show selected machines
  const selectedMachineDetails = machines.flatMap((machineCategory) => 
    machineCategory.equipmentList.filter((machine) => 
      selectedMachines.includes(machine.Equipment_Code)
    )
  );

  if (selectedMachineDetails.length === 0) {
    return null;
  }

  return (
    <div className="bg-gray-100 p-4 rounded-lg border border-gray-200 mt-4">
      <h3 className="text-md font-semibold mb-2 text-gray-700">Selected Machines</h3>
      <div className="flex flex-wrap gap-2">
        {selectedMachineDetails.map((machine) => (
          <div 
            key={machine.Equipment_Code} 
            className="bg-white px-3 py-1 rounded-full text-sm flex items-center space-x-2 shadow-sm"
          >
            <Chip className="w-4 h-4 text-blue-500" />
            <span>{machine.Equipment_Name}</span>
            <span className="text-gray-500 text-xs">({machine.Equipment_Code})</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SelectedMachinesDisplay;