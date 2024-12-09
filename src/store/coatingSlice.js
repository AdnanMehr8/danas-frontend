import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  precautions: {
    area: "",
    sop1: "",
    sop2: "",
    section: "",
    specificArea: "",
    sectionInCharge: "",
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
    remnants: {
      labels: [],
      values: {}
    },
    cleanliness: {
      labels: [],
      values: {}
    }
  },
  tempAndHumidity: {
    temperature: "",
    humidity: "",
    coatingRemarks: "",
  },
  authorization: {
    authorizedForUse: "",
    dateAndTime: "",
  },
  coatingSolutionPreparation: [
    {
      target: "",
      activityCompliance: "",
      performedByOperator: "",
      checkedByPO: "",
      checkedByQAI: "",
      pboDate: "",
      checkedByPODate: "",
      checkedByQAIDate: "",
    },
  ],
  coatingProcedure: [
    {
      target: "",
      activityCompliance: "",
      performedByOperator: "",
      checkedByPO: "",
      checkedByQAI: "",
      pboDate: "",
      checkedByPODate: "",
      checkedByQAIDate: "",
    },
  ],

  requestForAnalysis: {
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
    },
    qaObservations: Array(8).fill({
      parameter: "",
      statusCoating: "",
      remarks: "",
    }),
    qaOfficer: "",
    qaManager: "",
  },
  weightOfCoatedTablets: {
    containers: Array(5).fill({
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
  batchManufacturingYield: {
    labels: Array(5).fill({
      sNo: "",
      description: "",
      yield: "",
    }),
    performedBy: "",
    performedByDate: "",
  },
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

export const coatingSlice = createSlice({
  name: "coating",
  initialState,
  reducers: {
    setCoatingRecord: (state, action) => {
      console.log("Dispatching setCoatingRecord with payload:", action.payload);
      const {
        precautions,
        lineClearance,
        batchInfo,
        batchRecord,
        checkboxes,
        tempAndHumidity,
        coatingRemarks,
        authorization,
        compressionRecord,
        compressionSpecifications,
        followUp,
        requestForAnalysis,
        checkSheet,
        weightOfCompressedTablets,
        compressionYield,
        coatingSolutionPreparation,
        coatingProcedure,
        weightOfCoatedTablets,
        batchManufacturingYield,
        qcHeader,
        batch,
        testAndResults
      } = action.payload;

      state.qcHeader = { ...state.qcHeader, ...qcHeader };
      state.precautions = { ...state.precautions, ...precautions };
      state.lineClearance = action.payload.lineClearance || state.lineClearance;
      // state.lineClearance = { ...state.lineClearance, ...lineClearance };
      state.batch = { ...state.batch, ...batch };
      state.testAndResults = { ...state.testAndResults, ...testAndResults };
      state.batchInfo = { ...state.batchInfo, ...batchInfo };
      state.batchRecord = { ...state.batchRecord, ...batchRecord };
      state.checkboxes = { ...state.checkboxes, ...checkboxes };
      state.tempAndHumidity = { ...state.tempAndHumidity, ...tempAndHumidity };
      state.coatingRemarks = coatingRemarks;
      state.authorization = { ...state.authorization, ...authorization };
      // state.coatingSolutionPreparation = coatingSolutionPreparation;

      // state.compressionRecord = action.payload.compressionRecord || state.compressionRecord;
      // state.coatingProcedure = coatingProcedure;
      state.coatingProcedure =
        action.payload.coatingProcedure || state.coatingProcedure;
      // state.coatingSolutionPreparation = { ...state.coatingSolutionPreparation, ...coatingSolutionPreparation };
      // state.coatingProcedure = {...state.coatingProcedure, ...coatingProcedure};
      state.coatingSolutionPreparation =
        action.payload.coatingSolutionPreparation ||
        state.coatingSolutionPreparation;

      state.compressionSpecifications = {
        ...state.compressionSpecifications,
        ...compressionSpecifications,
      };
      state.followUp = { ...state.followUp, ...followUp };
      state.requestForAnalysis = {
        ...state.requestForAnalysis,
        ...requestForAnalysis,
      };
      state.checkSheet = { ...state.checkSheet, ...checkSheet };
      state.weightOfCoatedTablets = {
        ...state.weightOfCoatedTablets,
        ...weightOfCoatedTablets,
      };
      state.batchManufacturingYield = {
        ...state.batchManufacturingYield,
        ...batchManufacturingYield,
      };
      // state.weightOfCoatedTablets = weightOfCoatedTablets;

      // Save to local storage
      localStorage.setItem("coatingRecord", JSON.stringify(state));
      console.log("Stored coating record in local storage:", state);
    },
    resetCoatingRecord: (state) => {
      // Reset the state to initial values
      return initialState;
    },
    loadCoatingRecordFromStorage: (state) => {
      const coatingRecord = JSON.parse(localStorage.getItem("coatingRecord"));
      console.log(
        "Loaded compression record from local storage:",
        coatingRecord
      );
      if (coatingRecord) {
        // Update state with the loaded record
        Object.assign(state, coatingRecord);
      }
    },
  },
});

export const {
  setCoatingRecord,
  resetCoatingRecord,
  loadCoatingRecordFromStorage,
} = coatingSlice.actions;

export default coatingSlice.reducer;
