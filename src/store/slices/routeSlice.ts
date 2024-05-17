import { DataGetRouteProps } from "@/api/route";
import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { stat } from "fs";
export interface RouteState {
    token: string,
    status: string,
    path: Array<Array<number>>,
    total_distance: number,
    total_time: number,
    error?: string
}

const initialState: RouteState = {
    token: "",
    status: "",
    path: [],
    total_distance: 0,
    total_time: 0,
    error: "",
}

export const routeSlice = createSlice({
    name: "route",
    initialState,
    reducers: {
        initialRoute: (state, action: PayloadAction<DataGetRouteProps>) => {
            state.status = action.payload.status
            state.path = action.payload.path
            state.total_distance = action.payload.total_distance
            state.total_time = action.payload.total_time
            state.error = action.payload.error
        },
        setToken: (state, action: PayloadAction<string>) => {
            state.token = action.payload;
        },
        setPath: (state, action: PayloadAction<Array<Array<number>>>) => {
            state.path = action.payload
        }
    },
});

export const { initialRoute, setToken, setPath } = routeSlice.actions;
export const routeReducer = routeSlice.reducer;