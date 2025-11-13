import { RiMenuFill } from "react-icons/ri";
import { CiSearch } from "react-icons/ci";
import { TfiWrite } from "react-icons/tfi";
import { GoBell } from "react-icons/go";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { clearUser } from "../../app/slices/UserSlice";
import { useLogoutMutation } from "../../app/services/AuthService";
import type { RootState } from "../../app/store";

export const Navbar = ({handleClick} : {handleClick : (state : boolean) => void}) => {
    const [logout] = useLogoutMutation();
    const selectorUser = useSelector((state : RootState)=> state.user);
    const [isClick , setClick] = useState(false);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    
    const handleLogout = () => {
        logout({Id : selectorUser.user?.id??""});
        localStorage.removeItem("user");
        localStorage.removeItem("email");
        dispatch(clearUser());
        navigate("/");
    }
    return (
        <nav className="w-100 d-flex justify-content-between align-items-center position-fixed" 
        style={{borderBottom:"1px solid rgba(230, 230, 230, 1)",height:"60px",zIndex:"99999999",backgroundColor:"white"}}>
            <div className="d-flex align-items-center" style={{marginLeft:"18px",
                gap:"10px"
            }}>
                <div style={{minWidth:"40px", height:"30px",alignSelf:"center"}}>
                    <RiMenuFill style={{width:"100%",cursor:"pointer",height:"70%",opacity:"0.5",userSelect:"none"}} onClick={()=> {
                        setClick((prev) => !prev);
                        handleClick(isClick);
                    }}/>
                </div>
                <h1 style={{letterSpacing:"-2px",fontSize:"2rem", fontWeight:"500",lineHeight:"28px"}}>Medium</h1>
                <div className="d-flex" style={{width:"230px",borderRadius:"20px",marginLeft:"20px",
                    height:"40px",
                    backgroundColor:"rgba(249, 248, 248, 1)"}}>
                    <div style={{display:"flex",flexBasis:"20%",alignItems:"center",textAlign:"center",
                        width:"100%",justifyContent:"center"}}>
                        <CiSearch style={{fontSize:"1.5rem"}}/>
                    </div>
                    <input placeholder="Search" 
                    style={{backgroundColor:"transparent",
                    border:"none",
                    outline:"none",
                    flexBasis:"80%",
                    width:"100%",
                    letterSpacing:"-1px",fontWeight:"500",fontSize:"0.9rem"}}/>
                </div>
            </div>
            <div className="d-flex align-items-center gap-4">
                <Link to={"/write"} 
                style={{display:"flex",textDecoration:"none",
                alignItems:"center" ,gap:"15px",marginRight:"20px",color:"rgba(65, 65, 65, 1)"}}>
                    <TfiWrite style={{fontSize:"1.5rem",opacity:"0.5"}}/>
                    <h5 style={{fontSize:"0.9rem",margin:"5px 0px 0px 0px"}}>Write</h5>
                </Link>
                <div>
                    <GoBell fontSize={"1.5rem"} style={{fontWeight:"100",fill:"rgba(123, 123, 123, 1)"}}/>
                </div>
                <div onClick={handleLogout} style={{width:"25px",height:"25px",borderRadius:"50%", backgroundColor:"rgba(141, 42, 42, 1)",
                    cursor:"pointer",textAlign:"center",marginRight:"25px"}}>
                    ❌
                </div>
            </div>
        </nav>
    )
}