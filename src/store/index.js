import { configureStore } from "@reduxjs/toolkit";
import CustomerSlice from "./logic/customers/CustomerSlice";
import PanSlice from "./logic/pan/PanSlice";
import PostCodeSlice from "./logic/postcode/PostCodeSlice";

const store = configureStore({
    reducer: {
        customers: CustomerSlice,
        panData: PanSlice,
        postCodeData: PostCodeSlice
    }
})

export default store