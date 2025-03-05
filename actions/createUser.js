'use server';
import { createAdminClient } from "@/config/appwrite";
import { ID } from "node-appwrite";
import { cookies } from "next/headers";

export async function createUser(previousState,formData) {
    const name = formData.get('name');
    const email= formData.get('email');
    const password= formData.get('password');
    const confirmPassword= formData.get('confirm-password');

    if(!email || !name || !password || !confirmPassword) {
        return{
            error: 'Please fill in all fields',
        }
    };

    if(password.length < 8){
        return{
            error: 'Password must be at least 8 characters long',
        }
    };

    if(password !== confirmPassword){
        return{
            error: 'Password do not match',
        }
    };

    try{
        //Get account instance
        const {account}= await createAdminClient();

        // create a user
        await account.create(ID.unique(), email, password,name);

        // Log the user in (create session)
        const session = await account.createEmailPasswordSession(email, password);

        // Set session cookie
        const cookieStore = cookies();
        cookieStore.set('appwrite-session', session.secret, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'strict',
            expires: new Date(session.expire),
            path: '/',
        });

        return{
            success: true,
        }
    } catch(error) {
        console.log('Registration Error: ', error);
        
        if (error.code === 409) {
            return { error: 'Email already exists' };
        };

        return{
            error: 'Could not Register user',
        };
        
    }


}