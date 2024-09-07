import { PrismaClient } from "@prisma/client"


const prisma  = new PrismaClient()


export const getComments = async(req, res) =>{
    try {
        const comments = await prisma.comments.findMany()

        res.status(200).json({comments})
    } catch (error) {
        console.log("Error fetching comments")
        res.status(500).json({error: "Error fetching comments"})
    }
}