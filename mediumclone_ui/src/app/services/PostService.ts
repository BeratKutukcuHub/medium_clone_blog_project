import {createApi, fetchBaseQuery} from "@reduxjs/toolkit/query/react";
export interface AddPostType
{
    UserId : string,
    Categories : string[],
    title : string,
    description :  string,
}
export interface PostType{
    id : string,
    userId : string,
    categories : string[],
    title : string,
    description : string,
    createAt : Date
}
export const PostService = createApi({
    reducerPath : "post",
    baseQuery : fetchBaseQuery({baseUrl : `https://localhost:7232/api/Post`}),
    endpoints : (builder) => ({
        addPost : builder.mutation({
            query : (data : AddPostType) =>({
                method : "POST",
                url : "",
                body : data,
                headers : {"Content-type":"application/json"},
                credentials : "include"
            }),
        }),
        getPosts : builder.query<PostType[],void>({
            query : ()=> ({
                url : "posts",
                method : "GET",
                credentials : "include",
                headers : {"Content-type" : "application/json"}
            }),
        }),
        getPost : builder.query<PostType,string>({
            query : (Id:string)=> ({
                url : `/${Id}`,
                method : "GET",
                credentials : "include",
                headers : {"Content-type" : "application/json"}
            }),
        }),
    })
});

export const {useAddPostMutation , useGetPostsQuery, useGetPostQuery} = PostService;