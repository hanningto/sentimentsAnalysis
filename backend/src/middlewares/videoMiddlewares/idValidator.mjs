import { google } from "googleapis";
import dotenv from "dotenv";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

dotenv.config();

const youtube = google.youtube({
  version: "v3",
  auth: process.env.YOUTUBE_AUTH,
});

// console.log(process.env.YOUTUBE_AUTH)

export const idValidator = async (req, res, next) => {
  try {
    const { id, topic } = req.body;
    console.log(id);
    console.log(topic);
    const response = await youtube.videos.list({
      part: "snippet, statistics",
      // id: "Ar5A_BqxOaE",
      id: id,
    });

    if (response.data.items && response.data.items.length > 0) {
      const video = response.data.items[0];
      const videoTitle = video.snippet.title;
      const cleanVideoTitle = videoTitle
        .replace(/[.,\/#!$%\^&\*;:{}=\-_`~()'"?<>@]/g, "")
        .toLocaleLowerCase();
      const splitVideosTitle = cleanVideoTitle.split(" ");
console.log(splitVideosTitle)
      if (splitVideosTitle.includes(topic)) {
        console.log("check was good");
      } else {
        console.log("check was not good");
      }

      req.videoData = {
        videoTitle: videoTitle,
        commentCount: video.statistics.commentCount,
      };

      next();
    } else {
      console.log("Video not found.");
      // return false;
      res
        .status(400)
        .json({ error: "Video not found. Please enter a valid video id" });
    }
  } catch (error) {
    console.log(error);
  }
};

export const dbCheck = async (req, res, next) => {
  try {
    const { id, topic } = req.body;
    const { videoTitle, commentCount } = req.videoData;
    console.log(videoTitle);
    console.log(typeof(commentCount));
    console.log(id);
    console.log(topic);
    const video = await prisma.videos.findMany({
      where: {
        youtube_id: id,
      },
    });
    console.log(video)

    if (video.lenght > 0) {
      res.send("video already in database");
    } else {
      const video = await prisma.videos.create({
        data: {
          youtube_id: id,
          comments_count: parseInt(commentCount),
          title: videoTitle,
          topic: topic,
        },
      });
      // console.log(video)
      console.log("data loaded well");
      next();
    }
  } catch (error) {
    res.status(500).json({ error: "error while checking database" });
  }
};
