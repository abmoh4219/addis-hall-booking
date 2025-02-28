'use server';
import { createSessionClient } from "@/config/appwrite";
import { redirect } from "next/navigation";
import { cookies } from "next/headers";

export async function createSession(previousState,formData) {
    try {
        const email= formData.get('email'); // Extract email from the form
        const password= formData.get('password') // Extract password from the form

        if (!email || !password) {
            return{
                error: 'Please fill out all fields'
            };
        }

        const {account} = await createSessionClient();
        const session= await account.createEmailPasswordSession(email,password);

        const cookie= cookies();
        cookie.set('appwrite-session',session.secret,{
            httpOnly: true,
            secure: true,
            sameSite: 'Strict',
            expires: new Date(session.expire),
            path: '/'
        })

        return{
            success: true
        };
        

    } catch (error) {
        console.error('Authentication Error: ', error);
        return { 
            error:'Invalid credentials'
         };
    }
}