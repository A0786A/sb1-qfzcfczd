import React, { useState } from 'react';
import { 
  CheckSquare, 
  Plus, 
  Filter, 
  ChevronDown, 
  Search,
  Calendar,
  Clock,
  User,
  Tag,
  X,
  Check,
  AlertCircle,
  MoreVertical,
  Trash2,
  Edit
} from 'lucide-react';
import { Card } from '../components/ui/Card';
import Button from '../components/ui/Button';

interface Task {
  id: string;
  title: string;
  description: string;
  dueDate: string;
  priority: 'low' | 'medium' | 'high';
  status: 'todo' | 'in-progress' | 'completed';
  assignedTo: string;
  project?: string;
  tags: string[];
}

const Tasks: React.FC = () => {
  const [showNewTaskModal, setShowNewTaskModal] = useState(false);
  const [showEditTaskModal, setShowEditTaskModal] = useState(false);
  const [selectedTask, setSelectedTask] = useState<Task | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [showFilterMenu, setShowFilterMenu] = useState(false);
  const [selectedFilter, setSelectedFilter] = useState('all');

  const tasks: Task[] = [
    {
      id: '1',
      title: 'Implement AI Chatbot Features',
      description: 'Add natural language processing capabilities to the chatbot',
      dueDate: '2024-03-25',
      priority: 'high',
      status: 'in-progress',
      assignedTo: 'John Doe',
      project: 'AI Chatbot',
      tags: ['development', 'ai', 'chatbot']
    },
    {
      id: '2',
      title: 'Client Meeting Preparation',
      description: 'Prepare presentation and documentation for TechNova meeting',
      dueDate: '2024-03-20',
      priority: 'medium',
      status: 'todo',
      assignedTo: 'Sarah Smith',
      project: 'TechNova',
      tags: ['meeting', 'client']
    },
    {
      id: '3',
      title: 'Code Review',
      description: 'Review pull requests for the automation project',
      dueDate: '2024-03-18',
      priority: 'low',
      status: 'completed',
      assignedTo: 'Michael Rodriguez',
      project: 'Automation',
      tags: ['code-review', 'development']
    }
  ];

  const filterOptions = [
    { value: 'all', label: 'All Tasks' },
    { value: 'todo', label: 'To Do' },
    { value: 'in-progress', label: 'In Progress' },
    { value: 'completed', label: 'Completed' }
  ];

  const getPriorityColor = (priority: Task['priority']) => {
    switch (priority) {
      case 'high':
        return 'text-rose-500 bg-rose-50';
      case 'medium':
        return 'text-amber-500 bg-amber-50';
      case 'low':
        return 'text-emerald-500 bg-emerald-50';
    }
  };

  const getStatusColor = (status: Task['status']) => {
    switch (status) {
      case 'todo':
        return 'text-gray-500 bg-gray-50';
      case 'in-progress':
        return 'text-blue-500 bg-blue-50';
      case 'completed':
        return 'text-green-500 bg-green-50';
    }
  };

  const NewTaskModal = () => {
    const [formData, setFormData] = useState<Partial<Task>>({
      title: '',
      description: '',
      dueDate: '',
      priority: 'medium',
      status: 'todo',
      assignedTo: '',
      project: '',
      tags: []
    });

    const handleSubmit = (e: React.FormEvent) => {
      e.preventDefault();
      // Handle task submission
      setShowNewTaskModal(false);
    };

    return (
      <div className="fixed inset-0 z-50 overflow-y-auto">
        <div className="flex min-h-full items-center justify-center p-4">
          <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" onClick={() => setShowNewTaskModal(false)} />
          
          <div className="relative transform overflow-hidden rounded-lg bg-white px-4 pb-4 pt-5 text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg sm:p-6">
            <div className="absolute right-0 top-0 pr-4 pt-4">
              <button
                type="button"
                className="rounded-md bg-white text-gray-400 hover:text-gray-500"
                onClick={() => setShowNewTaskModal(false)}
              >
                <span className="sr-only">Close</span>
                <X className="h-6 w-6" />
              </button>
            </div>
            
            <div className="sm:flex sm:items-start">
              <div className="mt-3 text-center sm:mt-0 sm:text-left w-full">
                <h3 className="text-lg font-semibold leading-6 text-gray-900">
                  New Task
                </h3>
                <form onSubmit={handleSubmit} className="mt-4 space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Task Title</label>
                    <input
                      type="text"
                      className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500 sm:text-sm"
                      value={formData.title}
                      onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700">Description</label>
                    <textarea
                      className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500 sm:text-sm"
                      rows={3}
                      value={formData.description}
                      onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700">Due Date</label>
                      <input
                        type="date"
                        className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500 sm:text-sm"
                        value={formData.dueDate}
                        onChange={(e) => setFormData({ ...formData, dueDate: e.target.value })}
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700">Priority</label>
                      <select
                        className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500 sm:text-sm"
                        value={formData.priority}
                        onChange={(e) => setFormData({ ...formData, priority: e.target.value as Task['priority'] })}
                      >
                        <option value="low">Low</option>
                        <option value="medium">Medium</option>
                        <option value="high">High</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700">Assigned To</label>
                    <input
                      type="text"
                      className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500 sm:text-sm"
                      value={formData.assignedTo}
                      onChange={(e) => setFormData({ ...formData, assignedTo: e.target.value })}
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700">Project</label>
                    <input
                      type="text"
                      className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500 sm:text-sm"
                      value={formData.project}
                      onChange={(e) => setFormData({ ...formData, project: e.target.value })}
                    />
                  </div>

                  <div className="mt-6 flex justify-end space-x-3">
                    <Button
                      type="button"
                      variant="outline"
                      onClick={() => setShowNewTaskModal(false)}
                    >
                      Cancel
                    </Button>
                    <Button
                      type="submit"
                      variant="primary"
                    >
                      Create Task
                    </Button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      <div className="sm:flex sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Tasks</h1>
          <p className="mt-1 text-sm text-gray-500">
            Manage your tasks and assignments
          </p>
        </div>
        <div className="mt-4 sm:mt-0">
          <Button
            variant="primary"
            leftIcon={<Plus className="h-4 w-4" />}
            onClick={() => setShowNewTaskModal(true)}
          >
            New Task
          </Button>
        </div>
      </div>

      <div className="mt-8">
        <Card>
          <div className="p-4">
            <div className="flex items-center space-x-4 mb-4">
              <div className="flex-1">
                <div className="relative rounded-md shadow-sm">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Search className="h-4 w-4 text-gray-400" />
                  </div>
                  <input
                    type="text"
                    className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                    placeholder="Search tasks..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </div>
              </div>
              <div className="relative">
                <button
                  type="button"
                  className="inline-flex items-center px-3 py-2 border border-gray-300 shadow-sm text-sm leading-4 font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                  onClick={() => setShowFilterMenu(!showFilterMenu)}
                >
                  <Filter className="h-4 w-4 mr-2 text-gray-500" />
                  {filterOptions.find(o => o.value === selectedFilter)?.label}
                  <ChevronDown className="h-4 w-4 ml-2 text-gray-500" />
                </button>
                {showFilterMenu && (
                  <div className="origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 z-10">
                    <div className="py-1" role="menu">
                      {filterOptions.map((option) => (
                        <button
                          key={option.value}
                          className={`block px-4 py-2 text-sm w-full text-left ${
                            selectedFilter === option.value
                              ? 'bg-gray-100 text-gray-900'
                              : 'text-gray-700 hover:bg-gray-50'
                          }`}
                          onClick={() => {
                            setSelectedFilter(option.value);
                            setShowFilterMenu(false);
                          }}
                        >
                          {option.label}
                        </button>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>

            <div className="space-y-4">
              {tasks.map((task) => (
                <div
                  key={task.id}
                  className="flex items-center justify-between p-4 bg-white rounded-lg border border-gray-200"
                >
                  <div className="flex items-center space-x-4">
                    <div className="flex-shrink-0">
                      <CheckSquare className="h-5 w-5 text-gray-400" />
                    </div>
                    <div>
                      <h3 className="text-sm font-medium text-gray-900">{task.title}</h3>
                      <p className="text-sm text-gray-500">{task.description}</p>
                      <div className="mt-2 flex items-center space-x-4">
                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getPriorityColor(task.priority)}`}>
                          {task.priority}
                        </span>
                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(task.status)}`}>
                          {task.status}
                        </span>
                        <span className="text-xs text-gray-500">
                          <Calendar className="inline-block h-3 w-3 mr-1" />
                          {new Date(task.dueDate).toLocaleDateString()}
                        </span>
                        <span className="text-xs text-gray-500">
                          <User className="inline-block h-3 w-3 mr-1" />
                          {task.assignedTo}
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <button
                      className="text-gray-400 hover:text-gray-500"
                      onClick={() => {
                        setSelectedTask(task);
                        setShowEditTaskModal(true);
                      }}
                    >
                      <Edit className="h-4 w-4" />
                    </button>
                    <button className="text-gray-400 hover:text-gray-500">
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </Card>
      </div>

      {showNewTaskModal && <NewTaskModal />}
    </div>
  );
};

export default Tasks; 