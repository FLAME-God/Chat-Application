import { create } from "zustand";
import axiosInstance from "../lib/axios";
import toast from "react-hot-toast";

interface AuthStore {
    authUser: { id: string; name: string } | null; // Define the shape of the authUser object
    checkAuth: () => void; // Define the type for an action
    isSignup: boolean;
    isSignIn: boolean;
    isCheckingAuth: boolean;
    signup: (data: Object) => void;
  }
  

const useAuthStore  = create<AuthStore>((set)=>({
    authUser: null,
    isSignup: false,
    isSignIn: false,
    isCheckingAuth: true,

    checkAuth: async()=>{
        try {
            const res = await axiosInstance.get("/auth/checkAuth");
            set({authUser: res.data});
        } catch (error) {
            console.log(`Error while checking auth ${error}`);
            set({authUser: null})
        }finally{
            set({isCheckingAuth: false})
        }
    },
    signup: async(data: Object)=>{
        set({isSignup: true});
        try {
            const res = await axiosInstance.post("/auth/signup", data)
            set({authUser: res.data})
            toast.success("Account created Successfully");
        } catch (error: any) {
            console.log(`Error while sending data to backend: ${error}`);
            set({isSignup: false});
            toast.error(error.response.data.message)
        }finally{
            set({isSignup: false})
        }
    }
}));

export default useAuthStore;