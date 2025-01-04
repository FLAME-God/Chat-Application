import { create } from "zustand";
import axiosInstance from "../lib/axios";
import toast from "react-hot-toast";

interface MessageStoreTypes {
    messages: Array<Object>,
    users: Array<Object>,
    isSelectedUser: any,
    isMessageLoading: boolean,
    isUserLoading: boolean,
    getUsers: ()=>void,
    getMessages: (userId: number)=>void
}

const useMessageStore = create<MessageStoreTypes>((set)=>({
    messages: [],
    users: [],
    isSelectedUser: null,
    isMessageLoading: false,
    isUserLoading: false,

    getUsers: async()=>{
        try {
            set({isUserLoading: true});
            const res = await axiosInstance("/message/getUsers");
            set({users: res.data});
        } catch (error) {
            console.log(`Error while fetching filterd users ${error}`);
            toast.error("something went wrong");
        }finally{
            set({isUserLoading: false});
        }
    },

    getMessages: async(userId)=>{
        try {
            set({isMessageLoading: true});
            const res = await axiosInstance(`/message/${userId}`);
            set({messages: res.data}); 
        } catch (error) {
            console.log(`Error while fectching messages of the user ${error}`);
            toast.error("something went wrong");
        }finally{
            set({isMessageLoading: false});
        }
    }
}))

export default useMessageStore;