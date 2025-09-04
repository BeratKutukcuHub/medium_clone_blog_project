import {configureStore} from "@reduxjs/toolkit"
import {AuthService} from "./slices/AuthService";

export const store = configureStore({
    reducer : {
        [AuthService.reducerPath] : AuthService.reducer
    },
    middleware : (getDefaultMiddleware) => 
        getDefaultMiddleware().concat(AuthService.middleware)
});

export type ApplicationDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
