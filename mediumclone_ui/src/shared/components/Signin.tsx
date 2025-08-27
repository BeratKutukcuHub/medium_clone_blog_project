import { useEffect, useState } from "react";
import { CiMail } from "react-icons/ci";
import { FaFacebook } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";
import { FaApple } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import "./signin.css";
export const Signin = ({handlePop} : {handlePop : (arg : boolean)=> void}) => {

    const [openPop , setPop] = useState(true);
        console.log(openPop);
        useEffect(()=>{
            handlePop(openPop);

        },[openPop]);

    return (
        <>
        <div className={`pc position-fixed ${openPop?"d-flex":"d-none"} justify-content-center align-items-center open`} 
                    onClick={()=>setPop(false)}
                    >
                            <div className="pd d-flex flex-column  align-items-center justify-content-start gap-4 popup"
                            onClick={(e) => e.stopPropagation()}>
                                <h1 className="mt-5">Welcome back.</h1>
                                <div className="oauthg">
                                    <div className="poa">
                                        <FcGoogle className="pi"/>
                                        <h3 className="pt">Sign up with Google</h3>
                                        <div className="mr"></div>
                                    </div>
                                    <div className="poa">
                                        <FaFacebook className="pi" color="blue"/>
                                        <h3 className="pt">Sign up with Facebook</h3>
                                        <div className="mr"></div>
                                    </div>
                                    <div className="poa">
                                        <FaApple className="pi" color="blue"/>
                                        <h3 className="pt">Sign up with Facebook</h3>
                                        <div className="mr"></div>
                                    </div>
                                    <div className="poa">
                                        <FaXTwitter className="pi" color="blue"/>
                                        <h3 className="pt">Sign up with Facebook</h3>
                                        <div className="mr"></div>
                                    </div>
                                    <div className="poa">
                                        <CiMail className="pi" color="blue"/>
                                        <h3 className="pt">Sign up with email</h3>
                                        <div className="mr"></div>
                                    </div>
                                </div>
                                <h4 className="pdi">No account?  <span className="text-decoration-underline">Create one</span></h4>
                                <h4 className="pdi">Forgot email or trouble signing in?  <span className="text-decoration-underline"> Get help.</span></h4>
                                <h4 className="pdi pdb">
                                    Click “Sign in” to agree to Medium’s <span className="pdb text-decoration-underline">
                                        Terms of Service</span> and acknowledge
                                     that Medium’s <span className="pdb text-decoration-underline">
                                        Privacy Policy</span> applies to you.
                                </h4>
                            </div>
                    </div>
        </>
    )
}