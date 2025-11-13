import {configureStore} from "@reduxjs/toolkit"
import {AuthService} from "./services/AuthService";
import { PostService } from "./services/PostService";
import { UserSlice } from "./slices/UserSlice";
import { UnsplashService } from "./services/UnplashService";
import { ActivationService } from "./services/ActivationService";
import { EmailSlice } from "./slices/EmailSlice";
import { UserService } from "./services/UserService";

export const store = configureStore({
    reducer : {
        [AuthService.reducerPath] : AuthService.reducer,
        [PostService.reducerPath] : PostService.reducer,
        [UnsplashService.reducerPath] : UnsplashService.reducer,
        [ActivationService.reducerPath] : ActivationService.reducer,
        [UserService.reducerPath] : UserService.reducer,
        user : UserSlice.reducer,
        mail : EmailSlice.reducer
    },
    middleware : (getDefaultMiddleware) => 
        getDefaultMiddleware().concat(AuthService.middleware,
            ActivationService.middleware,UnsplashService.middleware,PostService.middleware,UserService.middleware)
});

export type ApplicationDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;