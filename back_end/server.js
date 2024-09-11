const express = require('express'); 
const mongoose= require('mongoose');
const cors= require('cors');
const bodyParser=require('body-parser');
const app=express();
const PORT=process.env.PORT||5000;
app.use(cors());
app.use(bodyParser.json());

mongoose.connect('mongodb://localhost:27017/todo-app');
const db=mongoose.connection;
db.on('error',console.error.bind(console,'MongoDB connection error:'));
db.once('open',()=>{
    console.log('Connected to MongoDB');
});

/*const taskSchema=new mongoose.Schema({
task:{type:String,required:true},
completed:{type:Boolean,default:false}

});

const Task=mongoose.model('Task',taskSchema);
module.exports=Task;*/


const Todo = require('./models/Todo');
// Get all todos
app.get('/todos', async (req, res) => {
try {
const todos = await Todo.find();
res.json(todos);
} catch (err) {
res.status(500).json({ message: err.message });
}
});
app.post('/todos', async (req, res) => {
    const todo = new Todo({
    text: req.body.text
    });
    try {
    const newTodo = await todo.save();
    res.status(201).json(newTodo);
    } catch (err) {
    res.status(400).json({ message: err.message });
    }
    });
    // Update a todo
    app.put('/todos/:id', async (req, res) => {
    try {
    const updatedTodo = await Todo.findByIdAndUpdate(
    req.params.id, // The ID of the todo to update
    {
    text: req.body.text, // The fields to update
    completed: req.body.completed,
    },
    { new: true } // Option to return the updated document
    );
    if (!updatedTodo) {
    return res.status(404).json({ message: 'Todo not found' });
    }
    res.json(updatedTodo);
    } catch (err) {
    res.status(400).json({ message: err.message });
    }
    });
    // Delete a todo
    app.delete('/todos/:id', async (req, res) => {
    try {
    const todo = await Todo.findByIdAndDelete(req.params.id);
    if (!todo) {
    return res.status(404).json({ message: 'Todo not found' });
    }
    res.json({ message: 'Todo deleted' });
    } catch (err) {
    res.status(500).json({ message: err.message });
}
});
// Start the server and listen on the specified port
app.listen(PORT, () => {
console.log(`Server is running on http://localhost:${PORT}`);
});