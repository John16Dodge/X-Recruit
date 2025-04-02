
import React from 'react';
import { Helmet } from 'react-helmet';
import TodoList from '@/components/students/TodoList';

const TodoListPage = () => {
  return (
    <div className="container mx-auto py-20 px-4">
      <Helmet>
        <title>Student Todo List | X-Recruit</title>
      </Helmet>
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-6 text-center">Student Todo List</h1>
        <p className="text-center text-muted-foreground mb-8">
          Organize your assignments, study sessions, and academic tasks
        </p>
        <TodoList />
      </div>
    </div>
  );
};

export default TodoListPage;
