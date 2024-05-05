'use server';
import { createClient } from "@/utils/supabase/server";
import { nextAuthOptions } from "@/auth";
import { connect } from "@/prisma/prisma";
import { PrismaClient } from "@prisma/client";
import { getServerSession } from "next-auth";
import { v4 as uuidv4 } from "uuid";

const prisma = new PrismaClient();
const supabase = createClient()

async function UploadFile(file : File, filepath : string){
    const { data,error } = await supabase.storage
    .from("porthouse").upload(filepath, file);
  if (error) {
    return error;
  }else{
    console.log(data)
  }
}


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
    console.log(formData)
     let videoPath : string | null = null
     let imagePath : string | null = null
     const video = formData.get('video')
     const image = formData.get('image')

    const title = getStringValue(formData,'title')
    const description = getStringValue(formData,'description')
    const gitUrl = getStringValue(formData,'gitUrl')
    const appUrl = getStringValue(formData,'appUrl')
    const content = getStringValue(formData,'content')
  
     if(video && video instanceof File && video.size > 0){
        console.log(video)
        videoPath = uuidv4()
        await UploadFile(video,videoPath)
        console.log('video finishaed')
    }

    if(image && image instanceof File && image.size > 0){
        console.log(image)
        imagePath = uuidv4()
        await UploadFile(image,imagePath)
        console.log('image finishaed')
    }
    
    try{
        await connect()
        const userId = await getUserId()

        if(userId){
             await prisma.article.create({
                data:{
                    title: title,
                    description: description,
                    gitUrl: gitUrl,
                    appUrl: appUrl,
                    contents: content,
                    public: false,
                    userId: userId,
                    videoPath: videoPath,
                    imagePath: imagePath,
                }
            })
        }
     return 'success'
    
    }catch(err){
        console.log(err)
        return null      
    }finally{
        await prisma.$disconnect()
    }
   
}

export async function publicArticle(formData : FormData){
    console.log(formData)
    let videoPath : string | null = null
    let imagePath : string | null = null
    const title = getStringValue(formData,'title')
    const description = getStringValue(formData,'description')
    const gitUrl = getStringValue(formData,'gitUrl')
    const appUrl = getStringValue(formData,'appUrl')
    const content = getStringValue(formData,'content')
    const video = formData.get('video')
    const image = formData.get('image')

    if(video && video instanceof File && video.size > 0){
        videoPath = uuidv4()
        console.log(videoPath);
        await UploadFile(video,videoPath)
    }

    if(image && image instanceof File && image.size > 0){
        console.log(image)
        console.log(imagePath);
        imagePath = uuidv4()
        await UploadFile(image,imagePath)
    }
    
    try{
        await connect()
        const userId = await getUserId()

        if(userId){
            await prisma.article.create({
                data:{
                    title: title,
                    description: description,
                    gitUrl: gitUrl,
                    appUrl: appUrl,
                    contents: content,
                    public: true,
                    userId: userId,
                    videoPath: videoPath,
                    imagePath: imagePath,
                }
            })
        }
    return 'success'
    }catch(err){
       return null        
    }finally{
        await prisma.$disconnect()
    }  
}


