import { createContext } from "react"
export interface SignupResponse {
    isPop : boolean,
    setPop : (arg : boolean) => void,
}
export const SignupContext = createContext<SignupResponse>({
    isPop : false,
    setPop: () => {}
});

