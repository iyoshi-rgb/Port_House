import { connect } from "@/prisma/prisma";
import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";

const prisma = new PrismaClient();

export const GET = async (req: Request, res: NextResponse) => {
    const id = req.url.split("/my_page/")[1];
   try {
        await connect();
        const user = await prisma.user.findUnique({where: {
            id: id
        }});
        return NextResponse.json({message: 'Success',user},{status: 200});
    }catch(err){
        return NextResponse.json({message: 'Error',err}, {status: 500})

    }finally{
        await prisma.$disconnect()

    }
}