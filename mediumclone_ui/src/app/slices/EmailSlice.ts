import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

const initialState = {
    email : ""
}
interface Initial {
    email : string
}
export const EmailSlice = createSlice({
    name : "mail",
    initialState,
    reducers : {
        addEmail : (state, action : PayloadAction<Initial>) => {
            state.email = action.payload.email;
        },
        clearEmail : () => initialState 
    }
});
export const {actions} = EmailSlice;
export const {addEmail ,clearEmail} = EmailSlice.actions;