import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const createUser = async (req, res) => {
  try {
    const {
      firstname,
      secondname,
      username,
      email,
      password /* add password in the prisma schema */,
    } = req.body;

    await prisma.users.create({
      data: {
        firstname: firstname,
        secondname: secondname,
        username: username,
        email: email,
        password: password,
      },
    });

    res.status(200).json({ message: "User Created Successfully" });
  } catch (error) {
    res.status(500).json({ error: `Unable to Create User: ${error}` });
  }
};

export const getUser = async (req, res) => {
  try {
    const { id } = req.body;
    const user = await prisma.users.findFirst({
      where: {
        user_id: parseInt(id),
      },
    });
    res.status(200).json({ user: user });
  } catch (error) {
    console.log(`Unable to Fetch User: ${error}`);
    res.status(500).json({ error: "Unable to Fetch User" });
  }
};

export const deleteUser = async(req, res)=>{
    try {
        const {id} = req.body
        
        await prisma.users.delete({
            where: {
                user_id: parseInt(id)
            }
        })
    } catch (error) {
        
    }
}