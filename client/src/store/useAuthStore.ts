import { create } from "zustand";
import axiosInstance from "../lib/axios";
import toast from "react-hot-toast";
import { io, Socket } from "socket.io-client";
import { BASE_URL } from "../lib/config";

interface Avatar{
    user_id: number,
    avatar_id: number,
    url: string
}

interface User {
    userId: number;
    email: string;
    username: string;
    avatar: Avatar;
}

interface AuthStore {
    authUser: User | null;
    isSignup: boolean;
    isSignIn: boolean;
    isCheckingAuth: boolean;
    isUploadingProfile: boolean;
    socket: Socket | null;
    onlineUsers: Array<string>
    signup: (data: Object) => void;
    signin: (data: Object) => void;
    checkAuth: ()=>void;
    logout: ()=>void;
    updateProfile: (data: Object)=>void;
    connectSocket: ()=>void;
    disConnectSocket: ()=>void;
  }
  
const useAuthStore  = create<AuthStore>((set, get)=>({
    authUser: null,
    isSignup: false,
    isSignIn: false,
    isCheckingAuth: true,
    isUploadingProfile: false,
    socket: null,
    onlineUsers: [],

    checkAuth: async()=>{
        try {
            const res = await axiosInstance.get("/auth/checkAuth");
            set({authUser: res.data});
            get().connectSocket();
        } catch (error) {
            set({authUser: null})
        }finally{
            set({isCheckingAuth: false});
        }
    },

    signup: async(data: Object)=>{
        set({isSignup: true});
        try {
             await axiosInstance.post("/auth/signup", data)
            
            toast.success("Account created Successfully");
        } catch (error: any) {
            console.log(`Error while sending data to backend: ${error}`);
            set({isSignup: false});
            toast.error(error.response.data.message)
        }finally{
            set({isSignup: false})
        }
    },
    signin: async (data) => {
    try {
        set({ isSignIn: true });
        const res = await axiosInstance.post("/auth/signin", data);
        const token = res.data.token;
        localStorage.setItem("token",token);
        toast.success("Logged in successfully");
        get().connectSocket();
    } catch (error: any) {
        console.log(`Error while logging in: ${error}`);
        set({ isSignIn: false });
        toast.error(error.response?.data?.message || "Login failed");
    } finally {
        set({ isSignIn: false });
    }
},
logout: ()=>{
    try {
        localStorage.removeItem("token");
        set({authUser: null});
        toast.success("logout successfuly");
        get().disConnectSocket();
    } catch (error) {
        toast.error("something went wrong");
    }
},
updateProfile: async(data)=>{
    try {
        set({isUploadingProfile: true});
        const res = await axiosInstance.put("/auth/avatar", data);
        set({authUser: res.data});
        toast.success("profile pic uploded");
    } catch (error) {
        console.log(error);
        set({isUploadingProfile: false});
        toast.error("something went error");
    }finally{
        set({isUploadingProfile:false});
        
    }
},

connectSocket: ()=>{
    const { authUser } = get();
    if(!authUser || get().socket?.connected) return;
    const socket = io(BASE_URL,{
        query:{
            userId: authUser.userId.toString()
        }
    });
    socket.connect();
    set({socket: socket});

    socket.on("getOnlineUsers", (userIds)=>{
        set({onlineUsers: userIds})
    })
},
disConnectSocket: ()=>{
    if(get().socket?.connected) get().socket?.disconnect();
}

}));

export default useAuthStore;