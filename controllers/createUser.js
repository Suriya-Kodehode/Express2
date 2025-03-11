import bcrypt from 'bcrypt'

import { addUser } from '../util/dbQueries.js';

export const createUser = async(req, res ,next) => {
    const {email, firstName, lastName, password} = req.body;
    const saltRounds = 10;
    const salt = bcrypt.genSaltSync(saltRounds)
    const hashedPassword = await bcrypt.hash(password, salt)
    if(!email || !password) {
        return res.status(400).json({message:'Email or password are required'});
    }

    try {
        await addUser({ email, firstName: firstName || '', lastName: lastName || '', HPassword: hashedPassword })
        res.status(201).json({message: 'User successfully created'})
    } catch (e) {
        console.error(e)
        res.status(500).json({ message: 'Error creating user.' });
    }
}
