import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { fetchPostCodeDetailsAPI } from './PostCodeAPIs'

const initialState = {
    status: '',
    statusCode: 0,
    postCode: 0,
    city: [],
    state: []
}

const PostCodeSlice = createSlice({
    name: 'postcode',
    initialState: initialState,
    extraReducers: (builder) => {
        builder
            .addCase(getPostCodeDetails.pending, (state, action) => {
                console.log('payload for pending state',action.payload);
            })
            .addCase(getPostCodeDetails.fulfilled, (state, action) => {
                console.log('payload for fulfilled state',action.payload);
            })
            .addCase(getPostCodeDetails.rejected, (state, action) => {
                console.log('payload for rejected state',action.payload);
            })
    }
})

export const { } = PostCodeSlice.actions
export default PostCodeSlice.reducer

export const getPostCodeDetails = createAsyncThunk(
    'getPostCodeDetails',
    async ({ postCode }, thunkAPI) => {
        try {
            const response = await fetchPostCodeDetailsAPI(postCode)
            return response.data
        } catch (error) {
            return thunkAPI.rejectWithValue(error);
        }
    }
)