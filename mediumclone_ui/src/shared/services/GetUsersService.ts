import axios from "axios"
interface UserResponse {
    id : string,
    userName : string,
    passwordHash : string,
    email : string,
    role : string[],
    createdAt : Date
}
export const GetUserService = async (token : string) : Promise<UserResponse> => {
    const responseUser = await axios.get(`https://localhost:7232/api/User`
        ,{
            headers : {
                "Content-Type" : "application/json",
                "Authorization" : token
            }
        }
    );
    const responseUserDto : UserResponse = responseUser.data;
    return responseUserDto;
}