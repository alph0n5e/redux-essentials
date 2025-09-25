import { createSlice, nanoid, type PayloadAction } from '@reduxjs/toolkit'

export type Post = {
  id: string
  title: string
  content: string
}

const initialState: Post[] = [
  { id: nanoid(), title: 'First Post', content: 'Hello' },
  { id: nanoid(), title: 'Second Post', content: 'lorem' },
]

const postsSlice = createSlice({
  name: 'posts',
  initialState,
  reducers: {
    postAdded: (state, action: PayloadAction<Post>) => {
      state.push(action.payload)
    },
  },
})

export const { postAdded } = postsSlice.actions

export default postsSlice.reducer
