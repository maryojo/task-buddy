require('dotenv').config({path:'./.env'});

const express = require('express');
const apiRoutes = require('./routes/routes');
const loginRouter = require('./routes/login');
const registerRouter = require('./routes/register');
const { sequelize, connectToDatabase} = require('./database');


const app = express();
const PORT = 3001;


app.use(express.json());

//Routes
app.use('/api/login', loginRouter);
app.use('/api/register', registerRouter);
app.use('/api', apiRoutes);


app.listen(PORT, async () =>{
  console.log('listening on port: '+PORT);
  console.log(process.env.PORT);
  await connectToDatabase();
})