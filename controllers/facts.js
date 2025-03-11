
import { getAllFacts, getFactById, addFact } from '../util/dbQueries.js'

export const fetchAllFacts = async (req, res) => {
    try {
        const facts = await getAllFacts();
        res.status(200).json(facts);
    } catch (error) {
        console.error('Error fetching all facts:', error);
        res.status(500).send('Internal Server Error');
    }
}

export const fetchRandomFacts = async (req, res) => {
    try {
        const facts = await getAllFacts();
        const randomIndex = Math.floor(Math.random() * facts.length);
        const randomFact = facts[randomIndex];
        res.status(200).json(randomFact);
    } catch (error) {
        console.error('Error fetching random fact:', error)
        res.status(500).send('Internal Server Error');
    }
}

export const fetchFactById = async (req, res) => {
    const { id } = req.params;
    
    try {
        const FactID = parseInt(id, 10);
        if (isNaN(FactID)) {
            return res.status(400).json({ error: 'Fact ID must be a valid number' });
        }

        const fact = await getFactById({ FactID });

        if (!fact || fact.length === 0) {
            return res.status(404).json({ error: `No fact found with ID ${FactID}` })
        }
        res.status(200).json(fact[0]);
    } catch (error) {
        console.error(`Error fetching fact by ID ${id}:`, error.message);
        res.status(500).json({ error: error.message || 'Internal Server Error' });
    }
}

export const createFact = async (req, res) => {
    const { Facts } = req.body;

    if (!Facts) {
        return res.status(400).json({ error: 'Please enter a fact' })
    }

    try {
        await addFact({ Facts });
        res.status(201).json({ message: 'Fact added' });
    } catch (error) {
        console.error('Error adding fact:', error.message);
        res.status(500).json({ error: error.message || 'Internal Server Error' });
    }
}


