import React, { useState } from 'react';
import bg from '../assets/bg.jpg';

const Login = () => {
  const [password, setPassword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    alert(`Password submitted: ${password}`);
  };

  return (
    <div
      className="flex items-center justify-center h-screen bg-cover bg-center group"
      style={{ backgroundImage: `url(${bg})` }}
    >
      <form
        onSubmit={handleSubmit}
        className="relative flex items-center w-4/5 max-w-sm opacity-0 scale-50 transition-all duration-300 ease-in-out group-hover:opacity-100 group-hover:scale-100"
      >
        <input
          type="password"
          placeholder="Enter your password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="flex-1 px-4 py-2 text-white bg-black/30 border border-white/50 rounded-md placeholder-white/80 focus:outline-none focus:bg-white/70 focus:placeholder-gray-500 hover:bg-white/70 transition-all duration-300 ease-in-out"
        />
        <button
          type="submit"
          className="ml-2 text-white bg-black/30 hover:bg-white/70 border border-white/50 p-2 rounded-md transition-all duration-300 ease-in-out"
        >
          ➤
        </button>
      </form>
    </div>
  );
};

export default Login;
