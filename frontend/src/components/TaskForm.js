import React, { useState, useEffect } from 'react';
import toast from 'react-hot-toast';
import { createTask, updateTask } from '../services/api';

function TaskForm({ editingTask, setEditingTask, onSuccess }) {
  const [form, setForm] = useState({
    title: '',
    description: '',
    status: 'todo',
    priority: 'medium',
  });

  useEffect(() => {
    if (editingTask) {
      setForm({
        title: editingTask.title,
        description: editingTask.description || '',
        status: editingTask.status,
        priority: editingTask.priority,
      });
    } else {
      setForm({ title: '', description: '', status: 'todo', priority: 'medium' });
    }
  }, [editingTask]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.title.trim()) {
      toast.error('Le titre est obligatoire');
      return;
    }
    try {
      if (editingTask) {
        await updateTask(editingTask.id, form);
        toast.success('Tâche modifiée avec succès');
        setEditingTask(null);
      } else {
        await createTask(form);
        toast.success('Tâche créée avec succès');
      }
      setForm({ title: '', description: '', status: 'todo', priority: 'medium' });
      onSuccess();
    } catch (err) {
      toast.error('Une erreur est survenue');
    }
  };

  return (
    <form className="task-form" onSubmit={handleSubmit}>
      <h2>{editingTask ? 'Modifier la tâche' : 'Nouvelle tâche'}</h2>
      <div className="form-group">
        <input
          type="text"
          placeholder="Titre de la tâche *"
          value={form.title}
          onChange={e => setForm({ ...form, title: e.target.value })}
        />
      </div>
      <div className="form-group">
        <textarea
          placeholder="Description (optionnelle)"
          value={form.description}
          onChange={e => setForm({ ...form, description: e.target.value })}
          rows={3}
        />
      </div>
      <div className="form-row">
        <select value={form.status} onChange={e => setForm({ ...form, status: e.target.value })}>
          <option value="todo">À faire</option>
          <option value="in-progress">En cours</option>
          <option value="done">Terminée</option>
        </select>
        <select value={form.priority} onChange={e => setForm({ ...form, priority: e.target.value })}>
          <option value="low">Priorité basse</option>
          <option value="medium">Priorité moyenne</option>
          <option value="high">Priorité haute</option>
        </select>
      </div>
      <div className="form-actions">
        <button type="submit" className="btn-primary">
          {editingTask ? 'Modifier' : 'Ajouter'}
        </button>
        {editingTask && (
          <button type="button" className="btn-secondary" onClick={() => setEditingTask(null)}>
            Annuler
          </button>
        )}
      </div>
    </form>
  );
}

export default TaskForm;
