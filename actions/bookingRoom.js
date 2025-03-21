'use server';
import {  createSessionClient } from "@/config/appwrite.js";
import { cookies } from "next/headers";
import { ID } from "node-appwrite";
import { redirect } from "next/navigation";
import { checkAuth } from "./checkAuth";
import { revalidatePath } from "next/cache";

async function bookRoom(previousState, formData) {
    const sessionCookie= cookies().get('appwrite-session');
    if(!sessionCookie){
        redirect('/login');
    }
    try {
        const {databases}= await createSessionClient(sessionCookie.value);

        const user= await checkAuth();
        if (!user) {
            return{
                error: 'You must be logged in to book a room!',
            }
        }

        //Extract date and time from form data
        const checkInDate= formData.get('check_in_date');
        const checkInTime= formData.get('check_in_time');
        const checkOutDate= formData.get('check_out_date');
        const checkOutTime= formData.get('check_out_time');


        // Combine date and time ISO 8601 format
        const checkInDateTime= `${checkInDate}T${checkInTime}`;
        const checkOutDateTime= `${checkOutDate}T${checkOutTime}`;
        
        const bookingData={
            check_in: checkInDateTime,
            check_out: checkOutDateTime,
            user_id: user.id,
            rooms_id: formData.get('room_id'),
            
        }

        const DATABASE_ID = process.env.NEXT_PUBLIC_APPWRITE_DATABASE;
        const COLLECTION_ID = process.env.NEXT_PUBLIC_APPWRITE_COLLECTION_BOOKINGS;

        // create a new booking
        const newBooking= await databases.createDocument(DATABASE_ID,COLLECTION_ID,
            ID.unique(),
            bookingData
        );

        revalidatePath('/bookings','layout');
        return{
            success: true,
        }


    } catch (error) {
        console.error('Faild to book room',error);
        return{
            error: 'Something went wrong to book a room',
        }
        
    }
}

export default bookRoom;