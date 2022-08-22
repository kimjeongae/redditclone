import { Request, Response, NextFunction } from "express";
import jwt from 'jsonwebtoken'
import User from "../entities/User";

export default async (req: Request, res: Response, next: NextFunction) => {
    try{
        const token = req.cookies.token;
        if(!token) return next();
    
        const { username }:any = jwt.verify(token, process.env.JWT_SECRET);
    
        const user = await User.findOneBy({username});
        console.log('user', user);
    
        if(!user) throw new Error ("Unauthenticated");

        res.locals.user = user;

        return next();
    }catch(error){
        console.error(error);
        return res.status(400).json({error});
    }
}