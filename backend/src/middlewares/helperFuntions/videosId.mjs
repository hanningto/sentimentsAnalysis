import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient()

export const idFinder = async(id) =>{
    const video_id = await prisma.videos.findFirst({
        where: {
            youtube_id: id
        },
        include: {
            video_id
        }
    })
    return video_id
} 