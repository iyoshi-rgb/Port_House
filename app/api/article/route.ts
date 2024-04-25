import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";

const prisma = new PrismaClient();

export const connect = async () => {
    try {
        //prismaでデータベースに接続
        prisma.$connect();
    } catch (error) {
        return Error("DB接続失敗しました")
    }
}

export const GET = async (req: Request, res: NextResponse) => {
    try {
        await connect();
        const articles = await prisma.article.findMany();
        return NextResponse.json({message: 'Success', articles},{status: 200});
    }catch(err){
        return NextResponse.json({message: 'Error',err}, {status: 500})

    }finally{
        await prisma.$disconnect()

    }
}