import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { verifyPanAPI } from './PanAPI'

const initialState = {
    status: '',
    statusCode: 0,
    isValid: false,
    fullName: '',
    message: '',
    panNumber: ''
}

const PanSlice = createSlice({
    name: 'pan',
    initialState: initialState,
    reducers: {
        resetPanDataInitialState: (state, action) => {
            return {
                ...state,
                status: '',
                statusCode: 0,
                isValid: false,
                fullName: '',
                message: '',
                panNumber: ''
            }
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(verifyPan.pending, (state, action) => {
                console.log('payload for pending state', action.payload);
                return {
                    ...state,
                    status: 'Pending',
                }
            })
            .addCase(verifyPan.fulfilled, (state, action) => {
                console.log('payload for fulfilled state', action.payload);
                return {
                    ...state,
                    status: action.payload.status !== 'Success' ? 'Failed' : 'Success',
                    statusCode: action.payload.statusCode,
                    isValid: action.payload.isValid,
                    fullName: action.payload.status === 'Failed' ? '' : action.payload.fullName
                }
            })
            .addCase(verifyPan.rejected, (state, action) => {
                console.log('payload for rejected state', action.payload);
                return {
                    ...state,
                    status: action.payload.status,
                    message: action.payload.message,
                    panNumber: action.payload.panNumber
                }
            })
    }
})

export const { resetPanDataInitialState } = PanSlice.actions
export default PanSlice.reducer

export const verifyPan = createAsyncThunk(
    'pan/verifyPan',
    async ({ body }, thunkAPI) => {
        try {
            const response = await verifyPanAPI(body)
            console.log(response);
            return response.data
        } catch (error) {
            return thunkAPI.rejectWithValue(error);
        }
    }
)