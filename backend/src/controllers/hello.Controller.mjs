export const helloYoutube =(req, res)=> {
    try {
        res.status(200).json({ message: "Hello Youtube, Everything is ok"})
    } catch (error) {
        res.status(500).json({error: "Something went wrong"})
    }
}