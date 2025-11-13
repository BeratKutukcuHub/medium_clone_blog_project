import { useEffect, useState } from "react";
import { useGetPostsQuery, type PostType } from "../../../app/services/PostService"
import { PostItem } from "./PostItem";
import "./post.css"
export const PostList = () => {
    const {data,isSuccess} = useGetPostsQuery();
    
    const [posts, setPosts] = useState<PostType[]>([] as PostType[]);
    useEffect(()=> {
        if(!isSuccess) return;
        setPosts(data);
    }, [isSuccess,data]);
    return (
        <div className="pc">
            {
                data? 
                posts.map((postItem,index) => {
                    return <PostItem key={index} post={postItem} isSuccessPost={isSuccess}/>
                })
                : ""
            }
        </div>
    )
}