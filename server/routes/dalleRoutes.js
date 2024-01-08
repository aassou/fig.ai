import express from 'express';
import * as dotenv from 'dotenv';
import OpenAIApi from 'openai';
import Configuration from 'openai';

dotenv.config({ path: '.env.local' });

const router = express.Router();

const configuration = new Configuration({
    apiKey: process.env.OPENAI_API_KEY,
});

const openai = new OpenAIApi(configuration);

router.route('/').get((req, res) => {
    res.status(200).json({ message: 'Hello from DALL-EE!' });
});

router.route('/').post(async (req, res) => {
    try {
        const { prompt } = req.body;

        const aiResponse = await openai.images.generate({
            prompt,
            model: "dall-e-3",
            n: 1,
            size: "1024x1024",
        });

        const image = aiResponse.data.data[0].b64_json;
        res.status(200).json({ photo: image });
    } catch (error) {
        console.error(error);
        res.status(500).send(error?.response.data.error.message || 'Something went wrong');
    }
});

export default router;