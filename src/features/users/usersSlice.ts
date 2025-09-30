import { createSlice } from '@reduxjs/toolkit'
import { RootState } from '@/app/store'
import { selectCurrentUsername } from '@/features/auth/authSlice'

type User = {
  id: string
  name: string
}

const initialState: User[] = [
  { id: '0', name: 'Lorem Ipsum' },
  { id: '1', name: 'Dolorem Sut' },
  { id: '2', name: 'Amet Megitur' },
]

const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {},
})

export default usersSlice.reducer

export const selectAllUsers = (state: RootState) => state.users

export const selectUserById = (state: RootState, userId: string | null) =>
  state.users.find((user) => user.id === userId)

export const selectCurrentUser = (state: RootState) => {
  const currentUserName = selectCurrentUsername(state)
  return selectUserById(state, currentUserName)
}
