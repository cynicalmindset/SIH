import {Router} from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import prisma from "../config/prisma";
import dotenv from "dotenv";


dotenv.config();

const router = Router();

router.post('/register',async(req,res)=>{
    const {name,email,password} = req.body;
    const passhash = await bcrypt.hash(password,10);
    const user = await prisma.user.create({
        data:{
            name,
            email,
            passwordHash: passhash
        },
    });

    res.status(201).json({
        message:"User creatd",
        userID:user.id
    })
})


router.post('/login',async(req,res)=>{
    const {email,password} = req.body;
    const users = await prisma.user.findMany();
    console.log(users);
    const user = users.find((u) => u.email === email);
    if (!user) {
        return res.status(401).json({ message: "Invalid credentials" });
    }
    const vaild = await bcrypt.compare(password,user.passwordHash);
    if(!vaild){
        return res.status(401).json({ message: "Invalid credentials" });
    }
    const token = jwt.sign(
        {
        userId: user.id,
        role: user.role,
        },
        process.env.JWT_SECRET!,
        { expiresIn: "1d" }
    );

    res.json({ token });
})

export default router