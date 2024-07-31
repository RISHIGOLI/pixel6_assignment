import { configureStore } from "@reduxjs/toolkit";
import CustomerSlice from "./logic/customers/CustomerSlice";
import PanSlice from "./logic/customers/pan/PanSlice";

const store = configureStore({
    reducer: {
        customers: CustomerSlice,
        panData: PanSlice
    }
})

export default store