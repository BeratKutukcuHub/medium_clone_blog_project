import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export interface User {
  id: string;
  username: string;
  email: string;
  createdAt?: Date;
}

export interface Signin {
  email: string;
}

export interface Signup {
  username : string;
  email: string;
}


const authApi = createApi({
  reducerPath: "auth",
  baseQuery: fetchBaseQuery({ baseUrl: "https://localhost:7232/api/Auth/" }),
  endpoints: (builder) => ({
    logout : builder.mutation<void,{Id : string}>({
      query : (body) => ({
        url : "logout",
        body,
        credentials : "include",
        method : "POST",
        headers : { "Content-Type": "application/json" }
      }),
    }),
    signin: builder.mutation<User, Signin>({
      query: (body) => ({
        url: "signin",
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body,
      }),
    }),

    signup: builder.mutation<User, Signup>({
      query: (body) => ({
        url: "signup",
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body,
      }),
    }),
    signupwithverify : builder.mutation<User,Signup>({
          query : (body) => ({
            url : "signupverify",
            credentials : "include",
            method : "POST",
            headers : { "Content-Type": "application/json" },
            body
          }),
        }),
    me : builder.mutation<User,User>({
      query : (body) => ({
        url:"me",
        body,
        headers : { "Content-Type": "application/json" },
        method : "POST",
        credentials : "include"
      })
    })
  }),
});

export const {
  useSigninMutation,
  useSignupMutation,
  useSignupwithverifyMutation,
  useLogoutMutation,
  useMeMutation
} = authApi;
export const AuthService = authApi;
