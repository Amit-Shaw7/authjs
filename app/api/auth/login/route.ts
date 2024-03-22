import { NextResponse } from "next/server";
import { LoginSchema } from "@/schemas";
import { signIn } from "@/auth";
import { AuthError } from "next-auth";
import { DEFAULT_LOGIN_REDIRECT } from "@/routes";

export async function POST(req: Request) {
    const body = await req.json();

    const validatedFeilds = LoginSchema.safeParse(body);
    if (!validatedFeilds.success) {
        return new NextResponse(JSON.stringify(validatedFeilds.error), { status: 400 });
    }
    const { email, password } = validatedFeilds.data;

    try {
        const res = await signIn("credentials", {
            email,
            password,
            redirect: false,
            // redirectTo: DEFAULT_LOGIN_REDIRECT,
        })
        if(res){
            return NextResponse.json({
                msg: "Login Successfull",
            })
        }
        // console.log('------------- RTesponse ---------------');
        // console.log(res);
        
        
    } catch (error) {
        // console.log(error?.message);
        
        if (error instanceof AuthError) {
            // console.log("------------------------  Error  -----------------------------------");
            // console.log(error.message);
            // console.log("--------------------------------------------------------------------");
            
            // console.log("------------------------  Error  -----------------------------------");
            // console.log(error.cause);
            // console.log("--------------------------------------------------------------------");
            
            // console.log("------------------------  Error  -----------------------------------");
            // console.log(error?.type);
            // console.log("--------------------------------------------------------------------");
            
            // console.log("------------------------  Error  -----------------------------------");
            // console.log(error?.stack);
            // console.log("--------------------------------------------------------------------");
            // console.log("--------------  Error  ------------------");
            
            
            switch (error?.type) {
                case "CredentialsSignin": {
                    return NextResponse.json({
                        msg: "Invalid email or password",
                    },{status: 401});
                }
                default: {
                    return NextResponse.json({
                        msg: "Internal server error",
                    },{status: 500});
                }
            }
        }
        return NextResponse.json({
            msg: "Internal server error",
        },{status: 500});
        // throw error;
    }
}
