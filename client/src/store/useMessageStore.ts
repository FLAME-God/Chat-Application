import { create } from "zustand";
import axiosInstance from "../lib/axios";
import toast from "react-hot-toast";
import useAuthStore from "./useAuthStore";

interface Avatar{
    user_id: number,
    avatar_id: number,
    url: string
}

interface User {
    user_id: number;
    username: string;
    avatar: Avatar;
}

interface Message {
    message_id: number,
    sender_id: number,
    reciver_id: number,
    message: string
}

interface MessageStoreTypes {
    messages: Array<Message>,
    users: Array<User>,
    selectedUser: any,
    isMessageLoading: boolean,
    isUserLoading: boolean,
    getUsers: ()=>void,
    getMessages: (userId: number)=>void,
    setSelectedUser: (selectedUser: any)=>void,
    sendMessages: (messageData: string)=> void,
    subscribeToMessage: ()=> void;
    unSubscribeFromMessages: ()=>void;
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
            const res = await axiosInstance.get(`/message/getmessage/${userId}`);
            console.log(res.data);
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
            const res = await axiosInstance.post(`/message/createmsg/${selectedUser.user_id}`, {messageData});
            set({messages: [...messages, res.data]})
        } catch (error: any) {
            toast.error(error.res.data.message)
        }
    },

    subscribeToMessage: ()=>{
        const { selectedUser } = get();
        if(!selectedUser) return;

        const socket = useAuthStore.getState().socket;

        socket?.on("newMessage", (newMessage)=>{
            if(newMessage.sender_id != selectedUser.user_id) return;
            set({messages: [...get().messages, newMessage]});
        })
    },

    unSubscribeFromMessages: ()=>{
        const socket = useAuthStore.getState().socket;
        socket?.off("newMessage")
    },

    setSelectedUser: (selectedUser)=> set({selectedUser})
}))

export default useMessageStore;