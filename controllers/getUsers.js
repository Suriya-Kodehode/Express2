
import db from '../sequelize.js';

export const getUsers = async (req, res, next) => {
try {
        console.error("Middleware output - req.user:", req.user);
        if (!req.user || !req.user.userId) {
            const errorDetails = req.user === undefined ? "req.user is undefined" : "req.user.userId is missing";
            return res.status(400).json({message: `User email is missing from token. Details: ${errorDetails}`})
        }
        const userID = req.user.userId;
        const result = await db.query(
            `SELECT UserID, Email, firstName, lastName FROM t_Users WHERE UserID = :user`,
            {
                replacements: { user: userID },
                type: db.QueryTypes.SELECT,
            }
        );

        if (result.length > 0) {
            res.status(200).json(result[0]);
        } else {
            res.status(404).send('User not found');
        }
    } catch (err) {
        return res.status(500).send('Error fetching user info');
    }
}