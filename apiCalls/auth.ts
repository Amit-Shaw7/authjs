import { LoginSchema, RegisterSchema } from "@/schemas/index";
import { CustomResponse, errorResponse, successResponse } from "@/utils/errors";
import axios, { AxiosError, AxiosResponse } from "axios";
import * as z from "zod";
export const loginUser = async (data: z.infer<typeof LoginSchema>): Promise<CustomResponse | undefined> => {
    const url = "/api/auth/login";
    try {
        const response = await axios.post(url, data);
        if (response?.status === 200) {
            return successResponse("Logged in Successfully", 200);
        }
    } catch (error) {
        return errorResponse(400, error);
    }
    return undefined;
}

export const registerUser = async (data: z.infer<typeof RegisterSchema>): Promise<CustomResponse | undefined> => {
    const url = "/api/auth/register";
    try {
        const response = await axios.post(url, data);
        if (response?.status === 200) {
            return successResponse("Registered Successfully", 200);
        }
    } catch (error) {
        return errorResponse(400, error);
    }
    return undefined;
}