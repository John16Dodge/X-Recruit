
import React, { useState, useEffect, useRef, KeyboardEvent, ChangeEvent, FormEvent } from 'react';
import { Button } from '@/components/ui/button';

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
  showSubtasks?: boolean; // Add this optional property
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
    <div className={`task-manager-container ${theme}-mode relative z-10 px-4 md:px-0`}>
      <div className="background"></div>
      <div className="max-w-4xl mx-auto bg-white dark:bg-gray-800 rounded-xl shadow-xl overflow-hidden transform transition-all">
        <div className="p-6 md:p-8">
          <h1 className="flex items-center justify-center gap-3 mb-8 text-3xl font-bold text-center text-gradient">
            Student Task Organizer
            <button 
              onClick={toggleTheme}
              className="theme-toggle-icon ml-2 p-2 rounded-full bg-blue-100 dark:bg-blue-900 text-blue-500 dark:text-blue-300 transition-all hover:rotate-12"
              aria-label="Toggle theme"
            >
              {theme === 'dark' ? '🌙' : '☀️'}
            </button>
          </h1>

          <form onSubmit={addTask} className="mb-8 space-y-5">
            <div className="input-group space-y-4">
              <input
                type="text"
                value={taskInput}
                onChange={(e) => setTaskInput(e.target.value)}
                placeholder="What needs to be done?"
                className="w-full p-4 border border-gray-300 dark:border-gray-600 rounded-lg bg-gray-50 dark:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 text-gray-900 dark:text-white transition-all"
                aria-label="Add a new task"
              />
              
              <textarea
                value={subtasksInput}
                onChange={(e) => setSubtasksInput(e.target.value)}
                placeholder="Break it down: Add subtasks (comma-separated)"
                className="w-full p-4 border border-gray-300 dark:border-gray-600 rounded-lg bg-gray-50 dark:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 text-gray-900 dark:text-white transition-all"
                aria-label="Add subtasks"
              />
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                <select
                  value={categoryInput}
                  onChange={(e) => setCategoryInput(e.target.value)}
                  className="p-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-gray-50 dark:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 text-gray-900 dark:text-white transition-all"
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
                  className="p-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-gray-50 dark:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 text-gray-900 dark:text-white transition-all"
                  aria-label="Select task priority"
                >
                  <option value="low">Low Priority</option>
                  <option value="medium">Medium Priority</option>
                  <option value="high">High Priority</option>
                </select>
                
                <select
                  value={durationInput}
                  onChange={(e) => setDurationInput(e.target.value)}
                  className="p-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-gray-50 dark:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 text-gray-900 dark:text-white transition-all"
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
                  className="p-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-gray-50 dark:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 text-gray-900 dark:text-white transition-all"
                  aria-label="Set due date"
                />
                
                <div className="phone-container">
                  <input
                    type="tel"
                    value={phoneInput}
                    onChange={handlePhoneInputChange}
                    placeholder="10-digit Mobile Number"
                    className={`w-full p-3 border rounded-lg bg-gray-50 dark:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 text-gray-900 dark:text-white transition-all ${phoneError ? 'border-red-500' : 'border-gray-300 dark:border-gray-600'}`}
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
                  placeholder="Assign to (name/email)"
                  className="p-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-gray-50 dark:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 text-gray-900 dark:text-white transition-all"
                  aria-label="Assign task to a team member"
                />
              </div>
              
              <Button 
                type="submit" 
                className="w-full bg-gradient-to-r from-blue-500 to-indigo-500 hover:from-blue-600 hover:to-indigo-600 text-white font-medium py-3 rounded-lg shadow-md hover:shadow-lg transform transition-all hover:-translate-y-1 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400"
              >
                Add Task
              </Button>
            </div>
          </form>
          
          <div className="filter-controls mb-6 flex flex-col md:flex-row items-center justify-between gap-4 bg-gray-50 dark:bg-gray-700 p-4 rounded-lg">
            <select
              value={filterCategory}
              onChange={(e) => setFilterCategory(e.target.value)}
              className="p-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 text-gray-900 dark:text-white transition-all"
              aria-label="Filter tasks by category"
            >
              <option value="all">All Categories</option>
              <option value="work">Work</option>
              <option value="study">Study</option>
              <option value="personal">Personal</option>
              <option value="other">Other</option>
            </select>
            
            <span className="task-counter bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 px-4 py-2 rounded-lg font-medium">
              Tasks: {filteredTasks.length}
            </span>
            
            <Button 
              type="button" 
              onClick={clearAllTasks}
              variant="destructive"
              className="md:w-auto bg-gradient-to-r from-red-500 to-pink-500 hover:from-red-600 hover:to-pink-600"
            >
              Clear All
            </Button>
          </div>
          
          {filteredTasks.length === 0 && (
            <div className="empty-state text-center py-12">
              <div className="text-5xl mb-4">📝</div>
              <h3 className="text-xl font-semibold text-gray-700 dark:text-gray-300 mb-2">No tasks yet</h3>
              <p className="text-gray-500 dark:text-gray-400">Add a new task to get started!</p>
            </div>
          )}
          
          <ul className="task-list space-y-4 mt-6 min-h-[200px]">
            {filteredTasks.map((task, taskIndex) => {
              const actualIndex = tasks.findIndex(t => t === task);
              return (
                <li 
                  key={`${task.text}-${taskIndex}`} 
                  className={`
                    rounded-xl p-5 bg-white dark:bg-gray-700 shadow-md border-l-4 flex flex-col gap-3 transform transition-all hover:-translate-x-1 hover:shadow-lg
                    ${task.completed ? 'bg-green-50 dark:bg-green-900/30 line-through' : ''}
                    ${task.priority === 'low' ? 'border-green-500' : 
                      task.priority === 'medium' ? 'border-yellow-500' : 'border-red-500'}
                  `}
                >
                  <div className="flex items-start justify-between gap-2">
                    <span 
                      className="text-lg font-medium cursor-pointer dark:text-white"
                      onClick={() => toggleTaskCompletion(actualIndex)}
                    >
                      {task.text}
                    </span>
                    
                    <Button 
                      type="button" 
                      variant="destructive" 
                      size="sm"
                      onClick={() => deleteTask(actualIndex)}
                      className="ml-auto rounded-full w-8 h-8 flex items-center justify-center p-0 min-w-0"
                    >
                      ✕
                    </Button>
                  </div>
                  
                  <div className="flex flex-wrap items-center gap-2 mt-2">
                    <span className={`category-tag px-3 py-1 rounded-full text-xs font-semibold text-white ${
                      task.category === 'work' ? 'bg-blue-500' : 
                      task.category === 'study' ? 'bg-purple-500' : 
                      task.category === 'personal' ? 'bg-yellow-500' : 'bg-gray-500'
                    }`}>
                      {task.category.charAt(0).toUpperCase() + task.category.slice(1)}
                    </span>
                    
                    <span className="duration-tag px-3 py-1 rounded-full text-xs font-semibold bg-gray-200 dark:bg-gray-600 text-gray-800 dark:text-gray-200">
                      {task.duration}
                    </span>
                    
                    {task.dueDate && (
                      <span className={`due-date-tag px-3 py-1 rounded-full text-xs font-semibold text-white ${
                        new Date(task.dueDate) < new Date() && !task.completed ? 'bg-red-500' : 
                        new Date(task.dueDate).toDateString() === new Date().toDateString() && !task.completed ? 'bg-orange-500' : 
                        'bg-green-500'
                      }`}>
                        Due: {formatDate(task.dueDate)}
                      </span>
                    )}
                    
                    {task.assignedTo && (
                      <span className="assigned-tag px-3 py-1 rounded-full text-xs font-semibold bg-purple-500 text-white">
                        Assigned: {task.assignedTo}
                      </span>
                    )}
                    
                    <span className={`percentage-tag px-3 py-1 rounded-full text-xs font-semibold ${
                      calculateCompletionPercentage(task) === 100 ? 'text-green-500 bg-green-100 dark:bg-green-900/30' : 'text-gray-500 bg-gray-100 dark:bg-gray-600'
                    }`}>
                      {calculateCompletionPercentage(task)}%
                    </span>
                  </div>
                  
                  {task.subtasks && task.subtasks.length > 0 && (
                    <div className="mt-3">
                      <div 
                        className="subtasks-btn px-3 py-1 rounded-full text-xs bg-indigo-100 dark:bg-indigo-900/30 text-indigo-700 dark:text-indigo-300 font-semibold inline-block cursor-pointer hover:bg-indigo-200 dark:hover:bg-indigo-800/30 transition-colors"
                        onClick={() => {
                          const updatedTasks = [...tasks];
                          updatedTasks[actualIndex] = {
                            ...updatedTasks[actualIndex],
                            showSubtasks: !updatedTasks[actualIndex].showSubtasks
                          };
                          setTasks(updatedTasks);
                        }}
                      >
                        Subtasks ({task.subtasks.length})
                      </div>
                      
                      {task.showSubtasks && (
                        <div className="subtasks-section mt-3 p-4 bg-gray-50 dark:bg-gray-800 rounded-lg border border-gray-100 dark:border-gray-700">
                          <ul className="subtask-list space-y-2">
                            {task.subtasks.map((subtask, subtaskIndex) => (
                              <li key={subtaskIndex} className={`flex items-center gap-3 ${subtask.completed ? 'line-through text-gray-500 dark:text-gray-400' : ''}`}>
                                <input
                                  type="checkbox"
                                  checked={subtask.completed}
                                  onChange={() => toggleSubtaskCompletion(actualIndex, subtaskIndex)}
                                  className="form-checkbox h-4 w-4 text-blue-600 rounded focus:ring-blue-500 focus:ring-2"
                                />
                                <span className="text-gray-800 dark:text-gray-200">{subtask.text}</span>
                              </li>
                            ))}
                          </ul>
                          
                          <div className="mt-3">
                            <input
                              type="text"
                              placeholder="Add new subtask"
                              className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 text-gray-900 dark:text-white"
                              onKeyPress={(e: KeyboardEvent<HTMLInputElement>) => {
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
            className="w-full mt-8 hover:bg-blue-50 dark:hover:bg-blue-900/20"
          >
            {theme === 'dark' ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
          </Button>
        </div>
      </div>

      <style>
        {`
        .background {
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          z-index: -1;
          opacity: 0.6;
          background: linear-gradient(135deg, #1e3a8a, #2f855a, #374151, #1e3a8a);
          background-size: 400% 400%;
          animation: gradientWave 15s ease infinite;
        }

        .dark-mode {
          color: #e5e7eb;
        }

        .light-mode {
          color: #374151;
        }

        .light-mode .background {
          background: linear-gradient(135deg, #60a5fa, #34d399, #818cf8, #60a5fa);
          opacity: 0.3;
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

        .text-gradient {
          background: linear-gradient(to right, #3b82f6, #8b5cf6);
          -webkit-background-clip: text;
          background-clip: text;
          -webkit-text-fill-color: transparent;
        }

        .dark-mode .text-gradient {
          background: linear-gradient(to right, #60a5fa, #a78bfa);
          -webkit-background-clip: text;
          background-clip: text;
          -webkit-text-fill-color: transparent;
        }
        `}
      </style>
    </div>
  );
};
