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
                userId: true,
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
    const {title,description,gitUrl,appUrl,content,published,videoPath,imagePath,user} = await req.json()
    try {
        await connect();
        const articles = await prisma.article.create({
            data:{
                userId: user,
                title: title,
                description: description,
                gitUrl: gitUrl,
                appUrl: appUrl,
                contents: content,
                public: published,
                videoPath: videoPath,
                imagePath: imagePath,
            }
        });
        return NextResponse.json(true,{status: 201});
    }catch(err){
        return NextResponse.json(false, {status: 500})

    }finally{
        await prisma.$disconnect()

    }
}

export const PUT = async (req: Request, res: NextResponse) => {
    const {id,title,description,gitUrl,appUrl,contents,published,videoPath,imagePath} = await req.json()
    try {
        await connect();
        const articles = await prisma.article.update({
            where: {
                id : id,
            },
            data:{
                title: title,
                description: description,
                gitUrl: gitUrl,
                appUrl: appUrl,
                contents: contents,
                public: published,
                videoPath: videoPath,
                imagePath: imagePath,
            }
        });
        return NextResponse.json(true,{status: 201});
    }catch(err){
        return NextResponse.json(false, {status: 500})

    }finally{
        await prisma.$disconnect()

    }
}
