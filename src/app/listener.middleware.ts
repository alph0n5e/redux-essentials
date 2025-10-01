import { createListenerMiddleware, addListener } from '@reduxjs/toolkit'
import { addPostsListeners } from '@/features/posts/postsSlice'
import type { AppDispatch, RootState } from './store'

export const listenerMiddleware = createListenerMiddleware()

export const startAppListening = listenerMiddleware.startListening.withTypes<RootState, AppDispatch>()
export type AppStartListening = typeof startAppListening

export const addAppListener = addListener.withTypes<RootState, AppDispatch>()
export type AppAddListener = typeof addAppListener

addPostsListeners(startAppListening)
