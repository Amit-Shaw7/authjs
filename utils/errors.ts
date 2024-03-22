import { AxiosError } from "axios";
import * as z from "zod";

export type CustomResponse = {
    status: number;
    msg: string;
    data?: {};
    error?: {};
};

export const errorResponse = (
    status: number,
    error?: {} | any
): CustomResponse => {
    let msg = "";
    if (error) {
        if (error instanceof AxiosError) {
            error = error?.response?.data || error.message;
            msg = error?.msg;
        } else if (error instanceof z.ZodError) {
            error = "Registration Failed";
        }
    }
    const response = {
        status: status || 500,
        msg: msg || "Internal Server Error",
        error
    };

    return response;
};

export const successResponse = (
    msg: string,
    status: number,
    data?: {}
): CustomResponse => {
    const response = {
        status: status,
        msg: msg,
        data: data,
    };

    return response;
}

