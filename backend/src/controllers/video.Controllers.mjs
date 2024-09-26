import { PrismaClient } from "@prisma/client";
import {google} from "googleapis"
import Sentiment from "sentiment";
import { idFinder } from "../middlewares/helperFuntions/videosId.mjs";
import { addCommentsToDb } from "../middlewares/helperFuntions/addCommentsToDb.mjs";

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
    const { id } = req.body;

    const response = await youtube.commentThreads.list({
      part: "snippet",
      videoId: id,
      maxResults: 100,
    });

    const comments = response.data.items.map((item) => {
      return item.snippet.topLevelComment.snippet.textDisplay;
    });

    const video_id = await idFinder(id);
    console.log(`from idFinder ${video_id}`)

    // Process comments sequentially to avoid overwhelming the call stack
    for (const comment of comments) {
      const analysis = sentiment.analyze(comment);
      let category = "";

      if (analysis.score > 0) {
        category = "positive";
      } else if (analysis.score === 0) {
        category = "neutral";
      } else {
        category = "negative";
      }

      const score = analysis.score;

      // Adding each comment to the database
      await addCommentsToDb(comment, category, score, video_id);
    }

    res.send(comments);
  } catch (error) {
    console.error("Error fetching YouTube comments:", error);
    res.status(500).send("An error occurred while fetching YouTube comments.");
  }
};

export const deleteVideo = async (req, res) => {
  try {
    const {id} = req.body

    const video = await prisma.videos.delete({
      where: {
        video_id: parseInt(id)
      }
    })
    res.status(200).json({message: "Video Deleted Successfully"})
  } catch (error) {
    console.log("Unable to delete video")
    res.status.json({error: `Error Deleting video: ${video}`})
  }
}