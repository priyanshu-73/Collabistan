import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import AddUser from "../modal/AddUser";
import axios from "../config/axios";
import { toast } from "react-hot-toast";

const Project = () => {
  const location = useLocation();
  const [isSidePanelOpen, setIsSidePanelOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [users, setUsers] = useState([]);
  const [selectedUsers, setSelectedUsers] = useState([]);
  const [project, setProject] = useState(location.state.project);
  const handleUserSelection = (user) => {
    setSelectedUsers((prevSelectedUsers) => {
      if (prevSelectedUsers.includes(user)) {
        return prevSelectedUsers.filter((u) => u !== user); // Remove user if already selected
      } else {
        return [...prevSelectedUsers, user]; // Add user if not selected
      }
    });
  };

  const addCollaborators = () => {
    if (selectedUsers.size == 0) {
      toast.error("Select Collaborator first!");
      return;
    }
    axios
      .put(
        "/api/project/addusers",
        {
          projectId: location.state.project._id,
          users: Array.from(selectedUsers.map((user) => user._id)),
        },
        {
          headers: { "Content-Type": "application/json" },
        }
      )
      .then((res) => {
        toast.success("Collaborators added successfully!");
        console.log(res.data);
        setIsModalOpen(false);
      })
      .catch((err) => {
        toast.error(err.response.data.error);
        console.log(err);
      });
  };

  useEffect(() => {
    axios
      .get(`/api/project/get-project/${location.state.project._id}`)
      .then((res) => setProject(res.data.project))
      .catch((err) => console.log(err));

    axios
      .get("/api/user/all", {
        headers: { "Content-Type": "application/json" },
      })
      .then((res) => setUsers(res.data.users))
      .catch((err) => console.log(err.message));
  }, []);

  return (
    <main className="h-screen w-screen flex">
      <section className="left relative h-full flex flex-col min-w-96 border border-r-1">
        <header className="w-full p-2 px-4 flex justify-between  bg-slate-300">
          <button
            className="flex items-center text-sm hover:text-slate-700 font-semibold"
            onClick={() => setIsModalOpen(!isModalOpen)}
          >
            <i className="ri-user-add-fill text-xl mr-1"></i>
            <h1>Add Collaborator</h1>
          </button>
          <button
            className="p-2"
            onClick={() => setIsSidePanelOpen(!isSidePanelOpen)}
          >
            <i className="ri-team-fill text-2xl hover:text-slate-700"></i>
          </button>
        </header>
        <div className="conversation-area flex-grow flex flex-col">
          <div className="message-box flex flex-col flex-grow">
            <div className="message flex flex-col max-w-52 p-2 bg-black text-white w-fit rounded-lg m-1 shadow-md relative">
              <small className="opacity-65 text-xs">email</small>
              <p className="text-sm">Lorem ipsum dolor sit amet. lorem6</p>
            </div>

            <div className="ml-auto bg-green-900 max-w-52  message flex flex-col p-2 text-white w-fit rounded-lg m-1 shadow-md relative">
              <p className="text-sm">outgoing</p>
            </div>
          </div>
          <div className="inputField flex justify-between w-full border-t-2 bg-white p-3">
            <input
              type="text"
              className="w-80 border-none h-full focus:outline-none"
              placeholder="Enter Message"
            />
            <i className="ri-send-plane-2-fill hover:text-slate-700 cursor-pointer text-xl"></i>
          </div>
        </div>
        <div
          className={`sidepanel w-full h-full transition-all bg-slate-50 flex flex-col gap-2 absolute  ${
            isSidePanelOpen ? "translate-x-0" : "-translate-x-full"
          } top-0`}
        >
          <header className="flex items-center justify-between p-2 px-3 bg-slate-300 h-[10vh]">
            <h1 className="font-semibold text-lg">Collaborators</h1>
            <button onClick={() => setIsSidePanelOpen(!isSidePanelOpen)}>
              <i className="ri-close-circle-fill text-2xl"></i>
            </button>
          </header>
          <div className="users flex flex-col gap-2">
            <div className="user cursor-pointer flex flex-col gap-3 p-3">
              {project.users &&
                project.users.map((user) => (
                  <>
                    <div
                      key={user._id}
                      className="flex gap-3 items-center bg-slate-600 p-3 hover:bg-slate-500  rounded-md"
                    >
                      <div className="aspect-square rounded-full p-5 flex items-center justify-center text-slate-300 w-fit h-fit bg-slate-300">
                        <i className="ri-user-fill absolute text-black"></i>
                      </div>
                      <h1 className="text-xl overflow-hidden text-white font-semibold">
                        {user.email}
                      </h1>
                    </div>
                  </>
                ))}
            </div>
          </div>
        </div>
      </section>
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-6 rounded-lg shadow-lg w-96">
            <header className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold">Add Collaborators</h2>
              <button onClick={() => setIsModalOpen(false)}>
                <i className="ri-close-fill text-2xl"></i>
              </button>
            </header>
            <div className="flex flex-col items-start gap-2">
              {users.map((user) => (
                <button
                  className={`flex gap-3 items-center justify-center p-3 rounded-md ${
                    selectedUsers.includes(user) ? "bg-blue-200" : ""
                  }`}
                  key={user._id}
                  onClick={() => handleUserSelection(user)}
                >
                  <span className="border border-slate-500 rounded-full p-1 w-[40px] h-[40px] text-white bg-slate-500 flex items-center justify-center">
                    <i className="ri-user-fill"></i>
                  </span>
                  <span className="font-semibold text-lg">{user.email}</span>
                </button>
              ))}
              {/* Add more users as needed */}
            </div>
            <footer className="flex justify-end mt-4">
              <button
                className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-700"
                onClick={() => {
                  addCollaborators();
                }}
              >
                Add Selected
              </button>
            </footer>
          </div>
        </div>
      )}
    </main>
  );
};

export default Project;
