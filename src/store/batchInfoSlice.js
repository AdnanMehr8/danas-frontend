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
  },
};

export const batchInfoSlice = createSlice({
  name: "batchInfo",
  initialState,
  reducers: {
    setBatchInfo: (state, action) => {
      console.log("Dispatching setBatchInfo with payload:", action.payload);
      const { batch } = action.payload;

      // Update state with the payload
      state.batch = { ...state.batch, ...batch };

      // Save to local storage
      localStorage.setItem("batchInfo", JSON.stringify(state));
      console.log("Stored batchInfo in local storage:", state);
    },
    resetBatchInfo: (state) => {
      // Reset the state to initial values
      return initialState;
    },
    loadBatchInfoFromStorage: (state) => {
      const batchInfo = JSON.parse(localStorage.getItem("batchInfo"));
      console.log("Loaded batchInfo from local storage:", batchInfo); // Debug log
      if (batchInfo) {
        // Update state with the loaded batchInfo
        Object.assign(state, batchInfo);
      }
    },
  },
});

export const { setBatchInfo, resetBatchInfo, loadBatchInfoFromStorage } =
  batchInfoSlice.actions;

export default batchInfoSlice.reducer;
