const { DataTypes } = require("sequelize");
var db = require("../database"),
  sequelize = db.sequelize;


//A user model
const User = sequelize.define("user", {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      unique: true,
    },
    password:{
      type: DataTypes.STRING,
      allowNull: false,
    },
});

// A task model
const Task = sequelize.define('task', {
  title: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  description: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  completed: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
    defaultValue: false,
  },
  category: {
    type: DataTypes.STRING,
    allowNull: false,
    defaultValue: 'none',
  },
});

// Define associations between models
User.hasMany(Task);
Task.belongsTo(User);



sequelize.sync();


module.exports = { Task, User };

