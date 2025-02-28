'use server';
import { createSessionClient } from "@/config/appwrite";
import { redirect } from "next/navigation";

export async function createSession(previousState,formData) {
    try {
        const email= formData.get('email'); // Extract email from the form
        const password= formData.get('password') // Extract password from the form

        if (!email || !password) {
            return{
                error: 'Please fill out all fields'
            }
        }

        //const {account}= await  createSessionClient();
        //await account.createEmailPasswordSession(email,password);
        console.log(email,password);
        

        //console.log('✅ Login successful!');
        //redirect('/bookings');
        

    } catch (error) {
        console.error("❌ Login failed:", error.message);
        return { error: error.message };
    }
}