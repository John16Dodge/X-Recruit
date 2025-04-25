
import { AnimatePresence, motion } from 'framer-motion';
import { useState } from 'react';
import { Task, SubTask } from '@/types/todo';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { X, Check } from 'lucide-react';

interface TaskListProps {
  tasks: Task[];
  filterCategory: string;
  setTasks: React.Dispatch<React.SetStateAction<Task[]>>;
}

const TaskList = ({ tasks, filterCategory, setTasks }: TaskListProps) => {
  const [expandedTask, setExpandedTask] = useState<string | null>(null);

  const updateTasks = (updatedTasks: Task[]) => {
    setTasks(updatedTasks);
    localStorage.setItem('tasks', JSON.stringify(updatedTasks));
  };

  const toggleTaskCompletion = (taskId: string) => {
    const updatedTasks = tasks.map(task =>
      task.id === taskId ? { ...task, completed: !task.completed } : task
    );
    updateTasks(updatedTasks);
  };

  const deleteTask = (taskId: string) => {
    const updatedTasks = tasks.filter(task => task.id !== taskId);
    updateTasks(updatedTasks);
  };

  const toggleSubtask = (taskId: string, subtaskIndex: number) => {
    const updatedTasks = tasks.map(task => {
      if (task.id === taskId && task.subtasks) {
        const updatedSubtasks = [...task.subtasks];
        updatedSubtasks[subtaskIndex] = {
          ...updatedSubtasks[subtaskIndex],
          completed: !updatedSubtasks[subtaskIndex].completed
        };
        return { ...task, subtasks: updatedSubtasks };
      }
      return task;
    });
    updateTasks(updatedTasks);
  };

  const addSubtask = (taskId: string, subtaskText: string) => {
    const updatedTasks = tasks.map(task => {
      if (task.id === taskId) {
        const newSubtask: SubTask = { text: subtaskText, completed: false };
        return {
          ...task,
          subtasks: [...(task.subtasks || []), newSubtask]
        };
      }
      return task;
    });
    updateTasks(updatedTasks);
  };

  const calculateProgress = (task: Task) => {
    if (!task.subtasks?.length) return 0;
    const completed = task.subtasks.filter(st => st.completed).length;
    return Math.round((completed / task.subtasks.length) * 100);
  };

  const formatDate = (dateStr: string) => {
    if (!dateStr) return '';
    return new Date(dateStr).toLocaleString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
      hour: 'numeric',
      minute: '2-digit',
      hour12: true,
    });
  };

  const filteredTasks = tasks.filter(task =>
    filterCategory === 'all' || task.category === filterCategory
  );

  return (
    <motion.div className="mt-8 space-y-4">
      <AnimatePresence>
        {filteredTasks.map(task => (
          <motion.div
            key={task.id}
            initial={{ x: -20, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: 20, opacity: 0 }}
            className={`relative p-4 rounded-lg border ${
              task.completed ? 'bg-accent/20' : 'bg-card'
            }`}
          >
            <div className="flex items-center justify-between gap-4">
              <div 
                className="flex-1 cursor-pointer"
                onClick={() => toggleTaskCompletion(task.id)}
              >
                <span className={`text-lg ${task.completed ? 'line-through text-muted-foreground' : ''}`}>
                  {task.text}
                </span>
                
                <div className="flex flex-wrap gap-2 mt-2">
                  <span className={`px-2 py-1 rounded text-sm ${
                    task.category === 'work' ? 'bg-blue-100 text-blue-800' :
                    task.category === 'study' ? 'bg-purple-100 text-purple-800' :
                    task.category === 'personal' ? 'bg-green-100 text-green-800' :
                    'bg-gray-100 text-gray-800'
                  }`}>
                    {task.category}
                  </span>
                  
                  <span className={`px-2 py-1 rounded text-sm ${
                    task.priority === 'high' ? 'bg-red-100 text-red-800' :
                    task.priority === 'medium' ? 'bg-yellow-100 text-yellow-800' :
                    'bg-green-100 text-green-800'
                  }`}>
                    {task.priority}
                  </span>
                  
                  {task.duration && (
                    <span className="px-2 py-1 rounded text-sm bg-gray-100 text-gray-800">
                      {task.duration}
                    </span>
                  )}
                  
                  {task.dueDate && (
                    <span className="px-2 py-1 rounded text-sm bg-purple-100 text-purple-800">
                      Due: {formatDate(task.dueDate)}
                    </span>
                  )}

                  {task.subtasks?.length > 0 && (
                    <span className="px-2 py-1 rounded text-sm bg-blue-100 text-blue-800">
                      Progress: {calculateProgress(task)}%
                    </span>
                  )}
                </div>
              </div>

              <div className="flex items-center gap-2">
                {task.subtasks?.length > 0 && (
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setExpandedTask(expandedTask === task.id ? null : task.id)}
                  >
                    Subtasks
                  </Button>
                )}
                
                <Button
                  variant="destructive"
                  size="icon"
                  onClick={() => deleteTask(task.id)}
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>
            </div>

            {expandedTask === task.id && task.subtasks && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: 'auto', opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                className="mt-4 pl-4 border-l-2"
              >
                {task.subtasks.map((subtask, index) => (
                  <div key={index} className="flex items-center gap-2 my-2">
                    <input
                      type="checkbox"
                      checked={subtask.completed}
                      onChange={() => toggleSubtask(task.id, index)}
                      className="h-4 w-4"
                    />
                    <span className={subtask.completed ? 'line-through text-muted-foreground' : ''}>
                      {subtask.text}
                    </span>
                  </div>
                ))}
                
                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    const input = e.currentTarget.elements.namedItem('newSubtask') as HTMLInputElement;
                    if (input.value.trim()) {
                      addSubtask(task.id, input.value.trim());
                      input.value = '';
                    }
                  }}
                  className="mt-2 flex gap-2"
                >
                  <Input
                    name="newSubtask"
                    placeholder="Add new subtask"
                    className="flex-1"
                  />
                  <Button type="submit" size="sm">Add</Button>
                </form>
              </motion.div>
            )}
          </motion.div>
        ))}
      </AnimatePresence>
    </motion.div>
  );
};

export default TaskList;
