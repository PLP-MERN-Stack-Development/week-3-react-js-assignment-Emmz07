import React from 'react';
import { CheckSquare, Users, FileText, TrendingUp, Clock, Target } from 'lucide-react';
import { Card, CardHeader, CardContent } from '../ui/Card';
import { useLocalStorage } from '../../hooks/useLocalStorage';

export const Dashboard = () => {
  const [tasks] = useLocalStorage('tasks', []);
  
  const completedTasks = tasks.filter(task => task.completed).length;
  const activeTasks = tasks.length - completedTasks;
  let completionRate = 0;
  if (tasks.length > 0) {
    completionRate = Math.round((completedTasks / tasks.length) * 100);
  }

  const stats = [
    {
      title: 'Total Tasks',
      value: tasks.length,
      icon: CheckSquare,
      color: 'text-blue-600',
      bgColor: 'bg-blue-100 dark:bg-blue-900/20',
    },
    {
      title: 'Active Tasks',
      value: activeTasks,
      icon: Clock,
      color: 'text-orange-600',
      bgColor: 'bg-orange-100 dark:bg-orange-900/20',
    },
    {
      title: 'Completed',
      value: completedTasks,
      icon: Target,
      color: 'text-green-600',
      bgColor: 'bg-green-100 dark:bg-green-900/20',
    },
    {
      title: 'Completion Rate',
      value: `${completionRate}%`,
      icon: TrendingUp,
      color: 'text-purple-600',
      bgColor: 'bg-purple-100 dark:bg-purple-900/20',
    },
  ];

  // Get recent tasks (last 5)
  const recentTasks = [...tasks].reverse().slice(0, 5);

  return (
    <div className="max-w-6xl mx-auto space-y-8">
      <div className="text-center mb-8">
        <h1 className="text-4xl font-bold text-slate-900 dark:text-slate-100 mb-4">
          Welcome to TaskFlow Pro
        </h1>
        <p className="text-lg text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
          Your comprehensive dashboard for managing tasks, tracking progress, and staying productive.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat) => {
          const IconComponent = stat.icon;
          return (
            <Card key={stat.title} className="hover:shadow-lg transition-shadow duration-200">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-slate-600 dark:text-slate-400">
                      {stat.title}
                    </p>
                    <p className="text-2xl font-bold text-slate-900 dark:text-slate-100">
                      {stat.value}
                    </p>
                  </div>
                  <div className={`p-3 rounded-full ${stat.bgColor}`}>
                    <IconComponent className={`w-6 h-6 ${stat.color}`} />
                  </div>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <Card>
          <CardHeader>
            <h3 className="text-xl font-semibold text-slate-900 dark:text-slate-100 flex items-center">
              <Clock className="w-5 h-5 mr-2 text-blue-600" />
              Recent Tasks
            </h3>
          </CardHeader>
          <CardContent>
            {recentTasks.length === 0 ? (
              <div className="text-center py-8 text-slate-500 dark:text-slate-400">
                <CheckSquare className="w-12 h-12 mx-auto mb-4 opacity-50" />
                <p>No tasks yet. Create your first task to get started!</p>
              </div>
            ) : (
              <div className="space-y-3">
                {recentTasks.map((task) => {
                  let taskClasses = 'flex items-center gap-3 p-3 rounded-lg border transition-colors duration-200';
                  
                  if (task.completed) {
                    taskClasses += ' bg-green-50 dark:bg-green-900/10 border-green-200 dark:border-green-800';
                  } else {
                    taskClasses += ' bg-slate-50 dark:bg-slate-800 border-slate-200 dark:border-slate-700';
                  }

                  return (
                    <div key={task.id} className={taskClasses}>
                      <div
                        className={`w-2 h-2 rounded-full ${
                          task.completed ? 'bg-green-500' : 'bg-orange-500'
                        }`}
                      />
                      <span
                        className={`flex-1 text-sm ${
                          task.completed
                            ? 'text-slate-500 dark:text-slate-400 line-through'
                            : 'text-slate-700 dark:text-slate-300'
                        }`}
                      >
                        {task.text}
                      </span>
                    </div>
                  );
                })}
              </div>
            )}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <h3 className="text-xl font-semibold text-slate-900 dark:text-slate-100 flex items-center">
              <Target className="w-5 h-5 mr-2 text-green-600" />
              Quick Actions
            </h3>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <a
                href="#tasks"
                className="flex items-center gap-3 p-3 rounded-lg border border-slate-200 dark:border-slate-700 hover:border-blue-300 dark:hover:border-blue-600 hover:bg-blue-50 dark:hover:bg-blue-900/10 transition-all duration-200"
              >
                <CheckSquare className="w-5 h-5 text-blue-600" />
                <div>
                  <p className="font-medium text-slate-900 dark:text-slate-100">
                    Manage Tasks
                  </p>
                  <p className="text-sm text-slate-600 dark:text-slate-400">
                    Add, edit, and organize your tasks
                  </p>
                </div>
              </a>
              
              <a
                href="#posts"
                className="flex items-center gap-3 p-3 rounded-lg border border-slate-200 dark:border-slate-700 hover:border-purple-300 dark:hover:border-purple-600 hover:bg-purple-50 dark:hover:bg-purple-900/10 transition-all duration-200"
              >
                <FileText className="w-5 h-5 text-purple-600" />
                <div>
                  <p className="font-medium text-slate-900 dark:text-slate-100">
                    Browse Posts
                  </p>
                  <p className="text-sm text-slate-600 dark:text-slate-400">
                    Explore community posts and content
                  </p>
                </div>
              </a>
              
              <a
                href="#about"
                className="flex items-center gap-3 p-3 rounded-lg border border-slate-200 dark:border-slate-700 hover:border-green-300 dark:hover:border-green-600 hover:bg-green-50 dark:hover:bg-green-900/10 transition-all duration-200"
              >
                <Users className="w-5 h-5 text-green-600" />
                <div>
                  <p className="font-medium text-slate-900 dark:text-slate-100">
                    Learn More
                  </p>
                  <p className="text-sm text-slate-600 dark:text-slate-400">
                    Discover features and capabilities
                  </p>
                </div>
              </a>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};