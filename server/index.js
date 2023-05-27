require('dotenv').config({path:'./.env'});

const express = require('express');
const cors = require('cors');
const apiRoutes = require('./routes/routes');
const loginRouter = require('./routes/login');
const registerRouter = require('./routes/register');
const { sequelize, connectToDatabase} = require('./database');

const app = express();
app.use(express.json());


const corsOptions = {
  origin: 'http://localhost:3000',
};
app.use(cors(corsOptions));


//Routes
app.use('/api/login', loginRouter);
app.use('/api/register', registerRouter);
app.use('/api', apiRoutes);

const PORT = 3001;

app.listen(PORT, async () =>{
  console.log('listening on port: '+PORT);
  await connectToDatabase();
})