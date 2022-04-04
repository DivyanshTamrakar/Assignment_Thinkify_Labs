import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
    status: "idle",
    allEmails: [],
    selectedEmail: null,
    read: [],
    unread: [],
    favorites: [],
    chipselect: 'clear',
};
// First, create the thunk
export const fetchAllEmails = createAsyncThunk(
    "user/allEmails",
    async (page, thunkAPI) => {
        const response = await axios.get(`https://flipkart-email-mock.now.sh/?page=${page.pageNo}`);
        return response.data.list;
    }
);

const emailSlice = createSlice({
    name: "emails",
    initialState,
    reducers: {
        updateSelectedEmail: (state, action) => {
            state.selectedEmail = action.payload.id;
        },
        updateFavorite: (state, action) => {
            if (state.favorites.includes(action.payload.id)) {
                state.favorites = state.favorites.filter((id) => id !== action.payload.id)
            } else {
                state.favorites.push(action.payload.id);
            }

        },
        updateReadStatus: (state, action) => {
            const index = state.unread.find((id) => id === action.payload.id);
            if (index) {
                state.unread = state.unread.filter((id) => id !== action.payload.id);
                state.read.push(action.payload.id);
            }
        },
        updateChipSelect: (state, action) => {
            state.chipselect = action.payload.text;
        },

    },
    extraReducers: {
        [fetchAllEmails.pending]: (state) => {
            state.status = "loading";
        },
        [fetchAllEmails.fulfilled]: (state, { payload }) => {
            state.status = "succeess";
            state.allEmails = [...state.allEmails, ...payload];
            state.unread = payload.map((email) => email.id)
        },
        [fetchAllEmails.rejected]: (state) => {
            state.status = "rejected";
        },

    }
});

export const { updateSelectedEmail, updateReadStatus, updateFavorite, updateChipSelect } = emailSlice.actions;


export default emailSlice.reducer;
