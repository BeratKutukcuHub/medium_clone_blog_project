import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export interface Activation {
    email : string,
}
export interface SignupActivation {
  title : string,
  message : string,
  activation : Activation;
}
export interface Confirm {
    email : string,
    token : string
}
export const ActivationService = createApi({
    reducerPath : "activation",
    baseQuery : fetchBaseQuery({baseUrl : "https://localhost:7232/api/Verify/"}),
    endpoints : (builder) => ({
        confirmVerify : builder.mutation<string,Confirm>({
        query: (body) => ({
           url : "confirm",
           method : "POST",
           headers : { "Content-Type": "application/json" },
           body
        }),
    }),
    verify: builder.mutation<void, SignupActivation>({
      query: (body) => ({
        url: "send",
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body,
      }),
    }),
    })
});
export const {useConfirmVerifyMutation , useVerifyMutation } = ActivationService;