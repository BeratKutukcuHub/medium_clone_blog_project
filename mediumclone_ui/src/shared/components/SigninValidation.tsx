import { FcGoogle } from "react-icons/fc";
import "./signin.css";
import { useEffect, useRef, useState } from "react";
import { MdOutgoingMail } from "react-icons/md";
import { EmailHandler } from "../../utilities/emailHandler";
import { CgDanger } from "react-icons/cg";
import { useVerifyMutation } from "../../app/services/ActivationService";
import { useNavigate } from "react-router-dom";
import { useSigninMutation } from "../../app/services/AuthService";
import { useDispatch } from "react-redux";
import { setUser } from "../../app/slices/UserSlice";

export const SigninValidation = () => {
    const navigate = useNavigate();
    const [signin, {data,isSuccess,error}] = useSigninMutation();
    const dispatch = useDispatch();
    const [email, setCreateEmail] = useState<string>("");
    const [isBoolean , setBoolean] = useState<boolean>(false);
    const [isSuccessConfirm, setSuccess] = useState(false);
    const buttonRef = useRef<HTMLButtonElement>(null);
    const [send] = useVerifyMutation();
    const startInputContent = {
        border:"none",
        padding:"8px 20px",
        minWidth:"100%",
        borderRadius:"5px",
        fontSize:"0.9rem",
        fontWeight:"500"
    }
    const handleClick = ( ) => {
        localStorage.setItem("email",JSON.stringify(email));
        send({
            activation : {email},
            title : "Giriş Aktivasyon Kodu",
            message : "Giriş işlemini tamamlamak için aktivasyon kodunuzu giriniz : "
        });
    }
    useEffect(()=>{
        const bc = new BroadcastChannel("activation_channel");
        bc.onmessage = (event) => {
            setSuccess(event.data.isVerified);
        }
        return () => bc.close();
    },[isSuccessConfirm]);

    useEffect(() => {
      if (!isSuccessConfirm) return;
      signin({ email });
    }, [isSuccessConfirm, signin, email]);
    
    useEffect(() => {
      if (!isSuccess || !data) return;
      dispatch(setUser(data));
      localStorage.setItem("user",JSON.stringify(data));
      navigate("/medium");
    }, [isSuccess, data, dispatch, navigate]);
    console.log(error)
    return (
        <>
            <div className="pd2 ep d-flex flex-column  align-items-center justify-content-start gap-4 popup"
                                onClick={(e) => e.stopPropagation()}>
                                        <div className="w-100 d-flex justify-content-center"><MdOutgoingMail style={{
                                            fontSize:"3rem" , transform: "rotate(-30deg)"
                                        }}/> 
                                        </div>
                                            <>
                                            <h1 style={{fontSize:"1.6rem",fontWeight:"500"}}>Sign in with email</h1>
                                        <div className="d-flex flex-column align-items-flex-start ec" style={{minWidth:"55%",position:"relative"}}>
                                            <h6 style={{marginTop:"20px"}}>Your email</h6>
                                            <input value={email} type="text" placeholder="Enter your email address" className="ei" 
                                            style={
                                                isBoolean?  {
                                                    display:"flex",
                                                    justifyContent:"space-between",
                                                    backgroundColor:"rgba(210, 210, 210, 1)",
                                                    border:"1px solid rgba(168, 53, 53, 1)",
                                                    padding:"8px 20px",
                                                    minWidth:"100%",
                                                    borderRadius:"5px",
                                                    position:"relative",
                                                    fontSize:"0.9rem",
                                                    fontWeight:"500"
                                                } : 
                                                startInputContent}
                                            onChange={(e)=>setCreateEmail(e.target.value)}
                                            onBlur={()=> setBoolean(!EmailHandler(email).isOk)}
                                            onClick={()=> setBoolean(false)}/>
                                                {
                                                    isBoolean? <CgDanger size={25}  style={{
                                                        stroke:"red",
                                                        fill : "red",
                                                        position:"absolute",
                                                        right:"3%",
                                                        top:"60%",
                                                    }}/> 
                                                    : 
                                                    ""
                                                }
                                        </div>
                                            {
                                                isBoolean?
                                                <h6 style={{fontSize:"0.7rem", color:"rgba(168, 53, 53, 1)"}}>
                                                    Please enter a valid email address.
                                                </h6> : ""
                                            }
                                        <button ref={buttonRef}  className="eb" style={{
                                                background:"#242424",
                                                width:"auto",
                                                borderRadius:"20px",
                                                height:"40px",
                                                border:"none",color:"white",
                                                
                                            }}>
                                            <h5  style={{padding:"0px 10px",textAlign:"center",
                                                margin:"0",
                                                fontSize:"0.9rem"
                                            }} onClick={async ()=> await handleClick()}>Signin with this Email</h5>
                                            </button>
                                            
                                            {
                                            email.trim().includes("@gm")? <div className="poa">
                                            <FcGoogle className="pi"/>
                                            <h3 className="pt">Sign up with Google</h3>
                                            <div className="mr"></div>
                                        </div> : ""
                                            }
                                        <h5 style={{textDecoration:"underline",fontSize:"0.8rem",cursor:"pointer"}}>
                                            Back to sign up options</h5>
            
                                        <h5 style={{opacity:"0.50",fontSize:"0.8rem",width:"50%",textAlign:"center"}}>This site is protected by reCAPTCHA Enterprise and the
                                        Google Privacy Policy and Terms of Service apply.</h5>
                                            </>
                                    </div>
        </>
    )
}