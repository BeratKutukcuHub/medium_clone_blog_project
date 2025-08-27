import axios from "axios"

export const LoginService = async (userName : string, password: string) : Promise<string> => {
    const token = await axios.post("https://localhost:7232/api/Auth/Signin",
        {
            "userName" : userName,
            "passowrdHash" : password
        },
        {
            headers : { "Content-Type" : "application/json" }
        }
    );
    const tokenResponse : string = token.data.token;
    return tokenResponse;
}