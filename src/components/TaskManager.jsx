import React, { useState } from 'react';
import { Plus, Check, Trash2, Filter } from 'lucide-react';
import { useLocalStorage } from '../../hooks/useLocalStorage';
import { Button } from '../ui/Button';
import { Card, CardHeader, CardContent } from '../ui/Card';

export const TaskManager = () => {
  const [tasks, setTasks] = useLocalStorage('tasks', []);
  const [newTask, setNewTask] = useState('');
  const [filter, setFilter] = useState('all');

  const addTask = () => {
    if (newTask.trim() !== '') {
      const task = {
        id: Date.now().toString(),
        text: newTask.trim(),
        completed: false,
        createdAt: new Date(),
      };
      setTasks([...tasks, task]);
      setNewTask('');
    }
  };

  const toggleTask = (id) => {
    const updatedTasks = tasks.map(task => {
      if (task.id === id) {
        return { ...task, completed: !task.completed };
      }
      return task;
    });
    setTasks(updatedTasks);
  };

  const deleteTask = (id) => {
    const filteredTasks = tasks.filter(task => task.id !== id);
    setTasks(filteredTasks);
  };

  const getFilteredTasks = () => {
    if (filter === 'active') {
      return tasks.filter(task => !task.completed);
    } else if (filter === 'completed') {
      return tasks.filter(task => task.completed);
    } else {
      return tasks;
    }
  };

  const filteredTasks = getFilteredTasks();

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      addTask();
    }
  };

  // Calculate stats
  const totalTasks = tasks.length;
  const activeTasks = tasks.filter(t => !t.completed).length;
  const completedTasks = tasks.filter(t => t.completed).length;
  const progressPercentage = totalTasks > 0 ? Math.round((completedTasks / totalTasks) * 100) : 0;

  return (
    <div className="max-w-2xl mx-auto">
      <Card variant="elevated">
        <CardHeader>
          <h2 className="text-2xl font-bold text-slate-900 dark:text-slate-100 flex items-center">
            <Check className="w-6 h-6 mr-2 text-blue-600" />
            Task Manager
          </h2>
        </CardHeader>
        
        <CardContent>
          <div className="flex gap-2 mb-6">
            <input
              type="text"
              value={newTask}
              onChange={(e) => setNewTask(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Add a new task..."
              className="flex-1 px-4 py-2 border border-slate-300 dark:border-slate-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-slate-700 text-slate-900 dark:text-slate-100 placeholder-slate-500 dark:placeholder-slate-400"
            />
            <Button onClick={addTask} className="px-4">
              <Plus className="w-4 h-4" />
            </Button>
          </div>

          <div className="flex flex-wrap gap-2 mb-6">
            <div className="flex items-center mr-4">
              <Filter className="w-4 h-4 mr-2 text-slate-600 dark:text-slate-400" />
              <span className="text-sm font-medium text-slate-600 dark:text-slate-400">
                Filter:
              </span>
            </div>
            
            <Button
              variant={filter === 'all' ? 'primary' : 'ghost'}
              size="sm"
              onClick={() => setFilter('all')}
              className="relative"
            >
              All
              <span className="ml-1 text-xs bg-slate-200 dark:bg-slate-600 px-1.5 py-0.5 rounded-full">
                {totalTasks}
              </span>
            </Button>
            
            <Button
              variant={filter === 'active' ? 'primary' : 'ghost'}
              size="sm"
              onClick={() => setFilter('active')}
              className="relative"
            >
              Active
              <span className="ml-1 text-xs bg-slate-200 dark:bg-slate-600 px-1.5 py-0.5 rounded-full">
                {activeTasks}
              </span>
            </Button>
            
            <Button
              variant={filter === 'completed' ? 'primary' : 'ghost'}
              size="sm"
              onClick={() => setFilter('completed')}
              className="relative"
            >
              Completed
              <span className="ml-1 text-xs bg-slate-200 dark:bg-slate-600 px-1.5 py-0.5 rounded-full">
                {completedTasks}
              </span>
            </Button>
          </div>

          <div className="space-y-2">
            {filteredTasks.length === 0 ? (
              <div className="text-center py-8 text-slate-500 dark:text-slate-400">
                {filter === 'all' ? 'No tasks yet. Add one above!' : `No ${filter} tasks.`}
              </div>
            ) : (
              filteredTasks.map((task) => {
                let taskClasses = 'flex items-center gap-3 p-3 rounded-lg border transition-all duration-200';
                
                if (task.completed) {
                  taskClasses += ' bg-green-50 dark:bg-green-900/20 border-green-200 dark:border-green-800';
                } else {
                  taskClasses += ' bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700 hover:border-blue-300 dark:hover:border-blue-600';
                }

                return (
                  <div key={task.id} className={taskClasses}>
                    <button
                      onClick={() => toggleTask(task.id)}
                      className={`flex-shrink-0 w-5 h-5 rounded-full border-2 flex items-center justify-center transition-all duration-200 ${
                        task.completed
                          ? 'bg-green-500 border-green-500 text-white'
                          : 'border-slate-300 dark:border-slate-600 hover:border-green-500'
                      }`}
                    >
                      {task.completed && <Check className="w-3 h-3" />}
                    </button>
                    
                    <span
                      className={`flex-1 transition-all duration-200 ${
                        task.completed
                          ? 'text-slate-500 dark:text-slate-400 line-through'
                          : 'text-slate-900 dark:text-slate-100'
                      }`}
                    >
                      {task.text}
                    </span>
                    
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => deleteTask(task.id)}
                      className="text-red-500 hover:text-red-700 hover:bg-red-50 dark:hover:bg-red-900/20 p-1"
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                );
              })
            )}
          </div>

          {totalTasks > 0 && (
            <div className="mt-6 pt-4 border-t border-slate-200 dark:border-slate-700">
              <div className="flex justify-between text-sm text-slate-600 dark:text-slate-400">
                <span>Total: {totalTasks}</span>
                <span>Completed: {completedTasks}</span>
                <span>Progress: {progressPercentage}%</span>
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};