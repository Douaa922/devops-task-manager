import React from 'react';
import toast from 'react-hot-toast';
import { deleteTask } from '../services/api';

const priorityColors = {
  high: '#ef4444',
  medium: '#f59e0b',
  low: '#10b981',
};

const statusLabels = {
  'todo': 'À faire',
  'in-progress': 'En cours',
  'done': 'Terminée',
};

function TaskCard({ task, onEdit, onRefresh }) {
  const handleDelete = async () => {
    if (!window.confirm('Supprimer cette tâche ?')) return;
    try {
      await deleteTask(task.id);
      toast.success('Tâche supprimée');
      onRefresh();
    } catch {
      toast.error('Erreur lors de la suppression');
    }
  };

  return (
    <div className={`task-card ${task.status}`}>
      <div className="task-card-header">
        <h3>{task.title}</h3>
        <span
          className="priority-badge"
          style={{ backgroundColor: priorityColors[task.priority] }}
        >
          {task.priority}
        </span>
      </div>
      {task.description && (
        <p className="task-description">{task.description}</p>
      )}
      <div className="task-card-footer">
        <span className="status-badge">{statusLabels[task.status]}</span>
        <span className="task-date">
          {new Date(task.created_at).toLocaleDateString('fr-FR')}
        </span>
        <div className="task-actions">
          <button className="btn-edit" onClick={() => onEdit(task)}>Modifier</button>
          <button className="btn-delete" onClick={handleDelete}>Supprimer</button>
        </div>
      </div>
    </div>
  );
}

export default TaskCard;
