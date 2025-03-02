'use server';
import { createSessionClient } from "@/config/appwrite";
import { cookies } from "next/headers";

export async function checkAuth() {
    const sessionCookie= cookies().get('appwrite-session');
    //check for session cookie
    if (!sessionCookie) {
        return{
            isAuthenticated: false
        }
    }

    try {
        // use session client to verify the session
        const {account} = await createSessionClient(sessionCookie.value);

        //Get user info
        const {user}= await account.get();
        console.log('user authenticated',user);

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
