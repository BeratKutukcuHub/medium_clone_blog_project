import axios from "axios"

export const SignupService = async (userName: string, email:string, password : string) : Promise<boolean> => {
    const response = await axios.post(`https://localhost:7232/api/Auth/Signup`,
        {
            "userName": userName,
            "email": email,
            "passwordHash": password
        },
        {
            headers : {
                "Content-Type" : "application/json"
            }
        }
    );
    if(response.status < 200 || response.status >= 300)
        return false;
    return true;
}