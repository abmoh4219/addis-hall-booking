'use server';
import { createAdminClient } from "@/config/appwrite";
import { ID } from "node-appwrite";
import { checkAuth } from "./checkAuth";
import { revalidatePath } from "next/cache";

export async function createRoom(previousState,formData) {
    //Get databases instance
    const {databases,storage}= await createAdminClient();

    //Uploading images
    let imageId;
    const image= formData.get(image);
    if (image && image.size > 0 && image.name !== 'undefined') {
        try {
            const file= await storage.createFile(process.env.NEXT_PUBLIC_APPWRITE_STORAGE_BUCKET_ROOMS,
                ID.unique(),
                image
            );
            imageId= file.$id;
            console.log('image uploaded successfully', imageId);
            
        } catch (error) {
            console.log('Error uploading image', error);
            return{
                error: 'Error uploading image',
            }
            
        }
    }
    else{
        console.log('no image file is provided or file is invalid ');
        
    }

    try {
        const {user} = await checkAuth();
        if (!user) {
            return{
                error: 'you must be logged in to create a room',
            }
        }

        //create a room
        const newRoom= await databases.createDocument(
            process.env.NEXT_PUBLIC_APPWRITE_DATABASE,
            process.env.NEXT_PUBLIC_APPWRITE_COLLECTION_ROOMS,
            ID.unique(),
            {
                user_id: user.id,
                name: formData.get('name'),
                description: formData.get('description'),
                sqft: formData.get('sqft'),
                capacity: formData.get('capacity'),
                price_per_hour: formData.get('price_per_hour'),
                address: formData.get('address'),
                location: formData.get('location'),
                availability: formData.get('availability'),
                amenities: formData.get('amenities'),
                images: imageId,
            }
        );
        console.log('Document created successfully',newRoom);
        revalidatePath('/','layout');
        return{
            success: true,
        }
        
        
    } catch (error) {
        console.log(error);
        const errorMessage= error.response.message || 'An unexpected error occured';
        return{
            error: errorMessage,
        }
        
    }
}