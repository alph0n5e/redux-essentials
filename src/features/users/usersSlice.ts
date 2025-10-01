import { createEntityAdapter, createSlice } from '@reduxjs/toolkit'
import { client } from '@/api/client'
import { createAppAsyncThunk } from '@/app/hooks'
import { RootState } from '@/app/store'
import { selectCurrentUsername } from '@/features/auth/authSlice'

type User = {
  id: string
  name: string
}

const usersAdapter = createEntityAdapter<User>()

const initialState = usersAdapter.getInitialState()

export const fetchUsers = createAppAsyncThunk('users/fetchUsers', async () => {
  const response = await client.get<User[]>('fakeApi/users')
  return response.data
})

const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchUsers.fulfilled, usersAdapter.setAll)
  },
})

export default usersSlice.reducer

export const { selectAll: selectAllUsers, selectById: selectUserById } = usersAdapter.getSelectors(
  (state: RootState) => state.users,
)

export const selectCurrentUser = (state: RootState) => {
  const currentUserName = selectCurrentUsername(state)
  if (!currentUserName) {
    return
  }
  return selectUserById(state, currentUserName)
}
