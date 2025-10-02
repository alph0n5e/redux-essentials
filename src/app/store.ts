import { type Action, type ThunkAction, configureStore } from '@reduxjs/toolkit'

import { apiSlice } from '@/features/api/apiSlice'
import authReducer from '@/features/auth/authSlice'
import notificationsReducer from '@/features/notifications/notificationsSlice'
import postsReducer from '@/features/posts/postsSlice'

import { listenerMiddleware } from './listener.middleware'

export const store = configureStore({
  reducer: {
    auth: authReducer,
    notifications: notificationsReducer,
    posts: postsReducer,
    [apiSlice.reducerPath]: apiSlice.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().prepend(listenerMiddleware.middleware).concat(apiSlice.middleware),
})

export type AppStore = typeof store
export type AppDispatch = typeof store.dispatch
export type RootState = ReturnType<typeof store.getState>
export type AppThunk = ThunkAction<void, RootState, unknown, Action>
