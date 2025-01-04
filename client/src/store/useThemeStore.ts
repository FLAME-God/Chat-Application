import { create } from "zustand";

interface ThemeType{
    theme: string,
    setTheme: (theme: string)=> void
}
const useThemeStore = create<ThemeType>((set)=>({
    theme: localStorage.getItem("bg-theme") || "dark",
    setTheme: (theme)=>{
        localStorage.setItem("bg-theme", theme);
        set({theme})
    }
}))

export default useThemeStore;