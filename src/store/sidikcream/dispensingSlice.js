import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  // batchInfo: {
  //     productName: '',
  //     batchNo: '',
  //     batchSize: '',
  //     noOfPacks: '',
  //     noOfTablets: '',
  //     packsSize: '',
  //     expiryDate: '',
  //     mfgLicense: '',
  //     productRegNo: '',
  //     validFrom: '',
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
    machineUsed: "",
  },
  remarks: "",
  authorization: {
    authorizedForUse: "",
    dateAndTime: null,
  },
  weighingRecordRaw: Array(10).fill([]),
  checkRecordRaw: {
    checkedByDispensingPharmacist: "",
    dateDP: "",

    checkedByQAOfficer: "",
    dateQA: "",

    receivedByProductionPharmacist: "",
    datePP: "",

    receivedBySupervisor: "",
    dateS: "",
  },
};

export const dispensingSlice = createSlice({
    name: 'dispensing',
    initialState,
    reducers: {
        setscDispensing: (state, action) => {
            console.log('Dispatching setDispensing with payload:', action.payload);
            const {
                // batchInfo,
                batchRecord,
                checkboxes,
                weighingRecordRaw,
                checkRecordRaw,
                weighingRecordCoating,
                checkRecordCoating,
                tempAndHumidity,
                remarks,
                authorization,
                labels
            } = action.payload;

            // Update state with the payload
        // state.batchInfo = { ...state.batchInfo, ...batchInfo };
            
            state.batchRecord = { ...state.batchRecord, ...batchRecord };
            state.checkboxes = { ...state.checkboxes, ...checkboxes };
            state.labels = { ...state.labels, ...labels };
            
            state.tempAndHumidity = { ...state.tempAndHumidity, ...tempAndHumidity };
            // state.weighingRecord = weighingRecordRaw;
            state.weighingRecordRaw = action.payload.weighingRecordRaw || state.weighingRecordRaw;
            // state.weighingRecordCoating = action.payload.weighingRecordCoating || state.weighingRecordCoating;

            // state.checkRecord = checkRecordRaw;
            // state.checkRecordRaw = action.payload.checkRecordRaw || state.checkRecordRaw;
            // state.checkRecordCoating = action.payload.checkRecordCoating || state.checkRecordCoating;
            state.checkRecordCoating = { ...state.checkRecordCoating, ...checkRecordCoating };
            state.checkRecordRaw = { ...state.checkRecordRaw, ...checkRecordRaw };

            state.remarks = remarks;
            state.authorization = { ...state.authorization, ...authorization };

            // Save to local storage
            localStorage.setItem('sc-dispensing', JSON.stringify(state));
            console.log('Stored dispensing in local storage:', state);
        },
        resetscDispensing: (state) => {
            // Reset the state to initial values
            return initialState;
        },
        loadscDispensingFromStorage: (state) => {
            const record = JSON.parse(localStorage.getItem('sc-dispensing'));
            console.log('Loaded dispensing from local storage:', record); // Debug log
            if (record) {
                // Update state with the loaded record
                Object.assign(state, record);
            }
        },
    },
});

export const { setscDispensing, resetscDispensing, loadscDispensingFromStorage } = dispensingSlice.actions;

export default dispensingSlice.reducer;
