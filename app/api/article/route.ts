import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";

const prisma = new PrismaClient();

export async function main(){
    try {
        await prisma.$connect()
    }catch(err){
        return Error('DB接続失敗');
    }
    
}

export const GET = async (req: Request, res: NextResponse) => {
    try {
        await main();
        const articles = await prisma.article.findMany();
        return NextResponse.json({message: 'Success', articles},{status: 200});
    }catch(err){
        return NextResponse.json({message: 'Error',err}, {status: 500})

    }finally{
        await prisma.$disconnect()

    }
}