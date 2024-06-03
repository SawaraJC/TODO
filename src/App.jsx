import React, { useState } from 'react';  // Import React and the useState hook from the 'react' library
import 'bootstrap/dist/css/bootstrap.min.css';  // Import Bootstrap CSS for styling

// Define the main App component
function App() {
  // Initialize the state 'tasks' as an empty array to hold task objects
  const [tasks, setTasks] = useState([]);
  // Initialize the state 'newTask' as an empty string to hold the new task input
  const [newTask, setNewTask] = useState('');
  // Initialize the state 'newDate' as an empty string to hold the new task date input
  const [newDate, setNewDate] = useState('');
  // Initialize the state 'isEditing' as false to track if a task is being edited
  const [isEditing, setIsEditing] = useState(false);
  // Initialize the state 'currentTask' as an empty object to hold the task being edited
  const [currentTask, setCurrentTask] = useState({});

  // Function to add a new task
  const addTask = () => {
    // Check if 'newTask' and 'newDate' are not empty after trimming whitespace
    if (newTask.trim() && newDate.trim()) {
      // Add the new task to the 'tasks' array with text, date, and unique id
      setTasks([...tasks, { text: newTask, date: newDate, id: Date.now() }]);
      // Clear the 'newTask' input
      setNewTask('');
      // Clear the 'newDate' input
      setNewDate('');
    }
  };

  // Function to delete a task by its id
  const deleteTask = (id) => {
    // Filter out the task with the specified id from the 'tasks' array
    setTasks(tasks.filter(task => task.id !== id));
  };

  // Function to initiate editing a task
  const editTask = (task) => {
    // Set 'isEditing' to true to show the edit form
    setIsEditing(true);
    // Set 'currentTask' to the task being edited
    setCurrentTask({ ...task });
  };

  // Function to save the edited task
  const saveTask = () => {
    // Update the task in the 'tasks' array with the new values from 'currentTask'
    setTasks(tasks.map(task => (task.id === currentTask.id ? currentTask : task)));
    // Set 'isEditing' to false to hide the edit form
    setIsEditing(false);
    // Clear 'currentTask'
    setCurrentTask({});
  };

  // JSX to render the component
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
                value={newTask}  // Bind the value to 'newTask'
                onChange={(e) => setNewTask(e.target.value)}  // Update 'newTask' state on change
              />
            </div>
            <div className="col-12 col-sm-4 col-md-3 mb-3">  
              <input 
                type="date" 
                className="form-control" 
                value={newDate}  // Bind the value to 'newDate'
                onChange={(e) => setNewDate(e.target.value)}  // Update 'newDate' state on change
              />
            </div>
            <div className="col-12 col-sm-2 col-md-2 mb-3">  
              <button 
                type="button" 
                className="btn btn-success w-100" 
                onClick={addTask}  // Call 'addTask' on click
              >
                Add Task
              </button>
            </div>
          </div>
          {isEditing && (  // Conditionally render the edit form if 'isEditing' is true
            <div className="row justify-content-center"> 
              <div className="col-12 col-sm-6 col-md-4 mb-3">  
                <input 
                  type="text" 
                  className="form-control" 
                  value={currentTask.text}  // Bind the value to 'currentTask.text'
                  onChange={(e) => setCurrentTask({ ...currentTask, text: e.target.value })}  // Update 'currentTask.text' on change
                />
              </div>
              <div className="col-12 col-sm-4 col-md-3 mb-3">  
                <input 
                  type="date" 
                  className="form-control" 
                  value={currentTask.date}  // Bind the value to 'currentTask.date'
                  onChange={(e) => setCurrentTask({ ...currentTask, date: e.target.value })}  // Update 'currentTask.date' on change
                />
              </div>
              <div className="col-12 col-sm-2 col-md-2 mb-3">  
                <button 
                  type="button" 
                  className="btn btn-primary w-100" 
                  onClick={saveTask}  // Call 'saveTask' on click
                >
                  Save Task
                </button>
              </div>
            </div>
          )}
          <ul className="list-group">  
            {tasks.map(task => (  // Map over 'tasks' to render each task
              <li key={task.id} className="list-group-item d-flex justify-content-between align-items-center">  
                <span>{task.text} (Due: {task.date})</span>  
                <div>
                  <button 
                    className="btn btn-secondary btn-sm mx-1" 
                    onClick={() => editTask(task)}  // Call 'editTask' with the task on click
                  >
                    Edit
                  </button>
                  <button 
                    className="btn btn-danger btn-sm" 
                    onClick={() => deleteTask(task.id)}  // Call 'deleteTask' with the task id on click
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

// Export the App component as the default export
export default App;
