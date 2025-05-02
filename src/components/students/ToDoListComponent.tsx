
import React, { useState, useEffect, useRef, KeyboardEvent, ChangeEvent, FormEvent } from 'react';

// Task and Subtask type definitions
interface Subtask {
  text: string;
  completed: boolean;
}

interface Task {
  text: string;
  category: string;
  priority: 'low' | 'medium' | 'high';
  duration: string;
  dueDate: string;
  subtasks: Subtask[];
  assignedTo: string;
  completed: boolean;
}

export const ToDoListComponent = () => {
  // State variables
  const [tasks, setTasks] = useState<Task[]>([]);
  const [taskInput, setTaskInput] = useState('');
  const [categoryInput, setCategoryInput] = useState('work');
  const [priorityInput, setPriorityInput] = useState<'low' | 'medium' | 'high'>('low');
  const [durationInput, setDurationInput] = useState('15min');
  const [dueDateInput, setDueDateInput] = useState('');
  const [phoneInput, setPhoneInput] = useState('');
  const [subtasksInput, setSubtasksInput] = useState('');
  const [assignToInput, setAssignToInput] = useState('');
  const [phoneError, setPhoneError] = useState('');
  const [filterCategory, setFilterCategory] = useState('all');
  const [theme, setTheme] = useState<'dark' | 'light'>('dark');
  const [filteredTasks, setFilteredTasks] = useState<Task[]>([]);

  // Mobile phone input validation
  const validatePhoneNumber = (phone: string): boolean => {
    return /^\d{10}$/.test(phone);
  };

  // Load tasks from localStorage on initial render
  useEffect(() => {
    const savedTasks = localStorage.getItem('tasks');
    const savedPhone = localStorage.getItem('phoneNumber');
    const savedTheme = localStorage.getItem('theme') || 'dark';
    
    if (savedTasks) {
      setTasks(JSON.parse(savedTasks));
    }
    
    if (savedPhone && savedPhone.startsWith('+91')) {
      setPhoneInput(savedPhone.slice(3));
    }
    
    setTheme(savedTheme as 'dark' | 'light');
  }, []);

  // Update localStorage when tasks or theme changes
  useEffect(() => {
    localStorage.setItem('tasks', JSON.stringify(tasks));
    localStorage.setItem('phoneNumber', phoneInput ? `+91${phoneInput}` : '');
    localStorage.setItem('theme', theme);
  }, [tasks, theme, phoneInput]);

  // Filter tasks when filter category or tasks change
  useEffect(() => {
    if (filterCategory === 'all') {
      setFilteredTasks(tasks);
    } else {
      setFilteredTasks(tasks.filter(task => task.category === filterCategory));
    }
  }, [filterCategory, tasks]);

  // Format date for display
  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr);
    return date.toLocaleString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
      hour: 'numeric',
      minute: '2-digit',
      hour12: true,
    });
  };

  // Calculate completion percentage
  const calculateCompletionPercentage = (task: Task) => {
    if (task.completed) return 100;
    if (!task.subtasks || task.subtasks.length === 0) return 0;
    const completedCount = task.subtasks.filter(subtask => subtask.completed).length;
    return Math.round((completedCount / task.subtasks.length) * 100);
  };

  // Handle phone input change with debounce
  const handlePhoneInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/[^0-9]/g, '').slice(0, 10);
    setPhoneInput(value);
  };

  // Show error for phone input
  const showPhoneError = (message: string) => {
    setPhoneError(message);
    setTimeout(() => setPhoneError(''), 3000);
  };

  // Add a new task
  const addTask = (e: FormEvent) => {
    e.preventDefault();
    
    if (taskInput.trim() === "") {
      return;
    }

    if (phoneInput && !validatePhoneNumber(phoneInput)) {
      showPhoneError('Please enter a valid 10-digit mobile number');
      return;
    }

    const subtasks = subtasksInput.trim()
      .split(',')
      .map(s => s.trim())
      .filter(s => s)
      .map(s => ({ text: s, completed: false }));

    const newTask: Task = {
      text: taskInput,
      category: categoryInput,
      priority: priorityInput,
      duration: durationInput,
      dueDate: dueDateInput,
      subtasks: subtasks,
      assignedTo: assignToInput.trim(),
      completed: false
    };

    setTasks([...tasks, newTask]);
    setTaskInput('');
    setDueDateInput('');
    setSubtasksInput('');
    setAssignToInput('');
  };

  // Toggle task completion
  const toggleTaskCompletion = (index: number) => {
    const updatedTasks = [...tasks];
    updatedTasks[index].completed = !updatedTasks[index].completed;
    setTasks(updatedTasks);
  };

  // Delete a task
  const deleteTask = (index: number) => {
    const updatedTasks = [...tasks];
    updatedTasks.splice(index, 1);
    setTasks(updatedTasks);
  };

  // Toggle subtask completion
  const toggleSubtaskCompletion = (taskIndex: number, subtaskIndex: number) => {
    const updatedTasks = [...tasks];
    updatedTasks[taskIndex].subtasks[subtaskIndex].completed = 
      !updatedTasks[taskIndex].subtasks[subtaskIndex].completed;
    setTasks(updatedTasks);
  };

  // Add a new subtask
  const addSubtask = (taskIndex: number, subtaskText: string) => {
    if (!subtaskText.trim()) return;
    
    const updatedTasks = [...tasks];
    updatedTasks[taskIndex].subtasks.push({
      text: subtaskText,
      completed: false
    });
    setTasks(updatedTasks);
  };

  // Clear all tasks
  const clearAllTasks = () => {
    setTasks([]);
  };

  // Toggle theme
  const toggleTheme = () => {
    setTheme(theme === 'dark' ? 'light' : 'dark');
  };

  return (
    <div className={`task-manager-container ${theme}-mode`}>
      <div className="background"></div>
      <div className="container">
        <h1 id="todo-heading" className="flex items-center justify-center gap-3 mb-6 text-2xl font-bold">
          To-Do List 
          <button 
            onClick={toggleTheme}
            className="theme-toggle-icon"
            aria-label="Toggle theme"
          >
            {theme === 'dark' ? '🌙' : '☀️'}
          </button>
        </h1>

        <form onSubmit={addTask} className="mb-8">
          <div className="input-group space-y-4">
            <input
              type="text"
              value={taskInput}
              onChange={(e) => setTaskInput(e.target.value)}
              placeholder="Add a new task"
              className="w-full p-3 border border-gray-300 rounded-md bg-gray-100 focus:outline-none focus:ring-2 focus:ring-xr-blue"
              aria-label="Add a new task"
            />
            
            <textarea
              value={subtasksInput}
              onChange={(e) => setSubtasksInput(e.target.value)}
              placeholder="Add subtasks (comma-separated, optional)"
              className="w-full p-3 border border-gray-300 rounded-md bg-gray-100 focus:outline-none focus:ring-2 focus:ring-xr-blue"
              aria-label="Add subtasks"
            />
            
            <div className="input-row grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              <select
                value={categoryInput}
                onChange={(e) => setCategoryInput(e.target.value)}
                className="p-3 border border-gray-300 rounded-md bg-gray-100 focus:outline-none focus:ring-2 focus:ring-xr-blue"
                aria-label="Select task category"
              >
                <option value="work">Work</option>
                <option value="study">Study</option>
                <option value="personal">Personal</option>
                <option value="other">Other</option>
              </select>
              
              <select
                value={priorityInput}
                onChange={(e) => setPriorityInput(e.target.value as 'low' | 'medium' | 'high')}
                className="p-3 border border-gray-300 rounded-md bg-gray-100 focus:outline-none focus:ring-2 focus:ring-xr-blue"
                aria-label="Select task priority"
              >
                <option value="low">Low Priority</option>
                <option value="medium">Medium Priority</option>
                <option value="high">High Priority</option>
              </select>
              
              <select
                value={durationInput}
                onChange={(e) => setDurationInput(e.target.value)}
                className="p-3 border border-gray-300 rounded-md bg-gray-100 focus:outline-none focus:ring-2 focus:ring-xr-blue"
                aria-label="Select task duration"
              >
                <option value="15min">15 min</option>
                <option value="30min">30 min</option>
                <option value="1hr">1 hr</option>
                <option value="2hrs">2 hrs</option>
              </select>
              
              <input
                type="datetime-local"
                value={dueDateInput}
                onChange={(e) => setDueDateInput(e.target.value)}
                className="p-3 border border-gray-300 rounded-md bg-gray-100 focus:outline-none focus:ring-2 focus:ring-xr-blue"
                aria-label="Set due date"
              />
              
              <div className="phone-container">
                <input
                  type="tel"
                  value={phoneInput}
                  onChange={handlePhoneInputChange}
                  placeholder="10-digit Mobile Number (e.g., 9876543210)"
                  className={`w-full p-3 border rounded-md bg-gray-100 focus:outline-none focus:ring-2 focus:ring-xr-blue ${phoneError ? 'border-red-500' : 'border-gray-300'}`}
                  aria-label="Enter 10-digit mobile number"
                />
                {phoneError && (
                  <span className="text-red-500 text-sm mt-1">{phoneError}</span>
                )}
              </div>
              
              <input
                type="text"
                value={assignToInput}
                onChange={(e) => setAssignToInput(e.target.value)}
                placeholder="Assign to (e.g., name or email)"
                className="p-3 border border-gray-300 rounded-md bg-gray-100 focus:outline-none focus:ring-2 focus:ring-xr-blue"
                aria-label="Assign task to a team member"
              />
            </div>
            
            <Button type="submit" className="w-full bg-xr-blue hover:bg-xr-blue-dark">
              Add Task
            </Button>
          </div>
        </form>
        
        <div className="filter-group mb-6 flex flex-col md:flex-row items-center justify-between gap-4">
          <select
            value={filterCategory}
            onChange={(e) => setFilterCategory(e.target.value)}
            className="p-3 border border-gray-300 rounded-md bg-gray-100 focus:outline-none focus:ring-2 focus:ring-xr-blue"
            aria-label="Filter tasks by category"
          >
            <option value="all">All Categories</option>
            <option value="work">Work</option>
            <option value="study">Study</option>
            <option value="personal">Personal</option>
            <option value="other">Other</option>
          </select>
          
          <span className="task-counter bg-gray-200 px-3 py-1 rounded-md">
            Tasks: {filteredTasks.length}
          </span>
          
          <Button 
            type="button" 
            onClick={clearAllTasks}
            variant="destructive"
            className="w-full md:w-auto"
          >
            Clear All
          </Button>
        </div>
        
        <ul className="task-list space-y-4 mt-6 min-h-[200px]">
          {filteredTasks.map((task, taskIndex) => {
            const actualIndex = tasks.findIndex(t => t === task);
            return (
              <li 
                key={`${task.text}-${taskIndex}`} 
                className={`
                  rounded-lg p-4 bg-white shadow-md border-l-4 flex flex-col gap-2
                  ${task.completed ? 'bg-green-100 line-through' : ''}
                  ${task.priority === 'low' ? 'border-green-500' : 
                    task.priority === 'medium' ? 'border-yellow-500' : 'border-red-500'}
                `}
              >
                <div className="flex items-start justify-between gap-2">
                  <span 
                    className="text-lg font-medium cursor-pointer"
                    onClick={() => toggleTaskCompletion(actualIndex)}
                  >
                    {task.text}
                  </span>
                  
                  <Button 
                    type="button" 
                    variant="destructive" 
                    size="sm"
                    onClick={() => deleteTask(actualIndex)}
                    className="ml-auto"
                  >
                    ✕
                  </Button>
                </div>
                
                <div className="flex flex-wrap items-center gap-2 mt-2">
                  <span className={`category-tag px-2 py-1 rounded-md text-xs text-white ${
                    task.category === 'work' ? 'bg-blue-500' : 
                    task.category === 'study' ? 'bg-purple-500' : 
                    task.category === 'personal' ? 'bg-yellow-500' : 'bg-gray-500'
                  }`}>
                    {task.category.charAt(0).toUpperCase() + task.category.slice(1)}
                  </span>
                  
                  <span className="duration-tag px-2 py-1 rounded-md text-xs bg-gray-200">
                    {task.duration}
                  </span>
                  
                  {task.dueDate && (
                    <span className={`due-date-tag px-2 py-1 rounded-md text-xs text-white ${
                      new Date(task.dueDate) < new Date() && !task.completed ? 'bg-red-500' : 
                      new Date(task.dueDate).toDateString() === new Date().toDateString() && !task.completed ? 'bg-orange-500' : 
                      'bg-green-500'
                    }`}>
                      Due: {formatDate(task.dueDate)}
                    </span>
                  )}
                  
                  {task.assignedTo && (
                    <span className="assigned-tag px-2 py-1 rounded-md text-xs bg-purple-500 text-white">
                      Assigned: {task.assignedTo}
                    </span>
                  )}
                  
                  <span className={`percentage-tag px-2 py-1 rounded-md text-xs ${
                    calculateCompletionPercentage(task) === 100 ? 'text-green-500' : 'text-gray-500'
                  }`}>
                    {calculateCompletionPercentage(task)}%
                  </span>
                </div>
                
                {task.subtasks && task.subtasks.length > 0 && (
                  <div className="mt-3">
                    <div 
                      className="subtasks-btn px-2 py-1 rounded-md text-xs bg-gray-200 inline-block cursor-pointer"
                      onClick={() => {
                        // For simplicity, we're toggling visibility via React state in a real implementation
                        const updatedTasks = [...tasks];
                        updatedTasks[actualIndex] = {
                          ...updatedTasks[actualIndex],
                          showSubtasks: !updatedTasks[actualIndex].showSubtasks
                        } as Task & { showSubtasks?: boolean };
                        setTasks(updatedTasks);
                      }}
                    >
                      Subtasks ({task.subtasks.length})
                    </div>
                    
                    {(task as Task & { showSubtasks?: boolean }).showSubtasks && (
                      <div className="subtasks-section mt-2 p-3 bg-gray-100 rounded-md">
                        <ul className="subtask-list space-y-2">
                          {task.subtasks.map((subtask, subtaskIndex) => (
                            <li key={subtaskIndex} className={`flex items-center gap-2 ${subtask.completed ? 'line-through text-gray-500' : ''}`}>
                              <input
                                type="checkbox"
                                checked={subtask.completed}
                                onChange={() => toggleSubtaskCompletion(actualIndex, subtaskIndex)}
                                className="form-checkbox rounded text-xr-blue"
                              />
                              <span>{subtask.text}</span>
                            </li>
                          ))}
                        </ul>
                        
                        <div className="mt-3">
                          <input
                            type="text"
                            placeholder="Add new subtask"
                            className="w-full p-2 border border-gray-300 rounded-md bg-white focus:outline-none focus:ring-1 focus:ring-xr-blue"
                            onKeyPress={(e) => {
                              if (e.key === 'Enter') {
                                addSubtask(actualIndex, (e.target as HTMLInputElement).value);
                                (e.target as HTMLInputElement).value = '';
                              }
                            }}
                          />
                        </div>
                      </div>
                    )}
                  </div>
                )}
              </li>
            );
          })}
        </ul>
        
        <Button 
          onClick={toggleTheme} 
          variant="outline" 
          className="w-full mt-8"
        >
          {theme === 'dark' ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
        </Button>
      </div>

      <style jsx>{`
        .background {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          z-index: -1;
          opacity: 0.5;
          background: linear-gradient(45deg, #1e3a8a, #2f855a, #374151, #1e3a8a);
          background-size: 400%;
          animation: gradientWave 15s ease infinite;
        }

        .container {
          width: 100%;
          max-width: 800px;
          margin: 0 auto;
          padding: 2rem;
          background: #fff;
          border-radius: 16px;
          box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
          position: relative;
        }

        .dark-mode .container {
          background: #374151;
          color: #e5e7eb;
          box-shadow: 0 10px 30px rgba(0, 0, 0, 0.3);
        }

        @keyframes gradientWave {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }

        @media (prefers-reduced-motion: reduce) {
          .background {
            animation: none;
          }
        }
      `}</style>
    </div>
  );
};
