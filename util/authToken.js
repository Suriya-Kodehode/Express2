import jwt from 'jsonwebtoken'

const authToken = (req, res, next) => {
    const authHeader = req.headers.authorization;
    "Authorization: Bearer tokencodehere";

    if(!authHeader || !authHeader.startsWith("Bearer")) {
        return res.status(401).json({message: "No token provided"});
    }

    const token = authHeader.slice(7);
    const secret = process.env.JWT_SECRET
    jwt.verify(token, secret, (err, decoded) => {
        if (err) {
            return res.status(401).json({message: "Invalid token"});
        } else {
            req.user = decoded;
            next();
        }
    })
}

export default authToken;