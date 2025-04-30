import express from 'express';

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());


app.get('/', (req, res) => {

    res.sendStatus = 200;
    res.send('Hello from backend to frontend!');
    res.end;
});


app.post('/weather', (req, res) => {
    const cityName = req.body.cityName;

    res.sendStatus = 200;
    res.send(cityName);
    res.end;
});


app.listen(port, () => console.log(`Listening on port ${port}`));