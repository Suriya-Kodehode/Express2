import db from '../sequelize.js';

export class ReqError extends Error {
    constructor(status, message) {
        super(message)
        this.status = status
    }
}

export const addUser = async({email, firstName, lastName, HPassword}) => {
    try {
        await db.query(
            'INSERT INTO t_Users (Email, firstName, lastName, HPassword) VALUES (:email, :firstName, :lastName, :HPassword)',
            {
                replacements: { email, firstName, lastName, HPassword },
                type: db.QueryTypes.INSERT
            }
        )
    } catch (error) {
        console.error('Error adding user:', error);
    }
}

export const loginUser = async(email) => {
    
    try {
        const [loginUserQuery] = await db.query(
            "SELECT * FROM t_Users WHERE email = :email", 
            { replacements: { email }, type: db.QueryTypes.SELECT }
        );
        return loginUserQuery;
    } catch (error) {
        console.error('Error fetching email:', error)
        throw error
    }
    
}

export const getAllFacts = async () => {

    try {
        const [factsQuery] = await db.query(
            `SELECT * FROM t_Facts ORDER BY FactID`
        );
        return factsQuery;
    } catch (error) {
        console.error('Error fetching facts:', error)
        throw error;
    }
}

export const getFactById = async ({FactID}) => {
    try {
        const [factQuery] = await db.query(
            `SELECT * FROM t_Facts WHERE FactID = :FactID`,
            {
                replacements: { FactID }
            }
        ) 

        if (!factQuery || factQuery.length === 0) {
            return null;
        }
        return factQuery;
    } catch (error) {
        console.error(`Error fetching fact with ID ${FactID}:`, error)
        throw new ReqError(`Error fetching fact: ${error.message}`);
    }
}

export const addFact = async({Facts}) => {

    try {
        await db.query(
            'INSERT INTO t_Facts (Facts) VALUES (:Facts)',
            {
                replacements: { Facts },
                type: db.QueryTypes.INSERT
            }
        ) 
    } catch (error) {
        console.error('Error adding fact:', error);
    }
}