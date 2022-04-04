import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
    status: "idle",
    emailData: {},
};
// First, create the thunk
export const fetchEmailBody = createAsyncThunk(
    "user/emailBody",
    async (id) => {
        const response = await axios.get(`https://flipkart-email-mock.vercel.app/?id=${id}`);
        return response.data;
    }
);

const emailBodySlice = createSlice({
    name: "emailBody",
    initialState,
    reducers: {},
    extraReducers: {
        [fetchEmailBody.pending]: (state) => {
            state.status = "loading";
        },
        [fetchEmailBody.fulfilled]: (state, { payload }) => {
            state.status = "succeess";
            state.emailData = payload;
        },
        [fetchEmailBody.rejected]: (state) => {
            state.status = "rejected";
        },

    }
});

export default emailBodySlice.reducer;
