'use server';
import { connect } from "@/prisma/prisma";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function getUser(id : string){
  
    try {
        await connect();
        const user = await prisma.user.findMany({
            where: {
                id: id,
                },
            select: {
                id: true,
               image: true,
            }
            });    
        return user[0];
    }catch(err){
        console.log(err)
        return null

    }finally{
        await prisma.$disconnect()
    }
};
