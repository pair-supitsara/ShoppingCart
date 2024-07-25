import { configureStore } from '@reduxjs/toolkit'
import { counterSlice } from './counter'
import { authenSlice } from './authen'

const store = configureStore({
    reducer: {
        counter: counterSlice.reducer,
        authen: authenSlice.reducer
    }
})

export const authenActions = authenSlice.actions
export const counterActions = counterSlice.actions

export default store;