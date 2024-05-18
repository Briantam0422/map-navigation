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
            state.status = action.payload.status;
            state.path = action.payload.path;
            state.total_distance = action.payload.total_distance;
            state.total_time = action.payload.total_time;
            state.error = action.payload.error;
        },
        setToken: (state, action: PayloadAction<string>) => {
            state.token = action.payload;
        },
        setPath: (state, action: PayloadAction<Array<Array<number>>>) => {
            state.path = action.payload;
        },
        resetRoute: (state) => {
            state.token = "";
            state.path = [];
            state.status = "";
            state.total_distance = 0;
            state.total_time = 0;
            state.error = "";
        }
    },
});

export const { initialRoute, setToken, setPath, resetRoute } = routeSlice.actions;
export const routeReducer = routeSlice.reducer;