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
        },
        deleteCustomer: (state,action) => {
            return {
                ...state,
                customers: state.customers.filter((customer,index)=> index !== action.payload)
            }
        },
        editCustomer: (state,action) => {
            const customerIndex = action.payload.customerIndex
            const newCustomer = action.payload.customer
            const updatedCusomers = state.customers.map((customer,index)=> index !== customerIndex ? customer : newCustomer)
            return {
                ...state,
                customers: updatedCusomers
            }
        }
    }
})

export const {addCustomer,deleteCustomer,editCustomer} = CustomerSlice.actions
export default CustomerSlice.reducer