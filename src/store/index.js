import { configureStore } from "@reduxjs/toolkit";
import CustomerSlice from "./logic/customers/CustomerSlice";

const store = configureStore({
    reducer: {
        customers: CustomerSlice
    }
})

export default store