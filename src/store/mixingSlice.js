import { createSlice } from "@reduxjs/toolkit";
const initialState = {
  precautions: {
    sop1: "",
    sop2: "",
    section: "",
    specificArea: "",
    precautionsRead: "",
  },
  lineClearance: Array(1).fill({
    equipment: "",
    equipmentId: "",
    equipmentCapacity: "",
    previousProduct: "",
    batchNo: "",
    cleanedBy: "",
    clDate: "",
    checkedBy: "",
    chDate: "",
    verifiedBy: "",
    vDate: "",
  }),
  // batchInfo: {
  //   productName: "",
  //   batchNo: "",
  //   batchSize: "",
  //   noOfPacks: "",
  //   noOfTablets: "",
  //   packsSize: "",
  //   expiryDate: "",
  // },
  batchRecord: {
    department: "",
    currentProduct: "",
    currentProductBatchNo: "",
    lineClearance: "",
    section: "",
    date: null,
    previousProduct: "",
    previousProductBatchNo: "",
    signature: "",
  },
  checkboxes: {
    documents: "notApplicable",
    rawMaterial: "notApplicable",
    remnantOfPreviousProduct: "notApplicable",
    area: "notApplicable",
    mixer: "notApplicable",
    otherEquipments: "notApplicable",
    scoops: "notApplicable",
    pallets: "notApplicable",
  },
  tempAndHumidity: {
    temperature: "",
    humidity: "",
  },
  mixingRemarks: "",
  authorization: {
    authorizedForUse: "",
    dateAndTime: null,
  },
  manufacturingRecord: [
    {
      target: "",
      sievingStartedAt: "",
      sievingCompletedOn: "",
      performedByOperator: "",
      checkedByPO: "",
      checkedByQAI: "",
      pboDate: "",
      checkedByPODate: "",
      checkedByQAIDate: "",
    },
    {
      target: "",
      mixingStartedAt: "",
      mixingCompletedOn: "",
      performedByOperator: "",
      checkedByPO: "",
      checkedByQAI: "",
      pboDate: "",
      checkedByPODate: "",
      checkedByQAIDate: "",
    },
    {
      target: "",
      sampleTakenQty: "",
      performedByOperator: "",
      checkedByPO: "",
      checkedByQAI: "",
      pboDate: "",
      checkedByPODate: "",
      checkedByQAIDate: "",
    },
  ],
  weightOfGranules: {
    containers: Array(7).fill({
      containerNo: "",
      grossWeight: "",
      tareWeight: "",
      netWeight: "",
    }),
    total: {
      grossWeight: 0,
      tareWeight: 0,
      netWeight: 0,
    },
    weighedBy: "",
    receivedBy: "",
  },
  granulationYield: {
    labels: Array(6).fill({
      sNo: "",
      description: "",
      weight: "",
    }),
    performedBy: "",
    pbDate: "",
  },
  requestForAnalysisMixing: {
    batchInfo: {
      product: "",
      qcNumber: "",
      section: "",
      stage: "",
      batchNumber: "",
      mfgDate: "",
      expDate: "",
      date: "",
      time: "",
      packSize: "",
      sampleQuantity: "",
      weightPerUnit: "",
      bSize: "",
    },
    qa: {
      sampleType: "",
      releaseRequiredFor: "",
      collectedBy: "",
      dateCollected: "",
      timeCollected: "",
      quantityOfSample: "",
      containerNumbers: "",
      signature: "",
    },
    qaObservations: Array(8).fill({
      parameter: "",
      statusMixing: "",
      remarks: "",
    }),
    qaOfficer: "",
    qaManager: "",
  },
};

export const mixingSlice = createSlice({
  name: "mixing",
  initialState,
  reducers: {
    setMixingRecord: (state, action) => {
      console.log("Dispatching setMixingRecord with payload:", action.payload);
      const {
        precautions,
        lineClearance,
        batchInfo,
        batchRecord,
        checkboxes,
        tempAndHumidity,
        mixingRemarks,
        authorization,
        manufacturingRecord,
        weightOfGranules,
        granulationYield,
        requestForAnalysisMixing,
      } = action.payload;

      state.precautions = { ...state.precautions, ...precautions };
      //   state.precautions = action.payload.precautions || state.precautions;

      // state.lineClearance = { ...state.lineClearance, ...lineClearance };
      state.lineClearance = action.payload.lineClearance || state.lineClearance;

      state.batchInfo = { ...state.batchInfo, ...batchInfo };
      state.batchRecord = { ...state.batchRecord, ...batchRecord };
      state.checkboxes = { ...state.checkboxes, ...checkboxes };
      state.tempAndHumidity = { ...state.tempAndHumidity, ...tempAndHumidity };
      state.mixingRemarks = mixingRemarks;
      state.authorization = { ...state.authorization, ...authorization };
      //   state.manufacturingRecord = {
      //     ...state.manufacturingRecord,
      //     ...manufacturingRecord,
      //   };
      //  state.manufacturingRecord = manufacturingRecord;
      state.manufacturingRecord =
        action.payload.manufacturingRecord || state.manufacturingRecord;
      state.weightOfGranules = {
        ...state.weightOfGranules,
        ...weightOfGranules,
      };
      state.granulationYield = {
        ...state.granulationYield,
        ...granulationYield,
      };
      state.requestForAnalysisMixing = {
        ...state.requestForAnalysisMixing,
        ...requestForAnalysisMixing,
      };

      // Save to local storage
      localStorage.setItem("mixingRecord", JSON.stringify(state));
      console.log("Stored mixing record in local storage:", state);
    },
    resetMixingRecord: (state) => {
      // Reset the state to initial values
      return initialState;
    },
    loadMixingRecordFromStorage: (state) => {
      const mixingRecord = JSON.parse(localStorage.getItem("mixingRecord"));
      console.log("Loaded mixing record from local storage:", mixingRecord); // Debug log
      if (mixingRecord) {
        // Update state with the loaded record
        Object.assign(state, mixingRecord);
      }
    },
  },
});

export const {
  setMixingRecord,
  resetMixingRecord,
  loadMixingRecordFromStorage,
} = mixingSlice.actions;

export default mixingSlice.reducer;
