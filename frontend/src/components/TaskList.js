import React from 'react';
import TaskCard from './TaskCard';

function TaskList({ tasks, onEdit, onRefresh }) {
  if (tasks.length === 0) {
    return (
      <div className="empty-state">
        <p>Aucune tâche pour le moment</p>
        <span>Ajoutez votre première tâche ci-dessus</span>
      </div>
    );
  }

  return (
    <div className="task-list">
      {tasks.map(task => (
        <TaskCard
          key={task.id}
          task={task}
          onEdit={onEdit}
          onRefresh={onRefresh}
        />
      ))}
    </div>
  );
}

export default TaskList;
