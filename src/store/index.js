import { configureStore } from '@reduxjs/toolkit'
import { counterSlice } from './counter'
import { authenSlice } from './authen'
import { productSlice } from './products'

const store = configureStore({
    reducer: {
        counter: counterSlice.reducer,
        authen: authenSlice.reducer,
        product: productSlice.reducer
    }
})

export const authenActions = authenSlice.actions
export const counterActions = counterSlice.actions
export const productActions = productSlice.actions

export default store;