import express from 'express';

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());


app.get('/', (req, res) => {
    res.status(200).send('Hello from backend to frontend!');
});


app.post('/weather', (req, res) => {
    const cityName = req.body.cityName;

    res.status(200).send(cityName);
});


app.listen(port, () => console.log(`Listening on port ${port}`));