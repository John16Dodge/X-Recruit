
import React, { useState, useEffect } from 'react';
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardFooter, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { CheckCircle, Circle, Trash2, PlusCircle } from "lucide-react";

interface Todo {
  id: string;
  text: string;
  completed: boolean;
}

const TodoList = () => {
  const [todos, setTodos] = useState<Todo[]>(() => {
    // Load todos from localStorage on initial load
    const savedTodos = localStorage.getItem('teacherTodos');
    return savedTodos ? JSON.parse(savedTodos) : [];
  });
  const [newTodo, setNewTodo] = useState("");

  // Save todos to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem('teacherTodos', JSON.stringify(todos));
  }, [todos]);

  const addTodo = () => {
    if (newTodo.trim() === "") return;
    
    const todo: Todo = {
      id: Date.now().toString(),
      text: newTodo,
      completed: false
    };
    
    setTodos([...todos, todo]);
    setNewTodo("");
  };

  const toggleTodo = (id: string) => {
    setTodos(todos.map(todo => {
      if (todo.id === id) {
        return { ...todo, completed: !todo.completed };
      }
      return todo;
    }));
  };

  const deleteTodo = (id: string) => {
    setTodos(todos.filter(todo => todo.id !== id));
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      addTodo();
    }
  };

  return (
    <Card className="w-full max-w-3xl mx-auto">
      <CardHeader>
        <CardTitle className="text-2xl">Teacher Tasks</CardTitle>
        <CardDescription>Keep track of your classes, assignments, and teaching tasks</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex space-x-2 mb-6">
          <Input
            value={newTodo}
            onChange={(e) => setNewTodo(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="Add a new task..."
            className="flex-1"
          />
          <Button onClick={addTodo} className="flex items-center gap-1">
            <PlusCircle className="h-4 w-4" />
            Add
          </Button>
        </div>

        <div className="space-y-2">
          {todos.length === 0 ? (
            <div className="text-center py-4 text-muted-foreground">
              No tasks yet. Add some tasks to get started!
            </div>
          ) : (
            todos.map((todo) => (
              <div
                key={todo.id}
                className="flex items-center justify-between p-3 rounded-md border group hover:bg-accent hover:border-accent transition-colors"
              >
                <div className="flex items-center gap-3">
                  <button
                    onClick={() => toggleTodo(todo.id)}
                    className="text-primary focus:outline-none"
                  >
                    {todo.completed ? (
                      <CheckCircle className="h-5 w-5 text-green-500" />
                    ) : (
                      <Circle className="h-5 w-5" />
                    )}
                  </button>
                  <span className={`${todo.completed ? "line-through text-muted-foreground" : ""}`}>
                    {todo.text}
                  </span>
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => deleteTodo(todo.id)}
                  className="opacity-0 group-hover:opacity-100 transition-opacity"
                >
                  <Trash2 className="h-4 w-4 text-destructive" />
                </Button>
              </div>
            ))
          )}
        </div>
      </CardContent>
      <CardFooter className="text-sm text-muted-foreground">
        {todos.filter(t => t.completed).length} of {todos.length} tasks completed
      </CardFooter>
    </Card>
  );
};

export default TodoList;
