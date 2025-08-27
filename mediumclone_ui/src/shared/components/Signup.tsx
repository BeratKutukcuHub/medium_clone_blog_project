import "./signup.css";
import { FcGoogle } from "react-icons/fc";
import { FaFacebook } from "react-icons/fa";
import { CiMail } from "react-icons/ci";
import { useEffect, useState } from "react";
export const Signup = ({handlePop} : {handlePop : (arg : boolean)=> void}) => {

    const [openPop , setPop] = useState(true);
    
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
                        <h1 className="mt-5">Join Medium.</h1>
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
                                <CiMail className="pi" color="blue"/>
                                <h3 className="pt">Sign up with email</h3>
                                <div className="mr"></div>
                            </div>
                        </div>
                        <h4 className="pdi">Already have an account? <span className="text-decoration-underline">Sign in</span></h4>
                        <h4 className="pdi pdb">
                            Click “Sign up” to agree to Medium’s <span className="pdb text-decoration-underline">
                                Terms of Service</span> and acknowledge
                             that Medium’s <span className="pdb text-decoration-underline">
                                Privacy Policy</span> applies to you.
                        </h4>
                    </div>
            </div>
        </>
    );
}