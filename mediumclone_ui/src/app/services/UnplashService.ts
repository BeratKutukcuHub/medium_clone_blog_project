import {createApi, fetchBaseQuery} from "@reduxjs/toolkit/query/react"
const apiKey = "h1zO-15GJvZzEZTfm6pS8_jf4odrvRBva6-jljMNsW0";
export const UnsplashService = createApi({
    reducerPath : "unsplash",
    baseQuery : fetchBaseQuery({baseUrl : `https://api.unsplash.com/`}),
    endpoints : (builder) => ({
        getPhotos : builder.query({
            query : (data:string) => ({
                url : `/search/photos?query=${data}&page=1&per_page=10`,
                headers : {
                    "Content-type" : "application/json",
                    Authorization: `Client-ID ${apiKey}`
                },
            })
        })
    })
});
export const {useLazyGetPhotosQuery} = UnsplashService;