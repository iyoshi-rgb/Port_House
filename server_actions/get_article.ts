'use server';
import { connect } from "@/prisma/prisma";
import { PrismaClient } from "@prisma/client";
import { Turret_Road } from "next/font/google";
import { NextResponse } from "next/server";

const prisma = new PrismaClient();

export async function getWorks(id : string){
  
    try {
        await connect();
        const articles = await prisma.article.findMany({
            where: {
                userId: id,
                },
            select: {
                id: true,
                title: true,
                createdat: true,
                public: true,
            }
            });    
        return articles;
    }catch(err){
        console.log(err)
        return null

    }finally{
        await prisma.$disconnect()
    }
};


