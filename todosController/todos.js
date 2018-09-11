/* eslint-disable class-methods-use-this */
import db from '../db/db';

class TodosController {
  getAllTodos(req, res) {
    return res.status(200).send({
      success: 'true',
      message: 'todos retrieved successfully',
      todos: db
    });
  }

  getTodo(req, res) {
    const id = parseInt(req.params.id, 10);
    const foundTodo = db.find(todo => todo.id === id);
    if (foundTodo) {
      return res.status(200).send({
        success: 'true',
        message: 'TODO retrieved successfully',
        todo: foundTodo
      });
    } else {
      return res.status(404).send({
        success: 'false',
        message: `TODO with the id ${id} does not exist`
      });
    }
  }

  createTodo(req, res) {
    if (!req.body.title) {
      return res.status(400).send({
        success: 'false',
        message: 'title is required'
      });
    } else if (!req.body.description) {
      return res.status(400).send({
        success: 'false',
        message: 'description is required'
      });
    }
    const todo = {
      id: db.length + 1,
      title: req.body.title,
      description: req.body.description
    };
    db.push(todo);
    return res.status(201).send({
      success: 'true',
      message: 'todo added successfully',
      todo
    });
  }

  updateTodo(req, res) {
    const id = parseInt(req.params.id, 10);
    let todoFound;
    let itemIndex;
    db.forEach((todo, index) => {
      if (todo.id === id) {
        todoFound = todo;
        itemIndex = index;
      }
    });

    if (!todoFound) {
      return res.status(404).send({
        success: 'false',
        message: 'TODO not found'
      });
    }

    if (!req.body.title) {
      return res.status(400).send({
        success: 'false',
        message: 'title is required'
      });
    } else if (!req.body.description) {
      return res.status(400).send({
        success: 'false',
        message: 'description is required'
      });
    }

    const updatedTodo = {
      id: todoFound.id,
      title: req.body.title || todoFound.title,
      description: req.body.description || todoFound.description
    };

    db.splice(itemIndex, 1, updatedTodo);

    return res.status(201).send({
      success: 'true',
      message: 'todo added successfully',
      updatedTodo
    });
  }

  deleteTodo(req, res) {
    const id = parseInt(req.params.id, 10);
    const foundTodo = db.find((todo, index) => {
      if (todo.id === id) {
        db.splice(index, 1);
      }
      return todo.id === id;
    });

    if (foundTodo) {
      return res.status(200).send({
        success: 'true',
        message: 'TODO deleted successfuly'
      });
    } else {
      return res.status(404).send({
        success: 'false',
        message: 'TODO not found'
      });
    }
  }
}

export default new TodosController();
