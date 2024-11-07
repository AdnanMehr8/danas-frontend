import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  batch: {
    productName: "",
    batchNo: "",
    batchSize: "",
    noOfPacks: "",
    noOfTablets: "",
    packsSize: "",
    expiryDate: "",
    mfgLicense: "",
    productRegNo: "",
    validFrom: "",
    mrpRs: ""
  },
};

export const batchInfoSlicePacking = createSlice({
  name: "batchInfoPacking",
  initialState,
  reducers: {
    setBatchPInfo: (state, action) => {
      console.log("Dispatching setBatchInfo with payload:", action.payload);
      const { batch } = action.payload;

      // Update state with the payload
      state.batch = { ...state.batch, ...batch };

      // Save to local storage
      localStorage.setItem("batchInfoPacking", JSON.stringify(state));
      console.log("Stored batchInfoPacking in local storage:", state);
    },
    resetBatchPInfo: (state) => {
      // Reset the state to initial values
      return initialState;
    },
    loadBatchInfoPFromStorage: (state) => {
      const batchInfo = JSON.parse(localStorage.getItem("batchInfoPacking"));
      console.log("Loaded batchInfoPacking from local storage:", batchInfo); // Debug log
      if (batchInfo) {
        // Update state with the loaded batchInfo
        Object.assign(state, batchInfo);
      }
    },
  },
});

export const { setBatchPInfo, resetBatchPInfo, loadBatchInfoPFromStorage } =
batchInfoSlicePacking.actions;

export default batchInfoSlicePacking.reducer;
