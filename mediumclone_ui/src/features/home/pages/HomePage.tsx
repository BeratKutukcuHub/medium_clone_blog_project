import { Link } from "react-router-dom";
import "./home.css";
import { useContext, useEffect, useState } from "react";
import { SigninContext } from "../../../shared/hooks/SigninContext";
import { Signin } from "../../../shared/components/Signin";
import { Signup } from "../../../shared/components/Signup";
import { SignupContext } from "../../../shared/hooks/SignupContext";
export const HomePage = () => {
    const [search , setSearch] = useState(false);
    const {isPop, setPop} = useContext(SignupContext);
    const {content, isPopin , setContent , setPopin} = useContext(SigninContext);
    useEffect(()=> {
        if(search){
            setContent("Welcome back.")
            return;
        }
        setContent("Create an account to start writing.");
        return;
    },[search]);

    return (
        <>
            {isPopin? <Signin isPopin={isPopin} content={content} setPopin={setPopin}/> : ""}
            {isPop? <Signup popState={isPop} handlePopSwitch={setPop}/> : ""}
            <nav className="nc  bg-white  border-1 border-black text-center m-0 d-flex align-items-center
             justify-content-center borderbottom w-100" style={{height:"75px"}}>
                <div className="d-flex widthNavbar justify-content-between ">
                    <h1><a className="text-decoration-none text-custom pointer">Medium</a></h1>
                
                        <div className="d-flex ng align-items-center text-center">
                    <h3><Link to={"/ourstory"} className="text-decoration-none text-custom pointer ni">Our story</Link></h3>
                    <h3><Link to={"/membership"} className="text-decoration-none text-custom pointer ni">Membership</Link></h3>
                    <h3><Link to={""} className="text-decoration-none text-custom pointer ni" 
                    onClick={()=> {
                        setSearch(false);
                        setPopin(true);
                    }}>Write</Link></h3>
                    <h3><Link to={""} className="text-decoration-none text-custom pointer d-inline" 
                    onClick={()=>{
                        setSearch(true);
                        setPopin(true);
                    }}>Signin</Link></h3>

                        <button className="bg-custom text-white rounded-5 px-3 py-2 d-flex
                     justify-content-center align-items-center pointer nb ne"
                     onClick={()=> {
                        setPop(true);
                    }}>
                            <a className="text-decoration-none text-white pointer ">Get started</a>
                        </button>
                    </div>
                </div>
            </nav>
            
            <div className="d-flex justify-content-center align-items-center overflow-hidden hero">

                <div className="d-flex flex-column gap-4 lhero">
                    <div><h1 className="hero-title">Human </h1>
                    <h1 className="hero-title">stories & ideas</h1></div>
                    <h4 className="hero-detail">A place to read, write, and deepen your understanding</h4>
                    <button className="rounded-5 button-sizer fb">
                        <a className="text-decoration-none text-white fweight">Start reading</a>
                    </button>
                </div>
                <div className="rhero position-relative ">
                    <img src="images/mediumclone_home_img.webp" className="img"/>
                </div>


            </div>
            <div className="d-flex w-100 fd justify-content-center align-items-center fc">
                <footer className="d-flex justify-content-center gap-4  ff">
                    <a className="fa">Help</a>
                    <a className="fa ni">Status</a>
                    <a className="fa">About</a>
                    <a className="fa ni">Careers</a>
                    <a className="fa ni">Press</a>
                    <a className="fa ni">Blog</a>
                    <a className="fa ni">Privacy</a>
                    <a className="fa ni">Rules</a>
                    <a className="fa">Terms</a>
                    <a className="fa ni">Text to speech</a>
                </footer>
            </div>
        </>
            
        
    )
}