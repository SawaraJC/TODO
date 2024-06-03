import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState('');
  const [newDate, setNewDate] = useState('');
  const [isEditing, setIsEditing] = useState(false);
  const [currentTask, setCurrentTask] = useState({});

  const addTask = () => {
    if (newTask.trim() && newDate.trim()) {
      setTasks([...tasks, { text: newTask, date: newDate, id: Date.now() }]);
      setNewTask('');
      setNewDate('');
    }
  };

  const deleteTask = (id) => {
    setTasks(tasks.filter(task => task.id !== id));
  };

  const editTask = (task) => {
    setIsEditing(true);
    setCurrentTask({ ...task });
  };

  const saveTask = () => {
    setTasks(tasks.map(task => (task.id === currentTask.id ? currentTask : task)));
    setIsEditing(false);
    setCurrentTask({});
  };

  return (
    <>
      <div className="container todo-container text-center mt-5">
        <h1>To Do</h1>
        <div className="container text-container">
          <div className="row justify-content-center">
            <div className="col-12 col-sm-6 col-md-4 mb-3">
              <input 
                type="text" 
                className="form-control" 
                placeholder="Enter TODO here" 
                value={newTask} 
                onChange={(e) => setNewTask(e.target.value)} 
              />
            </div>
            <div className="col-12 col-sm-4 col-md-3 mb-3">
              <input 
                type="date" 
                className="form-control" 
                value={newDate} 
                onChange={(e) => setNewDate(e.target.value)} 
              />
            </div>
            <div className="col-12 col-sm-2 col-md-2 mb-3">
              <button 
                type="button" 
                className="btn btn-success w-100" 
                onClick={addTask}
              >
                Add Task
              </button>
            </div>
          </div>
          {isEditing && (
            <div className="row justify-content-center">
              <div className="col-12 col-sm-6 col-md-4 mb-3">
                <input 
                  type="text" 
                  className="form-control" 
                  value={currentTask.text} 
                  onChange={(e) => setCurrentTask({ ...currentTask, text: e.target.value })} 
                />
              </div>
              <div className="col-12 col-sm-4 col-md-3 mb-3">
                <input 
                  type="date" 
                  className="form-control" 
                  value={currentTask.date} 
                  onChange={(e) => setCurrentTask({ ...currentTask, date: e.target.value })} 
                />
              </div>
              <div className="col-12 col-sm-2 col-md-2 mb-3">
                <button 
                  type="button" 
                  className="btn btn-primary w-100" 
                  onClick={saveTask}
                >
                  Save Task
                </button>
              </div>
            </div>
          )}
          <ul className="list-group">
            {tasks.map(task => (
              <li key={task.id} className="list-group-item d-flex justify-content-between align-items-center">
                <span>{task.text} (Due: {task.date})</span>
                <div>
                  <button 
                    className="btn btn-secondary btn-sm mx-1" 
                    onClick={() => editTask(task)}
                  >
                    Edit
                  </button>
                  <button 
                    className="btn btn-danger btn-sm" 
                    onClick={() => deleteTask(task.id)}
                  >
                    Delete
                  </button>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </>
  );
}

export default App;
