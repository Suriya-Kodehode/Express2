import {getUsers as users} from './getUsers.js'

export const updateUser = (req, res, next) => {
    const { id } = req.params;
    const { name } = req.body;
    
    if (!name) {
        return res.status(400).json({message:'Name is requied'});
    }

    const user = users.find(user => user.id === parseInt(id));
    if (user) {
        user.name = name;
        return res.status(200).json(user);
    }
    return res.status(404).json({message:'User not found'});
}