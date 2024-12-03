import React, { useState } from 'react';
import bg from '../assets/homeBG.png'

const Home = () => {
  const [tasks, setTasks] = useState([
    { id: 1, text: 'Stealth Training', completed: false, urgent: false },
    { id: 2, text: 'Defeat the Shadow Task', completed: false, urgent: true },
    { id: 3, text: 'Disarm the Time Bomb', completed: false, urgent: false },
  ]);
  const [newTask, setNewTask] = useState('');

  const addTask = () => {
    if (newTask.trim()) {
      setTasks([...tasks, { id: Date.now(), text: newTask, completed: false, urgent: false }]);
      setNewTask('');
    }
  };

  const toggleComplete = (id) => {
    setTasks(
      tasks.map((task) => (task.id === id ? { ...task, completed: !task.completed } : task))
    );
  };

  const deleteTask = (id) => {
    setTasks(tasks.filter((task) => task.id !== id));
  };

  return (
    <div className=" text-white min-h-screen bg-cover bg-center" style={{backgroundImage:`url(${bg})`}}>
      <nav className="bg-gray-800 p-4 shadow-lg">
        <div className="container mx-auto flex justify-between items-center">
          <h1 className="text-3xl font-bold">Ninja</h1>
          <ul className="flex space-x-4">
            <li><a href="#home" className="hover:text-red-600">Home</a></li>
            <li><a href="#about" className="hover:text-red-600">Projects</a></li>
            <li><a href="#contact" className="hover:text-red-600">Contact</a></li>
          </ul>
        </div>
      </nav>
      <div className="container mx-auto p-6">
        <div className="bg-black bg-opacity-50 p-6 rounded-lg shadow-lg max-w-md mx-auto">
          <h1 className="text-2xl font-bold mb-4 flex items-center">
            <span role="img" aria-label="ninja">🥋</span> My Ninja Missions
          </h1>
          <div className="mb-4">
            <input
              type="text"
              value={newTask}
              onChange={(e) => setNewTask(e.target.value)}
              placeholder="Enter your mission..."
              className="p-2 rounded w-full text-black"
            />
            <button
              onClick={addTask}
              className="mt-2 w-full bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
            >
              Add Mission
            </button>
          </div>
          <ul className="space-y-2">
            {tasks.map((task) => (
              <li
                key={task.id}
                className={`flex items-center justify-between p-3 rounded shadow 
                  ${task.completed ? 'bg-gray-700 line-through' : 'bg-gray-800'} 
                  ${task.urgent ? 'border-l-4 border-red-600' : ''}`}
              >
                <span onClick={() => toggleComplete(task.id)} className="cursor-pointer">
                  {task.completed ? '✔️' : '☐'} {task.text}
                </span>
                <button
                  onClick={() => deleteTask(task.id)}
                  className="text-red-500 hover:text-red-700 ml-4"
                >
                  💥
                </button>
              </li>
            ))}
          </ul>
          <p className="mt-4 text-center italic">Stay stealthy, stay efficient! 🙇‍♂️</p>
        </div>
      </div>
    </div>
  );
};

export default Home;
