import React, { useState } from "react";

const AddUserModal = ({ isOpen, onClose, onAddUser }) => {
  const [users, setUsers] = useState([{ id: 1, name: "" }]);

  const handleAddUser = () => {
    if (users[users.length - 1].name !== "") {
      setUsers([...users, { id: users.length + 1, name: "" }]);
    }
  };

  const handleChange = (id, value) => {
    setUsers(
      users.map((user) => (user.id === id ? { ...user, name: value } : user))
    );
  };

  const handleSubmit = () => {
    onAddUser(users);
    onClose();
  };

  const userList = [
    {
      id: 1,
      name: "John Doe",
      email: "john.doe@example.com",
    },
    {
      id: 2,
      name: "Jane Smith",
      email: "jane.smith@example.com",
    },
    {
      id: 3,
      name: "Alice Johnson",
      email: "alice.johnson@example.com",
    },
    {
      id: 4,
      name: "Bob Brown",
      email: "bob.brown@example.com",
    },
  ];

  const selectedUserNames = users.map((user) => user.name);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white p-6 rounded-lg shadow-lg w-1/3">
        <h2 className="text-xl font-bold mb-4">Add Collaborators</h2>
        {users.map((user, index) => (
          <div key={user.id} className="flex items-center mb-2">
            <select
              value={user.name}
              onChange={(e) => handleChange(user.id, e.target.value)}
              className="border p-2 rounded w-full"
            >
              <option value="" disabled>
                Select user
              </option>
              {userList
                .filter(
                  (userOption) =>
                    !selectedUserNames.includes(userOption.name) ||
                    userOption.name === user.name
                )
                .map((userOption, index) => (
                  <option key={index} value={userOption.name}>
                    {userOption.name}
                  </option>
                ))}
            </select>
            {index === users.length - 1 && user.name !== "" && (
              <button
                onClick={handleAddUser}
                className="ml-2 bg-blue-500 text-white rounded-full w-[30px] h-[30px] flex items-center justify-center font-bold"
              >
                +
              </button>
            )}
          </div>
        ))}
        <div className="flex justify-end mt-4">
          <button
            onClick={onClose}
            className="bg-gray-500 text-white p-2 rounded mr-2"
          >
            Cancel
          </button>
          <button
            onClick={handleSubmit}
            className="bg-blue-700 text-white p-2 rounded"
          >
            Add Users
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddUserModal;
