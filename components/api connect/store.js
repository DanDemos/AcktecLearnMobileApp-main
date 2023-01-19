import { configureStore } from '@reduxjs/toolkit'
import getuserdata from '../api connect/getuserdata'

export const store = configureStore({
  reducer: {
    apicall: getuserdata,
  },
})