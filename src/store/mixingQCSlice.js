import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  qcHeader: {
    docNo: "",
    effectiveDate: "",
    revisionNo: "",
    replaces: ""
},
  batch: {
    productName: "",
    batchNo: "",
    qCNo: "",
    batchSize: "",
    packsSize: "",
    mfgDate: "",
    expiryDate: "",
    analysisDate: "",
    sampleType: "",
  },
  testAndResults: {
    parameters: [
      {
        parameters: "",
        specification: "",
        results: "",
      },
    ],
    checkedByQCA: "",
    checkedByQCADate: "",
    checkedByQCM: "",
    checkedByQCMDate: "",
    remarks: ""
  },
};

export const mixingQCSlice = createSlice({
  name: "mixingQC",
  initialState,
  reducers: {
    setMixingQC: (state, action) => {
      console.log("Dispatching setBatchInfoQC with payload:", action.payload);
      const { batch, qcHeader } = action.payload;

      // Update state with the payload
      state.qcHeader = { ...state.qcHeader, ...qcHeader };
      state.batch = { ...state.batch, ...batch };

      // Save to local storage
      localStorage.setItem("mixingQC", JSON.stringify(state));
      console.log("Stored mixingQC in local storage:", state);
    },
    resetMixingQC: (state) => {
      // Reset the state to initial values
      return initialState;
    },
    loadMixingQCFromStorage: (state) => {
      const batchInfo = JSON.parse(localStorage.getItem("batchRecordQC"));
      console.log("Loaded batchRecordQC from local storage:", batchInfo); // Debug log
      if (batchInfo) {
        // Update state with the loaded batchInfo
        Object.assign(state, batchInfo);
      }
    },
  },
});

export const { setMixingQC, resetMixingQC, loadMixingQCFromStorage } =
  mixingQCSlice.actions;

export default mixingQCSlice.reducer;
