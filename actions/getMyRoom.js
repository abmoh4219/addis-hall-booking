'use server';
import {  createSessionClient } from "@/config/appwrite.js";
import { cookies } from "next/headers";
import { Query } from "node-appwrite";
import { redirect } from "next/navigation";

async function getMyRooms() {
    const sessionCookie= cookies().get('appwrite-session');
    if(!sessionCookie){
        redirect('/login');
    }
    try {
        const {account,databases}= await createSessionClient(sessionCookie.value);

        //Get user id
        const user= await account.get();
        const userId= user.$id;

        
        //FETCH user room
        const DATABASE_ID = process.env.NEXT_PUBLIC_APPWRITE_DATABASE;
        const COLLECTION_ID = process.env.NEXT_PUBLIC_APPWRITE_COLLECTION_ROOMS;


        const {documents: rooms}= await databases.listDocuments(DATABASE_ID,COLLECTION_ID,
            [ Query.equal('user_id',userId)]
        );

        
        return rooms;

    } catch (error) {
        console.error('Faild to get user rooms',error);
        redirect('/error');
        //return [];
    }
}

export default getMyRooms;