'use server';
import { createAdminClient } from "@/config/appwrite.js";
import { cookies } from "next/headers";
import { Query } from "node-appwrite";
import { redirect } from "next/navigation";

async function getAllRooms() {
    const sessionCookie= cookies().get('appwrite-session');
    if(!sessionCookie){
        return{
            error:'No session cookie found'
        };
    }
    try {
        const {databases}= await createAdminClient();
        
        //FETCH ROOMS
        const DATABASE_ID = process.env.NEXT_PUBLIC_APPWRITE_DATABASE;
        const COLLECTION_ID = process.env.NEXT_PUBLIC_APPWRITE_COLLECTION_ROOMS;


        const {documents: rooms}= await databases.listDocuments(DATABASE_ID,COLLECTION_ID);

        // Revalidate the cache for this path
        //revalidatePath('/','layout');
        
        return rooms;


    } catch (error) {
        console.error('Faild to get rooms',error);
        redirect('/error');
        //return [];
    }
}

export default getAllRooms;