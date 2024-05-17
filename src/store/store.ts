import { configureStore } from '@reduxjs/toolkit'
import { routeReducer } from './slices/routeSlice'

export const makeStore = () => {
  return configureStore({
    reducer: {
      route: routeReducer
    }
  })
}

export type AppStore = ReturnType<typeof makeStore>
export type RootState = ReturnType<AppStore['getState']>
export type AppDispatch = AppStore['dispatch']