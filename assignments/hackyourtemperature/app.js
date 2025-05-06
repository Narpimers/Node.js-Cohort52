import express from "express";
import fetch from "node-fetch";
import keys from "./sources/keys.js";

const app = express();

app.use(express.json());

app.get('/', (req, res) => {
    res.status(200).send("Hello from backend to frontend!");
});

app.post('/weather', async (req, res) => {
    const cityName = req.body.cityName;     
    const responseText = { weatherText: "" }

    if (!cityName) {
        return res.status(400).json({ error: "Missing name of city" });
    }

    try {
        const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${keys.API_KEY}&units=metric`);
        const data = await response.json();

        if (!response.ok) {
            const {message} = data;
            
            throw new Error(message);
        };

        const {name, main} = data; 
        responseText.weatherText = `City: ${name}, temperature: ${main.temp.toFixed(1)}°C`;
        res.status(200).send(responseText);
        
    } catch (error) {
        responseText.weatherText = `${error}`;
        res.status(400).send(responseText);
    }
    
});

export default app;