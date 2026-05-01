import React, { useState, useEffect } from 'react';
import { Toaster } from 'react-hot-toast';
import TaskList from './components/TaskList';
import TaskForm from './components/TaskForm';
import { getTasks } from './services/api';
import './App.css';

function App() {
  const [tasks, setTasks] = useState([]);
  const [editingTask, setEditingTask] = useState(null);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('all');

  const fetchTasks = async () => {
    try {
      const res = await getTasks();
      setTasks(res.data.data);
    } catch (err) {
      setTasks([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchTasks(); }, []);

  const filteredTasks = tasks.filter(t => {
    if (filter === 'all') return true;
    return t.status === filter;
  });

  return (
    <div className="app">
      <Toaster position="top-right" />
      <header className="app-header">
        <h1>Task Manager</h1>
        <p>Gérez vos tâches simplement</p>
      </header>
      <main className="app-main">
        <TaskForm
          editingTask={editingTask}
          setEditingTask={setEditingTask}
          onSuccess={fetchTasks}
        />
        <div className="filters">
          {['all', 'todo', 'in-progress', 'done'].map(f => (
            <button
              key={f}
              className={`filter-btn ${filter === f ? 'active' : ''}`}
              onClick={() => setFilter(f)}
            >
              {f === 'all' ? 'Toutes' : f === 'todo' ? 'À faire' : f === 'in-progress' ? 'En cours' : 'Terminées'}
            </button>
          ))}
        </div>
        {loading ? (
          <div className="loading">Chargement...</div>
        ) : (
          <TaskList
            tasks={filteredTasks}
            onEdit={setEditingTask}
            onRefresh={fetchTasks}
          />
        )}
      </main>
    </div>
  );
}

export default App;
