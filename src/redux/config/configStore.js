import { configureStore } from "@reduxjs/toolkit";
import loginSlicer from "../modules/loginSlice";


const store = configureStore({
    reducer : {login: loginSlicer}
})

export default store;  