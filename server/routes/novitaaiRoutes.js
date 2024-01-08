import express from 'express';
import * as dotenv from 'dotenv';

dotenv.config({ path: '.env.local' });

const router = express.Router();

router.route('/').get((req, res) => {
    res.status(200).json({ message: 'Hello from NovitaAI!' });
});

router.route('/').post(async (req, res) => {
    const { prompt } = req.body;
    const  myHeaders = new Headers();
    myHeaders.append("Authorization", "Bearer " + process.env.NOVITA_AI_API);
    myHeaders.append("Content-Type", "application/json");

    const raw = JSON.stringify({
        "prompt": prompt,
        "height": 1024,
        "width": 1024,
        "image_num": 1,
        "steps": 8,
        "guidance_scale": 8
      });
      
    const requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: raw,
        redirect: 'follow'
    };

    try {
        const response = await fetch("https://api.novita.ai/v3/lcm-txt2img", requestOptions);
    
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
    
        const result = await response.json();
    
        res.status(200).json({ photo: result });
    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
})

export default router;