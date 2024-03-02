import {LoginSchema, RegisterSchema} from "@/schemas/index";
import axios from "axios";
import * as z  from "zod";
export const login = async(data:z.infer<typeof LoginSchema>) => {
    console.log(data);
    const url = "/api/auth/login";
    try {
        const response = await axios.post(url , data);
        if(response?.status === 200){
            alert("login success");
        }
    } catch (error) {
        console.error(error);
    }
}

export const signup = async(data:z.infer<typeof RegisterSchema>) => {
    console.log(data);
    const url = "/api/auth/login";
    try {
        const response = await axios.post(url , data);
        if(response?.status === 200){
            alert("login success");
        }
    } catch (error) {
        console.error(error);
    }
}