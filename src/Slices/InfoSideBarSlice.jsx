import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    open: false,
    data: {}
}

const InfoSideBarSlice = createSlice({
    name: "InfoSideBar",
    initialState,
    reducers: {
        show: (state, payload) => {
            state.open = true;
            state.data = payload?.payload || {};

        },
        hide: (state) => {
            state.open = false;
        },
    }
});

export const { show, hide } = InfoSideBarSlice.actions

export default InfoSideBarSlice