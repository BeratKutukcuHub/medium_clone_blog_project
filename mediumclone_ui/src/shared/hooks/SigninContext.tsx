import { createContext } from "react";

export interface SigninResponse {
    isPopin : boolean,
    setPopin : (arg : boolean) => void,
    content : string,
    setContent : (arg : string) => void
};
export const SigninContext = createContext<SigninResponse>({
    isPopin : false,
    setPopin : ()=> {},
    content : "",
    setContent : ()=> {}
})