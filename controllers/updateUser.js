import {getUsers} from './getUsers.js'
import { qUpdateUser } from '../util/dbQueries.js';

export const updateUser = async (req, res, next) => {
    const { id } = req.params;
    const { email, firstName, lastName } = req.body;

    try {
        const result = await qUpdateUser(email, firstName, lastName, id)
        if (result) {
          return res.status(200).json({ message: 'User updated' });
        }
        return res.status(404).json({ message: `User ID ${id} not found` });
    } catch (err) {
        return res.status(500).json({ message: 'Error updating user infomation' })
    }
}