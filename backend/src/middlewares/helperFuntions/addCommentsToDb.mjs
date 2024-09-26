import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient()

export const addCommentsToDb = async(comment, category, score, video_id)=> {
    try {
        const comnt = await prisma.comments.create({
          data: {
            comment_text: comment,
            sentiment_value: score,
            category: category,
            video_id: video_id,
        }})
        console.log(comnt)
        return comnt

      } catch (error) {
        // res.status(500).json({error: "Error adding comment to database"})
        console.log('error adding comment to database', error)
      }
}
// const comment = "testing Comments Iput to database"
// const category = "positive"
// const score = parseInt(23)
// const video_id = parseInt(1)
// addCommentsToDb(comment, category, score, video_id)