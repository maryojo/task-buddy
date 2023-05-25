const { Sequelize } = require('sequelize');

const sequelize = new Sequelize(process.env.DATABASE_URL, {
  dialectOptions: {
    connectTimeout: 60000
  }
});


//connect to mysql
const connectToDatabase = async () =>{
  try{
    await sequelize.authenticate();
    console.log("Successfully connected to database");
  }
  catch(error){
    console.log("Error connecting to database " + error);
  }
}

module.exports = {
  sequelize,
  connectToDatabase
}