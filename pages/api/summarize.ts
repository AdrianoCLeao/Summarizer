import type { NextApiRequest, NextApiResponse } from 'next';
import axios from 'axios';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    try {
        const { text } = req.body;
        const flaskApiUrl = 'http://localhost:8080/summarize'; 

        const response = await axios.post(flaskApiUrl, { text });
        res.status(200).json(response.data);
    } catch (error) {
        console.error('Error calling Flask API:', error);
        res.status(500).json({ error: 'Failed to summarize text' });
    }
}
