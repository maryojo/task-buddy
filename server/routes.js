const express = require('express');


const router = express.Router();


router.get('/todos', (req,res) => {
  res.json({
    message: "all todos for now"
  })
});

router.post('/todos', (req,res) => {

});

router.get('/todo/:id', (req,res) => {

});

router.put('/todo/:id', (req,res) => {

});

router.delete('/todo/:id', (req,res) => {

});


module.exports = router;