export interface HostResponse {
        email : string,
        isOk : boolean    
    };
export const EmailHandler = (email: string) : HostResponse => {
        const mailList : string[] = ["gmail.com","hotmail.com","outlook.com"];
        const response : HostResponse = {} as HostResponse;
        mailList.forEach((mail) => {
            
            if(email.includes("@"))
            {
                const value = email.split("@");
                if(mail == value[1]){
                    response.email = email;
                    response.isOk = true;  
                }
            }
            else {
                response.email = "";
                response.isOk = false;
            }
        });
        return response;
};