import { configureStore } from "@reduxjs/toolkit";
import user from "./authSlice";
import dispensing from "./dispensingSlice";
import mixing from "./mixingSlice";
import compression from "./compressionSlice";
import coating from "./coatingSlice";
import printing from "./printingSlice";
import sdispensing from "./sulpeol/dispensingSlice";
import smixing from "./sulpeol/mixingSlice";
import scompression from "./sulpeol/compressionSlice";
import batchInfo from "./batchInfoSlice";
import sbatchInfo from "./sulpeol/batchInfoSlice";
import scdispensing from "./sidikcream/dispensingSlice";
import scmixing from "./sidikcream/mixingSlice";
import sccompression from "./sidikcream/compressionSlice";

const store = configureStore({
  reducer: { user, dispensing, mixing, compression, coating, printing, batchInfo, sbatchInfo, scompression, sdispensing, smixing, scdispensing, scmixing, sccompression },
});

export default store;
