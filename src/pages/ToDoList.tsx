
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sun, Moon, X, ExternalLink, Check } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import TaskList from '@/components/todo/TaskList';
import { Task } from '@/types/todo';

const ToDoList = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [newTask, setNewTask] = useState('');
  const [category, setCategory] = useState('work');
  const [priority, setPriority] = useState('low');
  const [duration, setDuration] = useState('15min');
  const [dueDate, setDueDate] = useState('');
  const [phone, setPhone] = useState('');
  const [subtasks, setSubtasks] = useState('');
  const [filterCategory, setFilterCategory] = useState('all');
  const [isDarkMode, setIsDarkMode] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    // Load tasks from localStorage
    const savedTasks = localStorage.getItem('tasks');
    if (savedTasks) {
      setTasks(JSON.parse(savedTasks));
    }

    // Load theme preference
    const theme = localStorage.getItem('theme') || 'dark';
    setIsDarkMode(theme === 'dark');
    document.body.classList.toggle('dark-mode', theme === 'dark');
    document.body.classList.toggle('light-mode', theme === 'light');
  }, []);

  const validatePhone = (phone: string) => {
    const regex = /^\d{10}$/;
    return regex.test(phone);
  };

  const handleAddTask = () => {
    if (!newTask.trim()) {
      toast({
        title: "Error",
        description: "Task description is required",
        variant: "destructive",
      });
      return;
    }

    if (phone && !validatePhone(phone)) {
      toast({
        title: "Error",
        description: "Please enter a valid 10-digit mobile number",
        variant: "destructive",
      });
      return;
    }

    const subtasksList = subtasks
      .split(',')
      .map(s => s.trim())
      .filter(Boolean)
      .map(text => ({ text, completed: false }));

    const newTaskObj: Task = {
      id: Date.now().toString(),
      text: newTask,
      category,
      priority,
      duration,
      dueDate,
      phone: phone ? `+91${phone}` : '',
      subtasks: subtasksList,
      completed: false,
    };

    setTasks(prev => {
      const updated = [...prev, newTaskObj];
      localStorage.setItem('tasks', JSON.stringify(updated));
      return updated;
    });

    // Reset form
    setNewTask('');
    setDueDate('');
    setPhone('');
    setSubtasks('');

    toast({
      title: "Success",
      description: "Task added successfully",
    });
  };

  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode);
    document.body.classList.toggle('dark-mode');
    document.body.classList.toggle('light-mode');
    localStorage.setItem('theme', isDarkMode ? 'light' : 'dark');
  };

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="min-h-screen bg-gradient-to-br from-background to-muted py-16 px-4"
    >
      <motion.div 
        className="container max-w-4xl mx-auto bg-card rounded-xl shadow-lg p-8"
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.2 }}
      >
        <motion.h1 
          className="text-4xl font-bold text-center mb-8 bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent"
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.4 }}
        >
          To-Do List
        </motion.h1>

        <div className="space-y-4">
          <Input
            value={newTask}
            onChange={(e) => setNewTask(e.target.value)}
            placeholder="Add a new task"
            onKeyPress={(e) => e.key === 'Enter' && handleAddTask()}
          />
          
          <Textarea
            value={subtasks}
            onChange={(e) => setSubtasks(e.target.value)}
            placeholder="Add subtasks (comma-separated, optional)"
          />

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="select-input"
            >
              <option value="work">Work</option>
              <option value="study">Study</option>
              <option value="personal">Personal</option>
              <option value="other">Other</option>
            </select>

            <select
              value={priority}
              onChange={(e) => setPriority(e.target.value)}
              className="select-input"
            >
              <option value="low">Low Priority</option>
              <option value="medium">Medium Priority</option>
              <option value="high">High Priority</option>
            </select>

            <select
              value={duration}
              onChange={(e) => setDuration(e.target.value)}
              className="select-input"
            >
              <option value="15min">15 min</option>
              <option value="30min">30 min</option>
              <option value="1hr">1 hr</option>
              <option value="2hrs">2 hrs</option>
            </select>

            <Input
              type="datetime-local"
              value={dueDate}
              onChange={(e) => setDueDate(e.target.value)}
            />

            <Input
              type="tel"
              value={phone}
              onChange={(e) => setPhone(e.target.value.replace(/\D/g, '').slice(0, 10))}
              placeholder="10-digit Mobile Number"
            />
          </div>

          <Button onClick={handleAddTask} className="w-full">
            Add Task
          </Button>
        </div>

        <div className="mt-8 flex justify-center">
          <select
            value={filterCategory}
            onChange={(e) => setFilterCategory(e.target.value)}
            className="select-input"
          >
            <option value="all">All Categories</option>
            <option value="work">Work</option>
            <option value="study">Study</option>
            <option value="personal">Personal</option>
            <option value="other">Other</option>
          </select>
        </div>

        <TaskList
          tasks={tasks}
          filterCategory={filterCategory}
          setTasks={setTasks}
        />

        <Button
          onClick={toggleTheme}
          variant="outline"
          className="w-full mt-8"
        >
          {isDarkMode ? <Sun className="mr-2" /> : <Moon className="mr-2" />}
          Switch to {isDarkMode ? 'Light' : 'Dark'} Mode
        </Button>
      </motion.div>
    </motion.div>
  );
};

export default ToDoList;
