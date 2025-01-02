import { create } from "zustand";
import axiosInstance from "../lib/axios";
import toast from "react-hot-toast";

interface AuthStore {
    authUser: number | null;
    isSignup: boolean;
    isSignIn: boolean;
    isCheckingAuth: boolean;
    signup: (data: Object) => void;
    signin: (data: Object) => void;
    checkAuth: ()=>void;
    logout: ()=>void;
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
            console.log(`Error while checking auth: ${error}`)
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
        const token = res.data.token
        console.log(res)
        localStorage.setItem("token",token);
        toast.success("Logged in successfully");
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
    } catch (error) {
        toast.error("something went wrong");
    }
}

}));

export default useAuthStore;   // Store the token in local storage