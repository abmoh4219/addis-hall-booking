'use server';

import { createAdminClient } from "@/config/appwrite";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export async function getSingleRooms (id){
    try {
        const {databases}= await createAdminClient();
        
        //FETCH SINGLE ROOMS
        const DATABASE_ID = process.env.NEXT_PUBLIC_APPWRITE_DATABASE;
        const COLLECTION_ID = process.env.NEXT_PUBLIC_APPWRITE_COLLECTION_ROOMS; 

        const room= await databases.getDocument(DATABASE_ID,COLLECTION_ID,id);

        return room;

    } catch (error) {
        console.error('Faild to get rooms',error);
        redirect('/error');
    }
}
