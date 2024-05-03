'use server';
import { nextAuthOptions } from "@/auth";
import { connect } from "@/prisma/prisma";
import { PrismaClient } from "@prisma/client";
import { getServerSession } from "next-auth";

const prisma = new PrismaClient();

async function getUserId(){
    const session = await getServerSession(nextAuthOptions);
    const user = session?.user;
   return user?.id;
}


function getStringValue(formData : FormData, fieldName : string): string | null{
    const value = formData.get(fieldName);
    return typeof value === 'string' ? value : null;
}

export async function saveArticle(formData : FormData) {
    const title = getStringValue(formData,'title')
    const description = getStringValue(formData,'description')
    const gitUrl = getStringValue(formData,'gitUrl')
    const appUrl = getStringValue(formData,'appUrl')
    const content = getStringValue(formData,'content')
    
    try{
        await connect()
        const userId = await getUserId()

        if(userId){
            const article = await prisma.article.create({
                data:{
                    title: title,
                    description: description,
                    gitUrl: gitUrl,
                    appUrl: appUrl,
                    contents: content,
                    public: false,
                    userId: userId,
                }
            }) 
        }

    }catch(err){
        console.log(err)
        return err
    }finally{
        await prisma.$disconnect()
    }
   
}

export async function publicArticle(formData : FormData){
    const title = getStringValue(formData,'title')
    const description = getStringValue(formData,'description')
    const gitUrl = getStringValue(formData,'gitUrl')
    const appUrl = getStringValue(formData,'appUrl')
    const content = getStringValue(formData,'content')

    try{
        await connect()
        const userId = await getUserId()

        if(userId){
            const article = await prisma.article.create({
                data:{
                    title: title,
                    description: description,
                    gitUrl: gitUrl,
                    appUrl: appUrl,
                    contents: content,
                    public: true,
                    userId: userId,
                }
            }) 
        }

    }catch(err){
        return err
    }finally{
        await prisma.$disconnect()
    }
   
}


