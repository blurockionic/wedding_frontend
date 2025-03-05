import React, { useState } from "react";
import { Trash, Calendar, Pencil } from "lucide-react";

const SubEventTask = ({ task, key, onRemove, onSchedule, onUpdate }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [taskName, setTaskName] = useState(task);


  const handleUpdate = () => {
    setIsEditing(false);
    onUpdate(key, taskName);
  };

  return (
    <div className="flex items-center justify-between p-4 border rounded-lg shadow-md bg-white">
      <div className="flex-1">
        {isEditing ? (
          <input
            type="text"
            className="border px-2 py-1 rounded w-full"
            value={taskName}
            autoFocus
            onChange={(e) => setTaskName(e.target.value)}
            onBlur={handleUpdate}
            onKeyDown={(e) => e.key === "Enter" && handleUpdate()}
          />
        ) : (
          <span
            className="truncate max-w-xs cursor-pointer"
            onClick={() => setIsEditing(true)}
          >
            {taskName}
          </span>
        )}
      </div>

      <div className="flex gap-2">
        {/* Schedule Button */}
        <button
          className="flex items-center gap-1 text-blue-600"
          onClick={() => onSchedule(task)}
        >
          <Calendar size={16} />
          Schedule
        </button>

        {/* Remove Button */}
        <button
          className="flex items-center gap-1 text-red-600"
          onClick={() => onRemove(key)}
        >
          <Trash size={16} />
          Remove
        </button>
      </div>
    </div>
  );
};

export default SubEventTask;
