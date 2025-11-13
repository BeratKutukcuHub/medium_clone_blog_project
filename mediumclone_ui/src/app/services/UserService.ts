import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export interface GetUserType {
id : string,
username : string,
email : string,
isActive : boolean,
role : string[],
createdAt : string,
}
export const Header = {"Content-type" : "application/json"}; 
export const UserService = createApi({
    baseQuery : fetchBaseQuery({
        baseUrl : "https://localhost:7232/api/User/"
    }),
    reducerPath : "userservice",
    endpoints : (builder) => ({
        getUser : builder.query<GetUserType,string>({
            query : (Id) => ({
                url : Id,
                credentials : "include",
                method : "GET",
                headers : Header
            })
        })
    })
});
export const {useGetUserQuery} = UserService;