import { useState, type ReactNode } from "react"
import { SigninContext } from "./SigninContext"

export const SigninProvider = ({children} : {children : ReactNode}) => {
    const [isPopin, setPopin] = useState(false);
    const [content , setContent] = useState("");
    const settingPopin = (arg : boolean) => setPopin(arg);
    return (
        <SigninContext.Provider value={{isPopin : isPopin,
             setPopin : settingPopin,
             content,
             setContent
        }}>
            {
                children
            }
        </SigninContext.Provider>
    )
}