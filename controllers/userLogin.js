
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import { config } from 'dotenv'
config()

import { loginUser, ReqError } from '../util/dbQueries.js'

export const userLogin = async (req, res, next) => {
    const { email, password } = req.body

    if (!email || !password) {
        return next(new ReqError(400, "Email and password are required"));
    }

    try {
        const user = await loginUser(email);
        if(!user) {
            next(new ReqError(403, "Authentication failed"))
            return
        }

        const correctPassword = await bcrypt.compare(password, user.HPassword);
        if(correctPassword) {
            const payload = { 
                email: user.email, 
                userId: user.UserID 
            }
            const secret = process.env.JWT_SECRET
            const token = jwt.sign(payload, secret, {expiresIn: "1h"})
            res.status(200).json({message: "Authentication successful", token})
        } else {
            next(new ReqError(403, "Authentication failed"));
        }
    } catch (e) {
        next(new ReqError(500, e.message))
    }
}