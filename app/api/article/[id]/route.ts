import { connect } from "@/prisma/prisma";
import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";

const prisma = new PrismaClient();

export const GET = async (req: Request, res: NextResponse) => {
    const id = req.url.split("/article/")[1];
   try {
        await connect();
        const article = await prisma.article.findUnique({where: {
            id: id
        }});
        return NextResponse.json({message: 'Success',article},{status: 200});
    }catch(err){
        return NextResponse.json({message: 'Error',err}, {status: 500})

    }finally{
        await prisma.$disconnect()

    }
}