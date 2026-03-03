package com.example.To_do.list.controller;

import com.example.To_do.list.entity.Todo;
import com.example.To_do.list.service.TodoService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin(origins = "*") // allows frontend (5500) to talk to backend (8080)
@RequestMapping("/todos")
public class TodoController {

    private final TodoService todoService;

    public TodoController(TodoService todoService) {
        this.todoService = todoService;
    }

    // CREATE TODO
    @PostMapping
    public Todo createTodo(@RequestBody Todo todo) {
        return todoService.createTodo(todo);
    }

    // READ ALL TODOS
    @GetMapping
    public List<Todo> getAllTodos() {
        return todoService.getAllTodos();
    }

    // UPDATE TODO
    @PutMapping("/{id}")
    public Todo updateTodo(
            @PathVariable Long id,
            @RequestBody Todo updatedTodo
    ) {
        return todoService.updateTodo(id, updatedTodo);
    }

    // DELETE TODO
    @DeleteMapping("/{id}")
    public void deleteTodo(@PathVariable Long id) {
        todoService.deleteTodo(id);
    }
}