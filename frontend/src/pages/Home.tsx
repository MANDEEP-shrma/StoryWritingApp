import React from "react";
import { useNavigate } from "react-router-dom";

const Home: React.FC = () => {
  const navigate = useNavigate();
  return (
    <div className="bg-gradient-to-r from-blue-500 to-purple-600 text-white min-h-screen flex flex-col justify-center items-center p-8">
      <h1 className="text-6xl font-extrabold mb-6 drop-shadow-lg">Medium Blog</h1>
      <p className="text-xl mb-6 max-w-2xl text-center">
        A platform to explore insightful stories, share your thoughts, and connect with a vibrant community of writers and readers.
      </p>
      <div className="flex gap-6 mt-10">
        <button
          onClick={() => navigate('/signup')}
          className="bg-green-500 text-white px-6 py-3 rounded-full shadow-lg hover:bg-green-600 transition font-semibold"
        >
          Signup
        </button>
        <button
          onClick={() => navigate('/signin')}
          className="bg-yellow-500 text-white px-6 py-3 rounded-full shadow-lg hover:bg-yellow-600 transition font-semibold"
        >
          Signin
        </button>
      </div>
    </div>
  );
};

export default Home;
