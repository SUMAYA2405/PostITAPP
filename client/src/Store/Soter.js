import {configureStore} from "@reduxjs/toolkit";
import  userReducer  from "../Features/userSlice";
import postReducer from "../Features/PostSlice";
export const store=configureStore({
    reducer:{
        users:userReducer, 
        posts: postReducer,

    }

});