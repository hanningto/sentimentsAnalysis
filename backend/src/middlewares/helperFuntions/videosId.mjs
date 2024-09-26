import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const idFinder = async (id) => {
    const video = await prisma.videos.findFirst({
        where: {
            youtube_id: id,
        },
        select: {
            video_id: true,
        },
    });
    
    if (video) {
        console.log(video.video_id)
        return video.video_id;
    } else {
        console.log("Video not found");
        return null;
    }
};