import { configureStore } from "@reduxjs/toolkit";
import loginslice from "../modules/loginSlice";


const store = configureStore({
    reducer : {isLogin: loginslice}
})

export default store;  