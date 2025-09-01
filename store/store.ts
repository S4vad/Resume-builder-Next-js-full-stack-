import {configureStore} from "@reduxjs/toolkit"
import resumeSlice from "./slices/resumeSlice";
import templateSlice from "./slices/templateSlice"

export const store=configureStore({
  reducer:{
    resume:resumeSlice,
    template:templateSlice
  }
}

)

export type RootState =ReturnType<typeof store.getState>
export type AppDispatch=typeof store.dispatch;
