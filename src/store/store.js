import { configureStore } from '@reduxjs/toolkit';

import authReducer from '../store/authSlice'
const store = configureStore({
    reducer: {

        auth: authReducer

    }
});
console.log("in store ", store)


export default store;