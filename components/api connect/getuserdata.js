import { createSlice } from '@reduxjs/toolkit'
import { useSelector, useDispatch } from 'react-redux'

const initialState = {
    token: '',
    user_role: '',
}

export const counterSlice = createSlice({
  name: 'apicall',
  initialState,
  reducers: {
    setGlobalToken: (state,actions) => {
      state.token = actions.payload
      console.log(state.token)
    },
    setUserRole: (state,actions) => {
      state.user_role = actions.payload
    },
  },
})

// Action creators are generated for each case reducer function
export const { increment, decrement, incrementByAmount,setGlobalToken, setUserRole } = counterSlice.actions

export default counterSlice.reducer