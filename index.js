const express = require('express');
const bodyParser = require('body-parser');
const authRoutes = require('./routes/auth');
const carRoutes = require('./routes/car');
const sequelize = require('./config/config.json'); // Update with your Sequelize configuration

const app = express();

app.use(bodyParser.json());

// Routes
app.use('/auth', authRoutes);
app.use('/car', carRoutes);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
