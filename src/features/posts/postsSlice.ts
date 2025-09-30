import { createSlice, nanoid, type PayloadAction } from '@reduxjs/toolkit'
import { sub } from 'date-fns'

import type { RootState } from '@/app/store'
import { userLoggedOut } from '@/features/auth/authSlice'

type Reactions = {
  thumbsUp: number
  tada: number
  heart: number
  rocket: number
  eyes: number
}

export type ReactionName = keyof Reactions

export type Post = {
  id: string
  title: string
  content: string
  date: string
  user: string
  reactions: Reactions
}

type PostUpdate = Pick<Post, 'id' | 'title' | 'content'>

const initialReactions: Reactions = {
  thumbsUp: 0,
  tada: 0,
  heart: 0,
  rocket: 0,
  eyes: 0,
}

const initialState: Post[] = [
  {
    id: nanoid(),
    title: 'First Post',
    content: 'Hello',
    date: sub(new Date(), { minutes: 10 }).toISOString(),
    user: '0',
    reactions: initialReactions,
  },
  {
    id: nanoid(),
    title: 'Second Post',
    content: 'lorem',
    date: sub(new Date(), { minutes: 5 }).toISOString(),
    user: '1',
    reactions: initialReactions,
  },
]

const postsSlice = createSlice({
  name: 'posts',
  initialState,
  reducers: {
    postAdded: {
      reducer: (state, action: PayloadAction<Post>) => {
        state.push(action.payload)
      },
      prepare: (title: string, content: string, userId: string) => {
        return {
          payload: {
            id: nanoid(),
            title,
            content,
            date: new Date().toISOString(),
            user: userId,
            reactions: initialReactions,
          },
        }
      },
    },
    postUpdated: (state, action: PayloadAction<PostUpdate>) => {
      const { id, title, content } = action.payload
      const existingPost = state.find((post) => post.id === id)
      if (existingPost) {
        existingPost.title = title
        existingPost.content = content
      }
    },
    reactionAdded: (state, action: PayloadAction<{ postId: string; reaction: ReactionName }>) => {
      const { postId, reaction } = action.payload
      const existingPost = state.find((post) => post.id === postId)
      if (existingPost) {
        existingPost.reactions[reaction]++
      }
    },
  },
  extraReducers: (builder) => {
    builder.addCase(userLoggedOut, (state) => {
      return []
    })
  },
})

export const { postAdded, postUpdated, reactionAdded } = postsSlice.actions

export default postsSlice.reducer

export const selectAllPosts = (state: RootState) => state.posts

export const selectPostById = (state: RootState, postId: string) => state.posts.find((post) => post.id === postId)
