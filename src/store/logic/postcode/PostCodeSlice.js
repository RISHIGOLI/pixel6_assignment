import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { fetchPostCodeDetailsAPI } from './PostCodeAPIs'

const initialState = {
    status: '',
    statusCode: 0,
    postCode: 0,
    city: [{ id: '', name: '', }],
    state: [{ id: '', name: '', }],
    message: ''
}

const PostCodeSlice = createSlice({
    name: 'postcode',
    initialState: initialState,
    reducers: {
        resetPostCodeInitialState: (state, action) => {
            return {
                ...state,
                status: '',
                statusCode: 0,
                postCode: 0,
                city: [{ id: '', name: '', }],
                state: [{ id: '', name: '', }],
                message: ''
            }
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(getPostCodeDetails.pending, (state, action) => {
                console.log('payload for pending state', action.payload);
                return {
                    ...state,
                    status: 'pending'
                }
            })
            .addCase(getPostCodeDetails.fulfilled, (state, action) => {
                console.log('payload for fulfilled state', action.payload);
                return {
                    ...state,
                    status: action.payload.status === 'Failed' ? 'Failed' : action.payload.status,
                    statusCode: action.payload.statusCode,
                    postCode: action.payload.postCode,
                    city: action.payload.status === 'Failed' ? [{ name: '' }] : action.payload.city,
                    state: action.payload.status === 'Failed' ? [{ name: '' }] : action.payload.state
                }
            })
            .addCase(getPostCodeDetails.rejected, (state, action) => {
                console.log('payload for rejected state', action.payload);
                return {
                    ...state,
                    status: action.payload.status,
                    message: action.payload.message
                }
            })
    }
})

export const { resetPostCodeInitialState } = PostCodeSlice.actions
export default PostCodeSlice.reducer

export const getPostCodeDetails = createAsyncThunk(
    'getPostCodeDetails',
    async ({ postcode }, thunkAPI) => {
        try {
            const response = await fetchPostCodeDetailsAPI(postcode)
            return response.data
        } catch (error) {
            return thunkAPI.rejectWithValue(error);
        }
    }
)