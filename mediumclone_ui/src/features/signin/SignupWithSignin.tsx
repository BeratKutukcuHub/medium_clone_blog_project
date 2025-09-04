import { useParams } from "react-router-dom"
import { GiBlackBook } from "react-icons/gi";
import { useRef, useState } from "react";
import { LiaAtomSolid } from "react-icons/lia";
import { AiOutlineLike } from "react-icons/ai";
import { AiOutlineDislike } from "react-icons/ai";
import "./signupwithsignin.css"
import { useRefreshMutation, useSigninMutation, useSignupMutation } from "../../app/slices/AuthService";
interface TagAndIndex  {
    tagName : string,
    index : number
}
export const SignupWithSignin = ( ) => {
    const [signup] = useSignupMutation();
    const [signin] = useSigninMutation();
    const [refresh] = useRefreshMutation();
    const [userName, setUserName] = useState("");
    const buttonRef = useRef<HTMLButtonElement>(null);
    const tagSName  = () : string => crypto.randomUUID().substring(0,10);
    const [clicked, setClicked] = useState<TagAndIndex[]>([])
    const [registerState , setRegisterState] = useState(false);
    const param = useParams<{email : string}>();

    const handleRight = () => {
        const inputVal : number = userName.length ?? 0;
        console.log(inputVal);
        if(inputVal >= 5){
            setRegisterState(true);
            return;
        }
        else {
            setRegisterState(false);
            return;
        }
    }
    const handleClick = (tagName : string,index : number) => {
        console.log(clicked);
        
        setClicked((prev) => {
            if(prev.some((item) => item.index === index)){
                return prev.filter((item) => item.index !== index);
            }
            else return [
                ...prev,
                {
                    tagName ,
                    index
                }
            ]
        });
    }
    const handleApply = async () => {
            if(userName.length > 5){
                if(param.email){
                    await signup({
                        email : param.email,
                        userName : userName
                    }).unwrap();
                    const {token} = await signin({
                        email : param.email,
                        userName : userName
                    }).unwrap();
                    console.log(token);
                }
            }
        }
    return (
        <>
            <nav className="w-100 bg-white text-center text-black" style={{height:"86.5px",marginBottom:"30px"}}>
                <h1 style={{fontSize:"2.5rem",letterSpacing:"-1.5px"}}>Medium</h1>
            </nav>
            <div style={{textAlign:"center", width:"100%", display:"flex",justifyContent:"center",alignItems:"center",
                flexDirection:"column",gap:"20px"
            }}>
                {
                    !registerState?
                    <>
                        <GiBlackBook size={"150px"}/>
                <h2 style={{marginTop:"20px", fontSize:"2rem",fontWeight:"400",letterSpacing:"-1.5px"}}>Welcome to Medium!</h2>
                <h3 style={{fontSize:"1.2rem",fontWeight:"400"}}>We need a little more information to finish creating your account.</h3>
                <h4 style={{opacity:"0.5",fontSize:"0.9rem",letterSpacing:"-0.6px",wordSpacing:"2px"}}>Your full name</h4>
                <input value={userName} onChange={(e)=> setUserName(e.currentTarget.value)} type="text" maxLength={40} style={{width:"40%",
                    border:"none",
                    outline:"none",
                    background:"rgba(246, 246, 246, 1)",
                    borderRadius:"6px",
                    padding:"5px 15px",
                    fontFamily:"monospace",
                    letterSpacing:"-0.5px",
                    wordSpacing:"1.5px",
                    fontSize:"1.2rem",
                    opacity:"0.8",
                    borderBottom:"1px solid rgba(196, 196, 196, 1)"
                }}/>
                <h3 style={{fontSize:"0.9rem",color:"rgba(109, 109, 109, 0.42)"}}>Your email is  <span style={{
                        color:"black",
                        fontWeight:"bold",
                        marginLeft:"2px"
                }}>{param.email}</span></h3>
                <button  onClick={()=> handleRight()} style={{background:"#242424",
                    textAlign:"center",
                    borderRadius:"20px",
                    border:"none",
                    padding:"8px 20px",
                    color:"white",
                    fontSize:"0.9rem"
                }}>Create account</button>
                    </>
                    :
                    <>
                        <LiaAtomSolid size={"150px"} style={{fontWeight:"400"}}/>
                        <h2 style={{marginTop:"20px", fontSize:"2rem",fontWeight:"400",letterSpacing:"-1.5px"}}
                        >What are you interested in?</h2>
                        <h3 style={{fontSize:"1.2rem",fontWeight:"400"}}
                        >Choose three or more</h3>

                        <div style={{
                            width:"65%",display:"flex",
                            gap:"5px",
                            justifyContent:"space-around",
                            flexWrap:"wrap",
                            
                        }}>
                            {
                                Array.from({length : 20}).map((_,index)=> {
                                    
                                    return <div key={index} style={{fontSize:"0.9rem",color:"black",
                                    backgroundColor:"rgba(239, 239, 239, 1)",cursor:"pointer",
                                    borderRadius:"20px",position:"relative",
                                    
                                    padding:"10px 20px",
                                    marginBottom:"10px",
                                    textAlign:"center",
                                    width:"auto",
                                    height:"40px"
                                    }}
                                     onClick={()=> handleClick(tagSName(),index)}>
                                        <div style={{
                                            display:"flex",justifyContent:"space-between",
                                            gap:"10px",
                                            alignItems:"center"
                                        }}>
                                            <a style={{fontWeight:"500"}}>{tagSName()}</a>
                                            {
                                                clicked.some((item) => item.index === index)?
                                                <AiOutlineLike fill="rgba(25, 153, 18, 1)" style={{
                                                    fontWeight:"bold",
                                                    fontSize:"18px"
                                                }}/> : 
                                                <AiOutlineDislike fill="rgba(153, 39, 39, 1)" size={"18px"}/>
                                            }
                                        </div>
                                    </div>
                                })
                            }
                        </div>
                        {
                            clicked.length>= 3?
                            <button ref={buttonRef} className="ap a"
                            onClick={()=> handleApply()}>Continue</button>
                            : 
                            <button ref={buttonRef} className="ap p">Continue</button>
                        }
                        
                    </>
                }
            </div>
        </>
    )
}