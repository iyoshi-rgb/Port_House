import { connect } from "@/prisma/prisma";
import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";

const prisma = new PrismaClient();

export const GET = async (req: Request, res: NextResponse) => {
    try {
        await connect();
        const articles = await prisma.article.findMany({
            where: {
                public : true,
            },
            select: {
                title : true,
                description : true,
                imagePath : true,
                createdat: true,
                id : true,
            }
        });
        return NextResponse.json({message: 'Success', articles},{status: 200});
    }catch(err){
        return NextResponse.json({message: 'Error',err}, {status: 500})

    }finally{
        await prisma.$disconnect()

    }
}

export const POST = async (req: Request, res: NextResponse) => {
    const {title,description,gitUrl,appUrl,content,published,videoPath,imagePath,userId} = await req.json()
    try {
        await connect();
        const articles = await prisma.article.create({
            data:{
                title: title,
                description: description,
                gitUrl: gitUrl,
                appUrl: appUrl,
                contents: content,
                public: published,
                userId: userId,
                videoPath: videoPath,
                imagePath: imagePath,
            }
        });
        return NextResponse.json({message: 'Success', articles},{status: 201});
    }catch(err){
        return NextResponse.json({message: 'Error',err}, {status: 500})

    }finally{
        await prisma.$disconnect()

    }
}
