import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { RegisterSchema } from "@/schemas";
import { db } from "@/lib/db";
import { getUserByEmail } from "@/utils/getUser";

export async function POST(req: Request) {
    const body = await req.json();

    const validatedFeilds = RegisterSchema.safeParse(body);
    if (!validatedFeilds.success) {
        return new NextResponse(JSON.stringify(validatedFeilds.error), { status: 400 });
    }
    const { email, password, name } = validatedFeilds.data;

    try {
        const existingUser = await getUserByEmail(email);

        if (existingUser) {
            return NextResponse.json({ msg: "User already exists", }, { status: 400 });
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        await db.user.create({
            data: {
                email,
                name,
                password: hashedPassword
            }
        })

        // TODO: Send verification email

        return NextResponse.json({
            msg: "Register Successfull",
        }, { status: 200 });

    } catch (error) {
        return new NextResponse("Internal server error", { status: 500 });
    }
}
