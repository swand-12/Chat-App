import {create} from "zustand"
import { axiosInstance } from "../lib/axios"

export const useAuthStore= create((set)=>({
    authUser:null,
    isSigningIn:false,
    isLoggingIn:false,
    isUpdatingProfile:false,
    ischeckingAuth:true,
    checkAuth : async ()=>{
        try {
            const res =axiosInstance.get("/auth/check");
            set({authUser:res.data})
        } catch (error) {
            console.log("error is checkAuth :",error)
            set({authUser:null});
        }
        finally{
            set({ischeckingAuth:false});
        }
    }
}))