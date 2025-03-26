import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

const verifyToken= (req,res,next)=>{
    const token = req.cookies.token;

    if(!token){
        return res.status(403).json({message:"Acesso negado, faça login."});
    }

    jwt.verify(token, process.env.JWT_SECRET,(err,decoded)=>{
        if(err){
            return res.status(401).json({message:"Token inválido"});
        }

        req.user = decoded;
        next();

    });
};

export default verifyToken;