import { useEffect, useRef, useState } from "react";
import { CgDanger } from "react-icons/cg"
import { FcGoogle } from "react-icons/fc"
import { MdOutgoingMail } from "react-icons/md"
import { SignupValidation } from "./SignupValidation";
import { useSignupMailMutation, type SignupMailResponse } from "../../app/slices/AuthService";

export const SignUpEmail = ({activation, isActivation} : {activation : (arg : boolean)=> void, isActivation:boolean}) => {
    const [signupMail] = useSignupMailMutation();
    const [email, setCreateEmail] = useState<string>("");
    const [isBoolean , setBoolean] = useState<boolean>(false);
    const [activationCode , setActivationCode] = useState<SignupMailResponse>({} as SignupMailResponse);
    const buttonRef = useRef<HTMLButtonElement>(null);
    
    interface HostResponse {
        email : string,
        isOk : boolean    
    };
    const startInputContent = {
        border:"none",
        padding:"8px 20px",
        minWidth:"100%",
        borderRadius:"5px",
        fontSize:"0.9rem",
        fontWeight:"500"
    }
    
    const handleCheckEmailResolver = () : HostResponse => {
        const mailList : string[] = ["gmail.com","hotmail.com","outlook.com"];
        const response : HostResponse = {} as HostResponse;
        mailList.forEach((mail) => {
            
            if(email.includes("@"))
            {
                const value = email.split("@");
                if(mail == value[1]){
                    response.email = email;
                    response.isOk = true;  
                }
            }
            else {
                response.email = "";
                response.isOk = false;
            }
        });
        return response;
    };

    const handleClick = async (): Promise<void> => {
        const request = handleCheckEmailResolver();
        if(!request.isOk)
        {
            activation(false);
        }
        else {
            buttonRef.current?.classList.add("no-click");
            const response = (await signupMail({email : email}).unwrap());
            setActivationCode(response)
            buttonRef.current?.classList.remove("no-click");
            activation(true);
        }
    }
    useEffect(()=>{
    },[isActivation]);

    
    return (
        <div className="pd2 ep d-flex flex-column  align-items-center justify-content-start gap-4 popup"
                    onClick={(e) => e.stopPropagation()}>
                            <div className="w-100 d-flex justify-content-center"><MdOutgoingMail style={{
                                fontSize:"3rem" , transform: "rotate(-30deg)"
                            }}/> 
                            </div>
                            {
                                !isActivation?
                                <>
                                <h1 style={{fontSize:"1.6rem",fontWeight:"500"}}>Sign up with email</h1>
                            <div className="d-flex flex-column align-items-flex-start ec" style={{minWidth:"55%",position:"relative"}}>
                                <h6 style={{marginTop:"20px"}}>Your email</h6>
                                <input value={email} type="text" placeholder="Enter your email address" className="ei" 
                                style={
                                    isBoolean!?  {
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
                                onBlur={()=> setBoolean(!handleCheckEmailResolver().isOk)}
                                onClick={()=> setBoolean(false)}/>
                                    {
                                        isBoolean!? <CgDanger size={25}  style={{
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
                                    isBoolean!?
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
                                }} onClick={async ()=> await handleClick()}>Create account</h5>
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

                            <h5 style={{fontSize:"0.8rem"}}>Already have an account? <span style={{textDecoration:"underline"}}>Sign in</span></h5>
                            <h5 style={{opacity:"0.50",fontSize:"0.8rem",width:"50%",textAlign:"center"}}>This site is protected by reCAPTCHA Enterprise and the
                            Google Privacy Policy and Terms of Service apply.</h5>
                                </>
                                : 
                                <SignupValidation signupMailResponse={activationCode} />
                            }
                        </div>
    );
}
    