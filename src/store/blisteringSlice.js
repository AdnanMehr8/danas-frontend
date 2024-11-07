import { createSlice } from "@reduxjs/toolkit";

const initialState = {

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
    machineUsed: "",
    remarks: "",
  },
  authorization: {
    authorizedForUse: "",
    dateAndTime: null,
  },
  batchQRecord: Array(10).fill([]),
  batchQRecordSignAndRemarks: {
    remarks: "",
    manufacturingDate: "",
    expiryDate: "",
    packagingStarted: "",
    packagingCompleted: "",
    productionManager: "",
    materialIssuedBy: "",
    materialCheckedAndRecievedBy: "",
    datePM: "",
    dateMIB: "",
    dateCARB: "",
},
tailLineClearanceBlistering: {
    lineProduct: "",
    lineProductBatchNo: "",
    mfg: "",
    exp: "",
    price: "",
    date: "",
    previousProduct: "",
    previousProductBatchNo: "",
    productionSignature: "",
    qaSignature: "",
    pDate: "",
    qaDate: ""
  },
  tailLineClearanceBlistering2: {
    lineProduct: "",
    lineProductBatchNo: "",
    mfg: "",
    exp: "",
    price: "",
    date: "",
    previousProduct: "",
    previousProductBatchNo: "",
    productionSignature: "",
    qaSignature: "",
    pDate: "",
    qaDate: ""
},
instructions: {
    blisterOperator: "",
    helper: "",
    productionPharmacist: "",
},
checkSheet: {
    labels:  Array(7)
    .fill()
    .map(() => ({
        dateAndTime: "",
        sealingTemp: "",
        appearance: "",
        embossing: "",
        tabsOrCapsPerBlister: "",
        text: "",
        sealing: "",
        leakTest: "",
        performedByProductionQA: "",
    })),
    blisterMachineId: "",
    productionPharmacist: "",
    productionPharmacistDate: ""
  },
};

export const blisteringSlice = createSlice({
    name: 'blistering',
    initialState,
    reducers: {
        setBlistering: (state, action) => {
            console.log('Dispatching setBlistering with payload:', action.payload);
            const {
                batchRecord,
                checkboxes,
                tempAndHumidity,
                authorization,
                batchQRecord,
                batchQRecordSignAndRemarks,
                tailLineClearanceBlistering,
                tailLineClearanceBlistering2,
                instructions,
                checkSheet
            } = action.payload;

            // Update state with the payload
            state.batchRecord = { ...state.batchRecord, ...batchRecord };
            state.checkboxes = { ...state.checkboxes, ...checkboxes };
            state.tempAndHumidity = { ...state.tempAndHumidity, ...tempAndHumidity };
            state.authorization = { ...state.authorization, ...authorization };
            state.batchQRecord = action.payload.batchQRecord || state.batchQRecord;
            state.batchQRecordSignAndRemarks = { ...state.batchQRecordSignAndRemarks, ...batchQRecordSignAndRemarks };
            state.tailLineClearanceBlistering = { ...state.tailLineClearanceBlistering, ...tailLineClearanceBlistering };
            state.tailLineClearanceBlistering2 = { ...state.tailLineClearanceBlistering2, ...tailLineClearanceBlistering2 };
            state.instructions = { ...state.instructions, ...instructions };
            state.checkSheet = { ...state.checkSheet, ...checkSheet };

            // Save to local storage
            localStorage.setItem('blistering', JSON.stringify(state));
            console.log('Stored blistering in local storage:', state);
        },
        resetBlistering: (state) => {
            // Reset the state to initial values
            return initialState;
        },
        loadBlisteringFromStorage: (state) => {
            const record = JSON.parse(localStorage.getItem('blistering'));
            console.log('Loaded blistering from local storage:', record); // Debug log
            if (record) {
                // Update state with the loaded record
                Object.assign(state, record);
            }
        },
    },
});

export const { setBlistering, resetBlistering, loadBlisteringFromStorage } = blisteringSlice.actions;

export default blisteringSlice.reducer;
