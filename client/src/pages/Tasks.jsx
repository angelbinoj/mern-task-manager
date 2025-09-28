import React, { useState, useEffect } from "react";
import axios from "axios";

function Tasks() {
  const [tasks, setTasks] = useState([]);
  const [formData, setFormData] = useState({ title: "", description: "", status: "", priority: "" });
  const [editingId, setEditingId] = useState(null);
  const [showForm, setShowForm] = useState(false);

  const token = localStorage.getItem("token");

  // Fetch Task list
  const fetchTasks = async () => {
    try {
      const res = await axios.get("http://localhost:3000/api/tasks", {
        headers: { Authorization: `Bearer ${token}` },
        withCredentials: true,
      });
      setTasks(res.data.data);
    } catch (err) {
      console.error("Fetch failed:", err.message);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  // Handle form input changes
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Add or update task
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const payload = {
        title: formData.title,
        description: formData.description,
        status: formData.status,
        priority: formData.priority,
      };
      if (editingId) {
        // Update existing task
        const res = await axios.put(
          `http://localhost:3000/api/tasks/${editingId}`,
          payload,
          { headers: { Authorization: `Bearer ${token}` } }
        );
        setTasks(tasks.map((t) => (t._id === editingId ? res.data.data : t)));
        setEditingId(null);
      } else {
        // Add new task
        const res = await axios.post(
          "http://localhost:3000/api/tasks",
          formData,
          { headers: { Authorization: `Bearer ${token}` } }
        );
        setTasks([...tasks, res.data.data]);
      }
      setFormData({ title: "", description: "", status: "", priority: "" });
      setShowForm(false);
      fetchTasks();
    } catch (err) {
      console.error(err.response?.data || err.message);
    }
  };

  // Delete Task
  const deleteTask = async (id) => {
    try {
      await axios.delete(`http://localhost:3000/api/tasks/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setTasks(tasks.filter((t) => t._id !== id));
    } catch (err) {
      console.error(err.response?.data || err.message);
    }
  };

  // Set form for editing
  const editTask = (task) => {
    setFormData({
      title: task.title,
      description: task.description,
      status: task.status,
      priority: task.priority,
    });
    setEditingId(task._id);
    setShowForm(true);
  };

  const handleAddNew = () => {
    setFormData({ title: "", description: "", status: "", priority: "" });
    setEditingId(null);
    setShowForm(true);
  };

  const handleCancel = () => {
    setFormData({ title: "", description: "", status: "", priority: "" });
    setEditingId(null);
    setShowForm(false);
  };

  return (
    <>
    {!showForm ? (
      <div className="w-full border-t-2 flex justify-center h-[calc(100vh-6rem)]">
  <div className="w-5/6 pt-10">
    <div className="flex flex-col sm:flex-row justify-between items-center mb-4">
      <h2 className="uppercase text-center sm:text-left bg-cyan-600 text-white rounded text-2xl sm:text-3xl font-extrabold p-4 sm:p-6 w-full sm:w-auto">
        Task - List
      </h2>
      <button
        onClick={handleAddNew}
        className="bg-green-700 mt-3 sm:mt-0 px-3 py-2 text-white rounded-md hover:bg-green-600 text-sm sm:text-base">
        ADD NEW TASK <span className="font-extrabold ms-1 text-xl sm:text-2xl">+</span>
      </button>
    </div>

    <ul className="w-full font-normal border-2 border-slate-300 lg:font-medium rounded-lg bg-slate-200 text-slate-500">
      <li className="hidden lg:grid w-full font-bold text-slate-700 text-center text-base grid-cols-[10%_15%_37%_10%_10%_18%] h-14 border-gray-400 border-b-2 rounded-t-lg">
        <span className="flex justify-center items-center border-r-2 border-slate-600">Created By</span>
        <span className="flex justify-center items-center border-r-2 border-slate-600">Title</span>
        <span className="flex justify-center items-center border-r-2 border-slate-600">Short Description</span>
        <span className="flex justify-center items-center border-r-2 border-slate-600">Status</span>
        <span className="flex justify-center items-center border-r-2 border-slate-600">Priority</span>
        <span className="flex justify-center items-center">Actions</span>
      </li>

      {tasks?.map((t) => (
        <li key={t?._id}
          className="w-full border-gray-400 border-b-2 rounded-t-lg grid lg:grid-cols-[10%_15%_37%_10%_10%_18%] 
            text-xs sm:text-sm lg:text-base  h-auto py-2">
          <div className="flex flex-col lg:hidden space-y-2 text-left">
            <p><span className="font-bold">Created By:</span> {t?.user}</p>
            <p><span className="font-bold">Title:</span> {t?.title}</p>
            <p><span className="font-bold">Description:</span> {t?.description}</p>
            <p><span className="font-bold">Status:</span> {t?.status}</p>
            <p><span className="font-bold">Priority:</span> {t?.priority}</p>

            
            <div className="flex flex-col gap-2 mt-2">
              <button 
                onClick={() => editTask(t)} 
                className="bg-yellow-500 hover:bg-yellow-400 text-white text-xs sm:text-sm lg:text-base px-2 py-1 rounded-md" >
                Update
              </button>
              <button 
                onClick={() => deleteTask(t._id)} 
                className="bg-red-500 hover:bg-red-400 text-white text-xs sm:text-sm lg:text-base px-2 py-1 rounded-md">
                Delete
              </button>
            </div>
          </div>

          
          <span className="hidden lg:flex justify-center items-center border-r-2 border-slate-600">
            {t?.user}
          </span>
          <span className="hidden lg:flex justify-center items-center border-r-2 border-slate-600">
            {t?.title}
          </span>
          <span className="hidden lg:flex justify-center items-center border-r-2 border-slate-600">
            {t?.description}
          </span>
          <span className="hidden lg:flex justify-center items-center border-r-2 border-slate-600">
            {t?.status}
          </span>
          <span className="hidden lg:flex justify-center items-center border-r-2 border-slate-600">
            {t?.priority}
          </span>
          <div className="hidden lg:flex justify-center items-center gap-2">
            <button 
              onClick={() => editTask(t)} 
              className="bg-yellow-500 hover:bg-yellow-400 text-white text-xs lg:text-base px-2 py-1 rounded-md" >
              Update
            </button>
            <button 
              onClick={() => deleteTask(t._id)} 
              className="bg-red-500 hover:bg-red-400 text-white text-xs lg:text-base px-2 py-1 rounded-md" >
              Delete
            </button>
          </div>
        </li>
      ))}
    </ul>
  </div>
</div>


        ) : (
          <div className="px-5 lg:px-32 py-12 h-[calc(100vh-5rem)] bg-slate-100 text-center flex justify-center">
            <form onSubmit={handleSubmit} className="w-full md:w-2/3 lg:w-1/3 bg-cyan-600 rounded-lg p-8">
  <div className="flex flex-col gap-4">
  
    <div className="flex flex-col text-left">
      <label className="text-white mb-1">Title</label>
      <input
        className="p-2 rounded-sm text-gray-900"
        type="text"
        name="title"
        placeholder="Enter task title"
        value={formData.title}
        onChange={handleChange}
        required />
    </div>

    <div className="flex flex-col text-left">
      <label className="text-white mb-1">Description</label>
      <input
        className="p-2 rounded-sm text-gray-900"
        type="text"
        name="description"
        placeholder="Enter description"
        value={formData.description}
        onChange={handleChange}
        required />
    </div>
    <div className="flex flex-col text-left">
      <label className="text-white mb-1">Status</label>
      <select
        name="status"
        value={formData.status}
        onChange={handleChange}
        className="outline-none p-2 rounded-sm bg-white dark:bg-slate-200"
        required>
        <option value="PENDING">PENDING</option>
        <option value="IN_PROGRESS">IN_PROGRESS</option>
        <option value="COMPLETED">COMPLETED</option>
      </select>
    </div>

    <div className="flex flex-col text-left">
      <label className="text-white mb-1">Priority</label>
      <div className="flex gap-6 text-white">
        <label>
          <input className="w-4 h-4 accent-green-500"
            type="radio"
            name="priority"
            value="LOW"
            checked={formData.priority === "LOW"}
            onChange={handleChange} />{" "}
          Low
        </label>
        <label>
          <input className="w-4 h-4 accent-green-500"
            type="radio"
            name="priority"
            value="MEDIUM"
            checked={formData.priority === "MEDIUM"}
            onChange={handleChange}/>{" "}
          Medium
        </label>
        <label>
          <input className="w-4 h-4 accent-green-500"
            type="radio"
            name="priority"
            value="HIGH"
            checked={formData.priority === "HIGH"}
            onChange={handleChange}/>{" "}
          High
        </label>
      </div>
    </div>
  </div>

  <div className="flex justify-center gap-4 mt-8">
    <button
      className="bg-green-500 hover:bg-green-400 text-white px-4 py-2 rounded-md"
      type="submit">
      {editingId ? "Update Task" : "Add Task"}
    </button>
    <button
      type="button"
      onClick={handleCancel}
      className="bg-gray-600 hover:bg-gray-500 text-white px-4 py-2 rounded-md" >
      Cancel
    </button>
  </div>
</form>

          </div>
        )}
  </>
  );
}

export default Tasks;
