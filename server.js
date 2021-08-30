const dotenv = require('dotenv');
dotenv.config();
const express = require('express');
const cors = require('cors');

const PORT = process.env.PORT || 3000;
const app = express();
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(cors());

app.get('/', (req, res) => {
    res.send('Hello world');
})

app.listen(PORT, () => {
    console.log(`Server up and running at ${PORT}`);
})



