import express from 'express';
import todoController from '../todosController/todos';

const router = express.Router();

// Get all TODOS
router.get('/api/v1/todos', todoController.getAllTodos);

// Get a TODO by ID
router.get('/api/v1/todos/:id', todoController.getTodo);

// Create a TODO in our dummy DB
router.post('/api/v1/todos', todoController.createTodo);

// Update TODO
router.put('/api/v1/todos/:id', todoController.updateTodo);

// Delete a TODO in our dummy DB
router.delete('/api/v1/todos/:id', todoController.deleteTodo);

export default router;
