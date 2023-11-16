const express = require('express');
const bodyParser = require('body-parser');
const dotenv = require('dotenv');

dotenv.config();
const mobilRoutes = require('./src/routes/mobilRoutes');

const app = express();
const port = process.env.PORT || 3000;

app.use(bodyParser.json());



app.use('/mobil', mobilRoutes);

db.connect((err) => {
    if (err) {
        console.error('Error connecting to database:', err);
    } else {
        console.log('Connected to database');
    }
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
