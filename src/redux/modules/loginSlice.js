import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    userName: "",
    userNickName: "",
};

const loginSlicer = createSlice({
    name: "login",
    initialState,
    reducers: {
        isLogin: (state, action) => {
            state.userName = action.payload.username
            state.userNickName = action.payload.nickname
            console.log(action.payload)
        }
        ,
        isLogout: (state, action) => {
            state.userName = ""
            state.userNickName = ""
        }
    }
})

export const {isLogin, isLogout} = loginSlicer.actions
export default loginSlicer.reducer;