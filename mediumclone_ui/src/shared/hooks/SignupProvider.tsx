import { useState, type ReactNode } from "react";
import {SignupContext} from "./SignupContext";

export const SignupProvider = ({children}: {children : ReactNode}) => {
    const [isPop , setPop] = useState<boolean>(false);
    const settingPop = (arg : boolean) : void => setPop(arg);
    return (
        <SignupContext.Provider value={{isPop : isPop, setPop : settingPop}}>
            {
            children
            }
        </SignupContext.Provider>
    );
}