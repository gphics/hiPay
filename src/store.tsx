import { configureStore } from '@reduxjs/toolkit'
import modelOutput from './Model'

const {userSlice} = modelOutput

const reducer:any = {userSlice}
const store = configureStore({
    reducer
})

export default store