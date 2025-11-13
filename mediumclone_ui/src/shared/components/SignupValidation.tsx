import { useEffect, useRef, useState } from "react";
import "./signup.css"
import { useConfirmVerifyMutation } from "../../app/services/ActivationService";
import { useNavigate } from "react-router-dom";

export const SignupValidation = ({email}:{email:string}) => {
    const applyButtonRef = useRef<HTMLButtonElement>(null);
    const inputRef = useRef<HTMLInputElement[]>([] as HTMLInputElement[]);
    const navigate = useNavigate();
    const [isVerified , setVerified] = useState<boolean>(false);
    console.log(isVerified);
    const [confirmVerify, {isSuccess}] = useConfirmVerifyMutation();
    const [token , setToken] = useState<string>("");
    const handleChangeValues = () : boolean => {
        const response = inputRef.current.some((item) => item.value === "");
        return response;
    }
    
    const handleChange = (e : React.ChangeEvent<HTMLInputElement>,index : number) => {
            if(e.currentTarget.value !== "" && index <5){
                inputRef.current[index+1].classList.add("bd");
                inputRef.current[index].classList.remove("bd")
                inputRef.current[index+1].focus();
            }
            const response = handleChangeValues();
            const classList = applyButtonRef.current?.classList;
            if(!response){
                for(const input of inputRef.current){
                    setToken((prev)=> prev+=input.value);
                }
                inputRef.current[5].classList?.remove("bd");
                classList?.add("acabga");
                    classList?.remove("acabgp");
            }
            else {
                setToken("");
                classList?.add("acabgp");
                classList?.remove("acabga");
            }
        }

        const handleRef = (event : HTMLInputElement ,index : number) => {
            inputRef.current[index] = event;
        }
        
        const handleKey = (e:React.KeyboardEvent<HTMLInputElement>, index : number) => {
            if(e.key === "Backspace" && index > 0){
                inputRef.current[index].value = "";
                inputRef.current[index-1].focus();
                
            }
        }
        const handleClick = () => {
            confirmVerify({email : email, token});
            if(isSuccess)
                setVerified(isSuccess);
            return;
        }
        useEffect(()=>{
            if(isVerified)
            navigate(`/signupwithsignin/${email}`);
        },[isVerified, email, navigate]);
        
        useEffect(() => {
        const bc = new BroadcastChannel("activation_channel");
        bc.onmessage = (event) => {
          const verified: boolean = event.data.isVerified;
          if (verified) {
            setVerified(true);
          }
        };
        return () => {
          bc.close(); 
        };
        },[]); 

useEffect(() => {
  if (isVerified) {
    navigate(`/signupwithsignin/${email}`);
  }
}, [isVerified, email, navigate]);

    return (
        <>
            <h5>Check your email inbox</h5>
            <h6>To sign up, click the magic link or enter the code we sent to:</h6>
            <h6>{email}</h6>
            <div className="d-flex justify-content-around w-50 m-auto">
                
                {
                    Array.from({length : 6}).map((_,index:number)=> {
                        return <input maxLength={1} type="text" key={index}
                        ref={(e:HTMLInputElement) => handleRef(e,index)} className="ac acbp"  onChange={
                    (e)=>handleChange(e,index)}
                    onKeyUp={(e)=> handleKey(e,index)}/>
                    })
                }
               
            </div>
            <button className="acabgp" ref={applyButtonRef} onClick={() => handleClick()}>Validate</button>
            <a style={{textDecoration:"underline",cursor:"pointer",
                fontSize:"0.9rem", fontWeight:"500"
            }}>Resend code</a>
        </>
         
    );
}