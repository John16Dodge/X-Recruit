
export interface SubTask {
  text: string;
  completed: boolean;
}

export interface Task {
  id: string;
  text: string;
  category: string;
  priority: string;
  duration: string;
  dueDate: string;
  phone?: string;
  subtasks?: SubTask[];
  completed: boolean;
}
