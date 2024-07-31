import {createSlice} from '@reduxjs/toolkit'

const initialState = {
    loader: false,
    error: false,
    message: '',
    customers: []
}

const CustomerSlice = createSlice({
    name:'customer',
    initialState: initialState,
    reducers:{
        addCustomer: (state,action) => {
            return {
                ...state,
                customers: [...state.customers, action.payload]
            }
        }
    }
})

export const {addCustomer} = CustomerSlice.actions
export default CustomerSlice.reducer