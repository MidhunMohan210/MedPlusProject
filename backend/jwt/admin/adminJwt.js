import jwt from 'jsonwebtoken'
import dotenv from "dotenv"
dotenv.config()

const generateAdminToken = (userId,res) =>{
    const token = jwt.sign({userId},
        process.env.ADMIN_JWT_SECRET_KEY,{expiresIn:'30d'})

        res.cookie('jwtAdmin',token,{
            httpOnly:true,
            sameSite:'strict',
            maxAge:30*24*60*60*1000
        })

        return token
}

export default generateAdminToken