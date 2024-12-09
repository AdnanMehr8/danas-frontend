import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  batch: {
        docNo: "",
        effectiveDate: "",
        revisionNo: "",
        replaces: ""
  },
};

export const batchInfoQCSlice = createSlice({
  name: "batchInfoQC",
  initialState,
  reducers: {
    setBatchInfoQC: (state, action) => {
      console.log("Dispatching setBatchInfo with payload:", action.payload);
      const { batch } = action.payload;

      // Update state with the payload
      state.batch = { ...state.batch, ...batch };

      // Save to local storage
      localStorage.setItem("batchInfoQC", JSON.stringify(state));
      console.log("Stored batchInfoQC in local storage:", state);
    },
    resetBatchInfoQC: (state) => {
      // Reset the state to initial values
      return initialState;
    },
    loadBatchInfoQCFromStorage: (state) => {
      const batchInfo = JSON.parse(localStorage.getItem("batchInfoQC"));
      console.log("Loaded batchInfoQC from local storage:", batchInfo); // Debug log
      if (batchInfo) {
        // Update state with the loaded batchInfo
        Object.assign(state, batchInfo);
      }
    },
  },
});

export const { setBatchInfoQC, resetBatchInfoQC, loadBatchInfoQCFromStorage } =
  batchInfoQCSlice.actions;

export default batchInfoQCSlice.reducer;
