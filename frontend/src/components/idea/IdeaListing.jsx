import React, { useState, useEffect } from "react";
import { FaPlus } from "react-icons/fa";
import IdeaCard from "./Idea.jsx";
import Ideaform from "./IdeaForm.jsx";
import axios from "axios";

const IdeaList = () => {
  const [ideas, setIdeas] = useState([]);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    fetchIdeas();
  }, []);

  const fetchIdeas = async () => {
    try {
      const response = await axios.get("/api/ideas");
      setIdeas(response.data);
    } catch (error) {
      console.error("Failed to fetch ideas:", error);
    }
  };

  const handleCreate = async (formData) => {
    try {
      const response = await axios.post("/api/ideas", formData);
      setIdeas([response.data, ...ideas]);
      setIsFormOpen(false);
    } catch (error) {
      console.error("Failed to save idea:", error);
    }
  };

  const filteredIdeas = ideas.filter((idea) =>
    idea.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="bg-white w-full mt-0 p-4">
      {/* Header Section */}
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-4xl font-bold text-blue-700">Ideas</h1>

        <div className="flex items-center space-x-3">
          <input
            type="text"
            placeholder="Search Ideas"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />

          <button
            onClick={() => setIsFormOpen(true)}
            className="flex items-center justify-center w-10 h-10 bg-blue-600 text-white rounded-full shadow hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <FaPlus className="w-5 h-5" />
          </button>
        </div>
      </div>

      <hr className="border-gray-300 mb-6" />

      {/* Ideas List */}
      <div className="flex flex-col items-center space-y-6">
        {filteredIdeas.length > 0 ? (
          filteredIdeas.map((idea) => (
            <IdeaCard key={idea._id} idea={idea} />
          ))
        ) : (
          <p className="text-gray-500">No ideas available</p>
        )}
      </div>

      {/* Form Modal */}
      {isFormOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white rounded-lg shadow-xl p-6 w-full max-w-lg">
            <Ideaform
              existingIdea={null}
              onSubmit={handleCreate}
              onClose={() => setIsFormOpen(false)}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default IdeaList;
