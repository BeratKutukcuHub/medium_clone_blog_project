import {createApi, fetchBaseQuery} from "@reduxjs/toolkit/query/react";
const header = {
    "Content-type" : "application/json"
};
export interface SigninRequest {
    userName : string,
    email : string
}
export interface SigninResponse {
    token : string
}
export interface SignupMailResponse {
    email : string,
    activation : string,
    activationTimeOut : Date
}
export interface RefreshResponse {
    email : string,
    userName : string
}
export const AuthService = createApi({
    reducerPath : "signinApi",
    baseQuery : fetchBaseQuery({baseUrl : "https://localhost:7232/api/Auth", credentials : "include"}),
    endpoints : (builder) => ({
        signin : builder.mutation<SigninResponse,SigninRequest>({
            query : (signinrequest : SigninRequest) => ({
                url : "Signin",
                body : signinrequest,
                method : "POST",
                headers : header
            })
        }),
        signupMail : builder.mutation<SignupMailResponse,{email : string}>({
            query : (signupmail) => ({
                url : "SignupMail",
                body : signupmail,
                headers : header,
                method : "POST"
            }),
        }),
        signup : builder.mutation<object,{email : string,userName : string}>({
            query : (signupinfo) => ({
                url : "Signup",
                body : signupinfo,
                method : "POST",
                headers : header
            })
        }),
        refresh : builder.mutation<{token : string},RefreshResponse>({
            query : (userInfo) => ({
                url : "Refresh",
                body : userInfo,
                headers : header,
                method : "POST"
            })
        }),
    })
});
export const {useRefreshMutation ,useSigninMutation ,useSignupMailMutation ,useSignupMutation} =  AuthService;
