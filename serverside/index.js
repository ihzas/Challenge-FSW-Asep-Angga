const express = require('express');
const cors = require("cors")
const bodyParser = require('body-parser');
const authRouter = require('./router/authRouter');
const carRouter = require('./router/carRouter');

const app = express();
const port = 4000;

app.use(cors())
app.use(bodyParser.json());

// Routes
app.use('/auth', authRouter);
app.use('/cars', carRouter);

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
