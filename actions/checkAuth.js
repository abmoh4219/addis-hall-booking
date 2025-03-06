'use server';
import { createSessionClient } from "@/config/appwrite";
import { cookies } from "next/headers";

export async function checkAuth() {
    const cookieStore= await cookies();
    const sessionCookie=  cookieStore.get('appwrite-session');
    console.log("checkAuth: Session Cookie:", sessionCookie);
    //check for session cookie
    if (!sessionCookie) {
        console.log("checkAuth: No session cookie found");
        return{
            isAuthenticated: false,
        }
    }

    try {
        // use session client to verify the session
        console.log("cookie value: the cookie value ", sessionCookie.value);
        const {account} = await createSessionClient(sessionCookie.value);
        console.log(account);
        

        //Get user info
        const user= await account.get();
        console.log("checkAuth: User Retrieved:", user);

        return{
            isAuthenticated: true,
            user: {
                id: user.$id,
                email: user.email,
                name: user.name,
            },
        };
        
        
    } catch (error) {
        console.error('Check Auth error: '+ error);
        
        return{
            isAuthenticated: false,
        };
    }

}
