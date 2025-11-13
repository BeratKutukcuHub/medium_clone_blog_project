import { useParams } from "react-router-dom";
import { useGetPostQuery } from "../../../app/services/PostService";
import { useGetUserQuery } from "../../../app/services/UserService";
import { GoArrowRight } from "react-icons/go";
import "./post.css";

export const PostDetail = () => {
  const {id} = useParams<{id : string}>();
  const [postId, userId] = (id ?? "").split("-");
  const {
    data: post,
    isLoading: postLoading,
    isError: postError,
    isSuccess: postSuccess,
  } = useGetPostQuery(postId, { skip: !postId });

  const {
    data: user,
    isLoading: userLoading,
    isError: userError,
    isSuccess: userSuccess,
  } = useGetUserQuery(userId, { skip: !userId });


  if (postLoading || userLoading) return <h4>Yükleniyor...</h4>;
  if (postError || userError) return <h4>Hata oluştu.</h4>;

  if (!postSuccess || !userSuccess) return null;

  return (
    <div className="pdc">
      <div className="pdcc">
        <div className="pdf">
          <div>
          <h4 className="flm">Post Numarası : <span className="fw"> {post.id}</span></h4>
          <h4 className="flm">Oluşturulma Tarihi : {
          <span className="fw"> {new Date(post.createAt ?? "").toLocaleString()}</span>}</h4>
          </div>
          <div>
            <h4 style={{ display: "flex", alignItems: "center" }}>
            Kullanıcı bilgileri
            <GoArrowRight style={{ marginLeft: "3px" }} />
          </h4>
          <h4 className="flm" style={{textWrap:"nowrap"}}>Kullanıcı Numarası : 
            <span className="fw">{user?.id}</span></h4>
          <h4 className="flm" style={{textWrap:"nowrap"}}>Kullanıcı Adı : <span className="fw"> 
            {user?.username}</span></h4>
          <h4 className="flm">Kullanıcı Maili :<span className="fw"> {user?.email}</span></h4>
          </div>
        </div>
        <div className="pdm">
          <h3 className="fls">{user.username.toUpperCase()} - "{post.title}"</h3>
          <h4 className="flm" style={{textIndent:"15px"}}>  {post.description}</h4>
        </div>
        <div className="pdb">
          <h4 className="flm">Oluşturulma Tarihi : <span className="fw"> {new Date(post?.createAt??"")
            .toLocaleString()}</span></h4>
        </div>
      </div>
    </div>
  );
};
