'use server';

import { createAdminClient } from "@/config/appwrite";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

async function getAllRooms() {
    try {
        const {databases}= await createAdminClient();
        
        //FETCH ROOMS
        const DATABASE_ID = process.env.NEXT_PUBLIC_APPWRITE_DATABASE;
        const COLLECTION_ID = process.env.NEXT_PUBLIC_APPWRITE_COLLECTION_ROOMS;

        console.log('DATABASE_ID:', DATABASE_ID);  // Debugging
        console.log('COLLECTION_ID:', COLLECTION_ID);  // Debugging


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