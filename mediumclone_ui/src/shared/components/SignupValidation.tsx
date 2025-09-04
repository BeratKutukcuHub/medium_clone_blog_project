import { useEffect, useRef, useState } from "react";
import "./signup.css"
import { useNavigate } from "react-router-dom";
import type { SignupMailResponse } from "../../app/slices/AuthService";

export const SignupValidation = ({signupMailResponse}: {signupMailResponse:SignupMailResponse}) => {
    const {email ,activation } = signupMailResponse;
    const [isApplied , setApplied] = useState<boolean>(false);
    const applyButtonRef = useRef<HTMLButtonElement>(null);
    const inputRef = useRef<HTMLInputElement[]>([] as HTMLInputElement[]);

    const navigate = useNavigate();
    useEffect(()=> {
        if(isApplied){
            navigate(`/signupwithsignin/${email}`);
        }
    },[isApplied]);

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
                inputRef.current[5].classList?.remove("bd");
                classList?.add("acabga");
                    classList?.remove("acabgp");
            }
            else {
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
            let code : string = "";
            inputRef.current.forEach((item) => {
                code += item.value;
            });
            console.log(code);
            if(code.trim() === activation.trim().toString()){
                setApplied(true);
                return;
            }
            else setApplied(true);
            return;
        }
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