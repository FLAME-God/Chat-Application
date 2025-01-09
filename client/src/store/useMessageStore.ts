import { create } from "zustand";
import axiosInstance from "../lib/axios";
import toast from "react-hot-toast";

 export interface User {
    user_id: number;
    username: string;
    avatar: Object;
}

interface MessageStoreTypes {
    messages: Array<User>,
    users: any,
    selectedUser: any,
    isMessageLoading: boolean,
    isUserLoading: boolean,
    getUsers: ()=>void,
    getMessages: (userId: number)=>void,
    setSelectedUser: (selectedUser: any)=>void,
    sendMessages: (messageData: string)=> void,
}

const useMessageStore = create<MessageStoreTypes>((set, get)=>({
    messages: [],
    users: [],
    selectedUser: null,
    isMessageLoading: false,
    isUserLoading: false,

    getUsers: async()=>{
        try {
            set({isUserLoading: true});
            const res = await axiosInstance.get("/message/users");
            console.log(res)
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
            const res = await axiosInstance.get(`/message/${userId}`);
            set({messages: res.data}); 
        } catch (error) {
            console.log(`Error while fectching messages of the user ${error}`);
            toast.error("something went wrong");
        }finally{
            set({isMessageLoading: false});
        }
    },
    sendMessages: async(messageData)=>{
        const {selectedUser, messages} = get();
        try {
            const res = await axiosInstance.post(`/message/createmsg/${selectedUser.user_id}`, messageData);
            set({messages: [...messages, res.data]})
        } catch (error: any) {
            toast.error(error.res.data.message)
        }
    },
    setSelectedUser: (selectedUser)=> set({selectedUser})
}))

export default useMessageStore;