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
tailLineClearancePrinting: {
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
  tailLineClearancePrinting2: {
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
    codingOperator: "",
    codingChecker: "",
    productionOfficer: "",
},
checkSheet: {
    labels:  Array(7)
    .fill()
    .map(() => ({
        dateAndTime: "",
        ucOrLabel: "",
        commPackeOrExport: "",
        batchNo: "",
        mfgDate: "",
        expDate: "",
        mrp: "",
        checkedBy: "",
    })),
    dateStarted: "",
    dateCompleted: "",
  },
};

export const printingSlice = createSlice({
    name: 'printing',
    initialState,
    reducers: {
        setPrinting: (state, action) => {
            console.log('Dispatching setPrinting with payload:', action.payload);
            const {
                batchRecord,
                checkboxes,
                tempAndHumidity,
                authorization,
                batchQRecord,
                batchQRecordSignAndRemarks,
                tailLineClearancePrinting,
                tailLineClearancePrinting2,
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
            state.tailLineClearancePrinting = { ...state.tailLineClearancePrinting, ...tailLineClearancePrinting };
            state.tailLineClearancePrinting2 = { ...state.tailLineClearancePrinting2, ...tailLineClearancePrinting2 };
            state.instructions = { ...state.instructions, ...instructions };
            state.checkSheet = { ...state.checkSheet, ...checkSheet };

            // Save to local storage
            localStorage.setItem('printing', JSON.stringify(state));
            console.log('Stored printing in local storage:', state);
        },
        resetPrinting: (state) => {
            // Reset the state to initial values
            return initialState;
        },
        loadPrintingingFromStorage: (state) => {
            const record = JSON.parse(localStorage.getItem('printing'));
            console.log('Loaded printing from local storage:', record); // Debug log
            if (record) {
                // Update state with the loaded record
                Object.assign(state, record);
            }
        },
    },
});

export const { setPrinting, resetPrinting, loadPrintingingFromStorage } = printingSlice.actions;

export default printingSlice.reducer;
