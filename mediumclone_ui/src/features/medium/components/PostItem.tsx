import { useEffect, useState } from "react";
import { type PostType } from "../../../app/services/PostService";
import { useGetUserQuery, type GetUserType } from "../../../app/services/UserService";
import "./post.css";
import { GoArrowRight } from "react-icons/go";
import { useNavigate } from "react-router-dom";

interface PostItemProps {
  post: PostType;
  isSuccessPost: boolean;
}

export const PostItem = ({ post, isSuccessPost }: PostItemProps) => {
  const skipQuery = !isSuccessPost || !post.userId;
  const { data: userInfo, isLoading, isError, isSuccess } = useGetUserQuery(post.userId ?? "", { skip: skipQuery });

  const [user, setUser] = useState<GetUserType | null>(null);

  const navigate = useNavigate();
  useEffect(() => {
    if (!userInfo || userInfo === undefined)return;
     setUser(userInfo);
  }, [userInfo, isSuccess]);
  const handlePostDetail = () => {
    navigate(`/medium/post/${post.id+"-"+post.userId}`);
  }

  return (
    <div className="pci">
      {isLoading && <div>Loading user...</div>}
      {isError && <div>Error loading user</div>}
      {isSuccess && user &&  (
        <div className="pcu">
          <h4 className="fs">{user.username}</h4> <h4 className="fs" style={{
            height:"100%",alignSelf:"center"
          }}>|</h4>
          <h4 className="fs">{user.email}</h4> 
          <h4 className="fs">{user.isActive ? 
            <div className="active"></div> : 
            <div className="passive"></div> }
          </h4>
        </div>
      )}

      <div className="pcc">
        <h4 className="fl">{post.title}</h4>
        <h4 className="fm">{post.description}</h4>
      </div>
      <div className="pcd">
        <h4 className="fs">{new Date(post.createAt).toLocaleString()}</h4>
        <i onClick={handlePostDetail}><GoArrowRight/></i>
      </div>
    </div>
  );
};
