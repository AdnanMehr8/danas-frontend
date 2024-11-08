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
tailLineClearancePacking: {
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
  tailLineClearancePacking2: {
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
teamSheet: {
    labels:  Array(7)
    .fill()
    .map(() => ({
        name: "",
        process: "",
        timeIn: "",
        timeOut: "",
        timeIn2: "",
        timeOut2: "",
        timeIn3: "",
        timeOut3: "",
    })),
    incharge: "",
    inchargeDate: "",
    packingOfficer: "",
    packingOfficerDate: ""
  },
checkSheet: {
    labels:  Array(7)
    .fill()
    .map(() => ({
        dateAndTime: "",
        blister: "",
        batchNo: "",
        mfgDate: "",
        expDate: "",
        mrp: "",
        packSize: "",
        directionInsertion: "",
        inner: "",
        label: "",
        bottleOrTube: "",
        ucOrMc: "",
        mcNo: "",
        signedByProductionOrQA: "",
    })),
    dateStarted: "",
    dateCompleted: "",
    },
    requestForAnalysisPacking: {
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
          signature: "",
          collectedBy: "",
          dateCollected: "",
          timeCollected: "",
          quantityOfSample: "",
          containerNumbers: "",
        },
        qaObservations: Array(8).fill({
            parameter: "",
            statusPacking: "", // OK or Not OK
            remarks: "",
        }),
        qaOfficer: "",
        qaManager: "",
    },
    reconcilliationSheet: {
        labels:  Array(6)
        .fill()
        .map(() => ({
            sNo: "",
            description: "",
            reconcillation: "",
        })),

        productionManager: "",
        remarks: ""
      },
      stockTransferReport: {
        mfgDate: "",
        expDate: "",
        labels:  Array(7)
        .fill()
        .map(() => ({
                date: "",
                transferNote: "",
                packSize: "",
                noOfLimitsPack: "",
                noOfMasterCartonPacked: "",
                packingSupervisor: "",
                storeOfficer: "",
            })),
            productionOfficer: "",
            qaOfficer: ""
      }
};

export const packingSlice = createSlice({
    name: 'packing',
    initialState,
    reducers: {
        setPacking: (state, action) => {
            console.log('Dispatching setPacking with payload:', action.payload);
            const {
                batchRecord,
                checkboxes,
                tempAndHumidity,
                authorization,
                batchQRecord,
                batchQRecordSignAndRemarks,
                tailLineClearancePacking,
                tailLineClearancePacking2,
                teamSheet,
                checkSheet,
                requestForAnalysisPacking,
                reconcilliationSheet,
                stockTransferReport
            } = action.payload;

            // Update state with the payload
            state.batchRecord = { ...state.batchRecord, ...batchRecord };
            state.checkboxes = { ...state.checkboxes, ...checkboxes };
            state.tempAndHumidity = { ...state.tempAndHumidity, ...tempAndHumidity };
            state.authorization = { ...state.authorization, ...authorization };
            state.batchQRecord = action.payload.batchQRecord || state.batchQRecord;
            state.batchQRecordSignAndRemarks = { ...state.batchQRecordSignAndRemarks, ...batchQRecordSignAndRemarks };
            state.tailLineClearancePacking = { ...state.tailLineClearancePacking, ...tailLineClearancePacking };
            state.tailLineClearancePacking2 = { ...state.tailLineClearancePacking2, ...tailLineClearancePacking2 };
            state.teamSheet = { ...state.teamSheet, ...teamSheet };
            state.checkSheet = { ...state.checkSheet, ...checkSheet };
            state.requestForAnalysisPacking = { ...state.requestForAnalysisPacking, ...requestForAnalysisPacking };
            state.reconcilliationSheet = { ...state.reconcilliationSheet, ...reconcilliationSheet };
            state.stockTransferReport = { ...state.stockTransferReport, ...stockTransferReport };


            // Save to local storage
            localStorage.setItem('packing', JSON.stringify(state));
            console.log('Stored packing in local storage:', state);
        },
        resetPacking: (state) => {
            // Reset the state to initial values
            return initialState;
        },
        loadPackingFromStorage: (state) => {
            const record = JSON.parse(localStorage.getItem('packing'));
            console.log('Loaded packing from local storage:', record); // Debug log
            if (record) {
                // Update state with the loaded record
                Object.assign(state, record);
            }
        },
    },
});

export const { setPacking, resetPacking, loadPackingFromStorage } = packingSlice.actions;

export default packingSlice.reducer;
