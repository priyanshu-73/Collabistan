import React, { useContext, useEffect, useState } from "react";
import { UserContext } from "../context/user.context";
import toast from "react-hot-toast";
import axios from "../config/axios";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const { user } = useContext(UserContext);
  const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [projectName, setProjectName] = useState(null);
  const [projects, setProjects] = useState([]);

  const createProject = async (e) => {
    e.preventDefault();
    axios
      .post(
        "/api/project/create",
        { name: projectName },
        { headers: { "Content-Type": "application/json" } }
      )
      .then((res) => {
        const data = res.data;
        setIsModalOpen(false);
        toast.success("Project created successfully!");
      })
      .catch((error) => {
        console.error(error);
        toast.error("An error occurred!");
      });
  };

  useEffect(() => {
    axios
      .get("/api/project/all", {
        headers: { "Content-Type": "application/json" },
      })
      .then((res) => {
        setProjects(res.data.projects);
      })
      .catch((err) => console.log(err));
  }, []);

  return (
    <main className="p-4">
      <div className="projects flex flex-wrap gap-3 items-center">
        <button
          onClick={() => setIsModalOpen(true)}
          className="project text-xl flex gap-2 justify-center border border-black bg-black p-3 rounded-lg hover:bg-slate-800"
        >
          <h4 className="font-semibold text-white">New Project</h4>
          <i className="ri-add-line font-semibold text-white"></i>
        </button>
        {projects.map((project) => (
          <div
            key={project._id}
            className="border-2 p-3 cursor-pointer hover:bg-slate-200"
            onClick={() => {
              navigate("/project", { state: { project } });
            }}
          >
            <h2 className="font-semibold">{project.name}</h2>
            <div className="flex gap-1">
              <i className="ri-team-fill"></i>
              <span>{project.users.length}</span>
            </div>
          </div>
        ))}
      </div>
      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md mx-4 sm:mx-auto">
            <h2 className="text-2xl font-semibold mb-4">Create New Project</h2>
            <form onSubmit={createProject}>
              <div className="mb-4">
                <label
                  className="block text-gray-700 text-sm font-bold mb-2"
                  htmlFor="projectName"
                >
                  Project Name
                </label>
                <input
                  type="text"
                  id="projectName"
                  value={projectName}
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  onChange={(e) => setProjectName(e.target.value)}
                  required
                />
              </div>
              <div className="flex items-center justify-between">
                <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
                  Create
                </button>
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </main>
  );
};

export default Home;
