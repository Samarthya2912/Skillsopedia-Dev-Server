const dotenv = require('dotenv');
dotenv.config();
const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db');
const authRoute = require('./routes/auth');

const PORT = process.env.PORT || 3000;
const app = express();
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(cors());

connectDB(); // connecting to mongodb server

app.get('/', (req, res) => {
    res.send('Hello world');
})

app.use('/api/auth', authRoute);

const server = app.listen(PORT, () => {
    console.log(`Server up and running at ${PORT}`);
})


process.on('unhandledRejection', (err, promise) => { //server errors handling
    console.log(`Logged error: ${err}`);
    server.close(() => process.exit(1))
})



