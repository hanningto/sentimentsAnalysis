import { PrismaClient } from "@prisma/client";
import {google} from "googleapis"
import Sentiment from "sentiment";
import { idFinder } from "../middlewares/helperFuntions/videosId.mjs";

const prisma = new PrismaClient();
const sentiment = new Sentiment();

const youtube = google.youtube({
    version: 'v3',
    auth: process.env.YOUTUBE_AUTH
})



export const analysisInfo = async (req, res) => {
  const { id } = req.body;
  try {
    const info = await prisma.videos.findMany({
      // where: {
      //   youtube_id: id,
      // },
    });
    res.status(200).json({ data: info });
  } catch (error) {}
};

export const analysis = async (req, res) => {
  try {
    const {id} = req.body

    const response = await youtube.commentThreads.list({
      part: "snippet",
      videoId: id,
      maxResults: 100,
    });

    const comments = response.data.items.map((item) => {
      return item.snippet.topLevelComment.snippet.textDisplay // The text of the comment
    });

    const sentimentAnalysis = comments.map((comment) =>{
        const analysis = sentiment.analyze(comment)
        var category = ''
        if (analysis.score > 0){
          category = "positive"
        }
        else if( analysis.score === 0 ){
          category = "neutral"
        }
        else{
          category = "negative"
        }

        try {
          const comnt = prisma.comments.create({
            data: {
              comment_text: comment,
              sentiment_value: analysis.score,
              category: category,
              video_id: idFinder(id)
            }
          })
          return comnt

        } catch (error) {
          res.status(500).json({error: "Error adding comment to database"})
        }
    })
    console.log(sentimentAnalysis)
    res.send(comments)

    
  } catch (error) {
    console.error("Error fetching YouTube comments:", error);
  }
};
