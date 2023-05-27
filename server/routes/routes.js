const express = require("express");
const router = express.Router();
const {User, Task} = require("../models");


const authenticate = (req, res, next) => {
  const token = req.headers.authorization;

  if (!token) {
    return res.status(401).json({ message: 'Unauthorized' });
  }

  try {
    const decoded = jwt.verify(token, 'your-secret-key');
    req.user = decoded;
    next();
  } catch (error) {
    return res.status(401).json({ message: 'Unauthorized' });
  }
};



//CRUD operations
//USERS
//Get all users
router.get("/users", authenticate, async (req, res) => {
  try{
    const users = await User.findAll();
    res.status(200).json(users);

  } catch(err){
    console.error('Error fetching users:', err);
    res.status(500).json({ err: 'Error fetching users' });
  }

});

//Create a new user
router.post("/users", async (req, res) => {
  const { name, email, password } = req.body;

  const newUser = User.build({
    name: name,
    email: email,
    password: password,
  });

  try {
    await newUser.save();
    res.status(201).json(newUser);

  } catch (err) {
    console.error('Error creating user:', err);
    res.status(500).json({ err: 'Error creating user' });
  }
});

// Get a user by id
router.get("/user/:id", async (req, res) => {
  try{
  const user = await User.findOne({
    where:{
      id: req.params.id
    }
  });
  res.status(200).json(user);
} catch (error) {
  console.error('Error fetching user:', error);
  res.status(500).json({ error: 'Error fetching user' });
}
});

// Update user's name
router.patch("/user/:id", async (req, res) => {
  const userId = req.params.id;
  const { name } = req.body;

  const user = await User.findByPk(userId);

if (!user) {
  return res.status(404).json({ error: 'User not found' });
}

  try {
    const [updatedRows] = await User.update(
      { name: name },
      { where: { id: userId } }
    );

    if (updatedRows === 0) {
      return res.status(404).json({ error: 'User not found or not authorized' });
    }

    const updatedUser = await User.findByPk(userId);

    res.status(200).json(updatedUser);
  } catch(err){
    console.error('Error updating user details:', err);
    res.status(500).json({ err: 'Error updating user details' });
  }
});


//TASKS
//Get all task based on user ID
router.get("/tasks", async (req, res) => {
  const { userId } = req.query;
  
  try {
    const tasks = await Task.findAll({
      where: {
        userId: userId,
      },
    });

    res.status(200).json(tasks);
  } catch (err) {
    console.error('Error fetching tasks:', err);
    res.status(500).json({ err: 'Error fetching tasks' });
  }
});

//Create a new task using user ID
router.post("/tasks", async (req, res) => {
  const { userId, title, description } = req.body;

  try {
    // Find the user
    const user = await User.findByPk(userId);

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    // Create a new task associated with the user
    const newTask = await Task.create({
      title: title,
      description: description,
      userId: user.id, 
    });

    res.status(201).json(newTask);

  } catch (error) {
    console.error('Error creating task:', error);
    res.status(500).json({ error: 'Error creating task' });
  }
});

// Get a task by id
router.get("/task/:taskId", async (req, res) => {
  const taskId = req.params.taskId;
  const userId = req.session.userId;

  try {
    const task = await Task.findOne({
      where: {
        id: taskId,
        userId: userId,
      },
    });

    if (!task) {
      return res.status(404).json({ error: 'Task not found' });
    }

    res.status(200).json(task);
  } catch (error) {
    console.error('Error retrieving task:', error);
    res.status(500).json({ error: 'Error retrieving task' });
  }
});

// Update task properties
router.patch("/task/:userId/:taskId", async (req, res) => {
  const taskId = req.params.taskId;
  const userId = req.params.userId; 
 
  const { title, description } = req.body;
  const updatedFields = {};

  if (title) {
    updatedFields.title = title;
  }

  if (description) {
    updatedFields.description = description;
  }

  try {
    const [updatedRows] = await Task.update(updatedFields, {
      where: {
        id: taskId,
        userId: userId,
      },
    });

    if (updatedRows === 0) {
      return res.status(404).json({ error: 'Task not found or not authorized' });
    }

    res.status(200).json(updatedFields);
  } catch (error) {
    console.error('Error updating task:', error);
    res.status(500).json({ error: 'Error updating task' });
  }
});

router.patch("/task/update/:userId/:taskId", async (req, res) => {
  const taskId = req.params.taskId;
  const userId = req.params.userId; 
 
  const { completed } = req.body;
  const updatedFields = {};

  if (completed) {
    updatedFields.completed = completed;
  }

  try {
    const [updatedRows] = await Task.update(updatedFields, {
      where: {
        id: taskId,
        userId: userId,
      },
    });

    if (updatedRows === 0) {
      return res.status(404).json({ error: 'Task not found or not authorized' });
    }

    res.status(200).json(updatedFields);
  } catch (error) {
    console.error('Error updating task:', error);
    res.status(500).json({ error: 'Error updating task' });
  }
});

//Delete a task
router.delete('/task/:userId/:taskId', async (req, res) => {
  const taskId = req.params.taskId;
  const userId = req.params.userId;
  try {
    const deletedRows = await Task.destroy({
      where: {
        id: taskId,
        userId: userId,
      },
    });

    if (deletedRows === 0) {
      return res.status(404).json({ error: 'Task not found or not authorized' });
    }

    res.status(200).json({ message: 'Task deleted successfully' });
  } catch (error) {
    console.error('Error deleting task:', error);
    res.status(500).json({ error: 'Error deleting task' });
  }
});


module.exports = router;
