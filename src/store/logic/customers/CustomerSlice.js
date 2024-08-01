import {createSlice} from '@reduxjs/toolkit'

const initialState = {
    status: '',
    loader: false,
    error: false,
    message: '',
    customers: [],
}

const CustomerSlice = createSlice({
    name:'customer',
    initialState: initialState,
    reducers:{
        addCustomer: (state,action) => {
            return {
                ...state,
                customers: [...state.customers, action.payload],
                status: 'Success'
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
                customers: updatedCusomers,
                status:'Success'
            }
        },
        resetCustomer: (state,action) => {
            return {
                ...state,
                status: ''
            }
        }
    }
})

export const {addCustomer,deleteCustomer,editCustomer,resetCustomer} = CustomerSlice.actions
export default CustomerSlice.reducer