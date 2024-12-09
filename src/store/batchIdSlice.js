import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    dispensingId: '',
};

export const batchIdSlice = createSlice({
  name: "batchId",
  initialState,
  reducers: {
    setBatchId: (state, action) => {
      console.log("Dispatching setBatchId with payload:", action.payload);
      const { dispensingId } = action.payload;

      // Update state with the payload
      state.dispensingId = { ...state.dispensingId, ...dispensingId };

      // Save to local storage
      localStorage.setItem("batchId", JSON.stringify(state));
      console.log("Stored batchInfo in local storage:", state);
    },
    resetBatchId: (state) => {
      // Reset the state to initial values
      return initialState;
    },
    loadBatchIdFromStorage: (state) => {
      const batchInfo = JSON.parse(localStorage.getItem("batchId"));
      console.log("Loaded batchInfo from local storage:", batchInfo); // Debug log
      if (batchInfo) {
        // Update state with the loaded batchInfo
        Object.assign(state, batchInfo);
      }
    },
  },
});

export const { setBatchId, resetBatchId, loadBatchIdFromStorage } =
  batchIdSlice.actions;

export default batchIdSlice.reducer;
