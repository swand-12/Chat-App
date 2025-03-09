import jwt from "jsonwebtoken"

export const generatetoken =(userid,res)=>{
    const token=jwt.sign({userid},process.env.JWT_SECRET,{
        expiresIn:"7d"
    })
    res.cookie("token",token,{
        maxage:7*60*60*24*1000,//ms
        httpOnly:true,
        sameSite:true,
        secure:process.env.NODE_ENV!=="developement"

    });
    return token;
}