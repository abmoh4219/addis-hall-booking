import {Client,Databases,Account,Storage} from 'node-appwrite';
import { cookies } from 'next/headers';

//ADMIN CLIENT
const createAdminClient= async () => {
    const client= new Client()
      .setEndpoint(process.env.NEXT_PUBLIC_APPWRITE_ENDPOINT)
      .setProject(process.env.NEXT_PUBLIC_APPWRITE_PROJECT)
      .setKey(process.env.NEXT_APPWRITE_KEY);
    
    return{
      
      get account() {
        return new Account(client);
      },
      
      get databases() {
        return new Databases(client);
      },

      get storage() {
        return new Storage(client);
      }
        
    };  

};

//SESSION CLIENT
const createSessionClient= async () => {
    const client= new Client()
      .setEndpoint(process.env.NEXT_PUBLIC_APPWRITE_ENDPOINT)
      .setProject(process.env.NEXT_PUBLIC_APPWRITE_PROJECT);
    
    const cookieStore = cookies();
    const session = cookieStore.get('appwrite-session')?.value;
     
      
    if (session) {
        client.setSession(session);
    }

    return{
        get account() {
            return new Account(client);
        },

        get databases() {
            return new Databases(client);
        }
    };
};

export {createAdminClient,createSessionClient};