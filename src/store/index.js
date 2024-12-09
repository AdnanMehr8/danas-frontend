import { configureStore } from "@reduxjs/toolkit";
import user from "./authSlice";
import dispensing from "./dispensingSlice";
import mixing from "./mixingSlice";
import compression from "./compressionSlice";
import coating from "./coatingSlice";
import printing from "./printingSlice";
import blistering from "./blisteringSlice";
import packing from "./packingSlice";
import sdispensing from "./sulpeol/dispensingSlice";
import smixing from "./sulpeol/mixingSlice";
import scompression from "./sulpeol/compressionSlice";
import batchInfo from "./batchInfoSlice";
import batchInfoPacking from "./batchInfoPackingSlice ";
import sbatchInfo from "./sulpeol/batchInfoSlice";
import scdispensing from "./sidikcream/dispensingSlice";
import scmixing from "./sidikcream/mixingSlice";
import sccompression from "./sidikcream/compressionSlice";
import batchId from './batchIdSlice';
import batchInfoQC from './batchInfoQCSlice';
import mixingQC from './mixingQCSlice'
const store = configureStore({
  reducer: { user, batchId, dispensing, mixing, compression, coating, printing, blistering, packing, batchInfo, batchInfoQC, mixingQC, batchInfoPacking,  sbatchInfo, scompression, sdispensing, smixing, scdispensing, scmixing, sccompression },
});

export default store;
