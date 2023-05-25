const express = require('express');
const apiRoutes = require('./routes');
const { sequelize, connectToDatabase} = require('./database');


const app = express();
const PORT = 3001;

app.use('/api', apiRoutes);

app.get('/', (req, res) => {
  res.status(200).json({message: "Hello world"})
})


app.listen(PORT, async () =>{
  console.log('listening on port: '+PORT);
  await connectToDatabase();
})