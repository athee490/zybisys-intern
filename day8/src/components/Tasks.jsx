import { useEffect, useState } from "react";
import { addTask, getTasks } from "../services/taskApi";

function Tasks() {
  const [tasks, setTasks] = useState([]);

  const [title, setTitle] = useState("");

  const [priority, setPriority] = useState("Low");

  const [errors, setErrors] = useState({});

  const [loading, setLoading] = useState(false);

  const [apiError, setApiError] = useState("");

  const showPriority = process.env.REACT_APP_ENABLE_TASK_PRIORITY === "true";

  useEffect(() => {
    loadTasks();
  }, []);

  const loadTasks = async () => {
    try {
      const data = await getTasks();
      setTasks(data);
    } catch (err) {
      console.log(err);
    }
  };

  const validate = () => {
    const newErrors = {};

    if (!title) {
      newErrors.title = "Title is required";
    } else if (title.length < 3) {
      newErrors.title = "Minimum 3 characters";
    }

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validate()) return;

    setLoading(true);
    setApiError("");

    const task = {
      title,
      priority,
    };

    try {
      const newTask = await addTask(task);

      setTasks((prev) => [...prev, newTask]);

      setTitle("");
      setPriority("Low");
    } catch (err) {
      setApiError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h2>Tasks</h2>

      <form onSubmit={handleSubmit}>
        <div>
          <label>Title</label>
          <br />

          <input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />

          {errors.title && (
            <p style={{ color: "red" }}>{errors.title}</p>
          )}
        </div>

        <br />

        {showPriority && (
          <>
            <label>Priority</label>
            <br />

            <select
              value={priority}
              onChange={(e) => setPriority(e.target.value)}
            >
              <option>Low</option>
              <option>Medium</option>
              <option>High</option>
            </select>

            <br />
            <br />
          </>
        )}

        {apiError && (
          <p style={{ color: "red" }}>{apiError}</p>
        )}

        <button disabled={loading}>
          {loading ? "Adding..." : "Add Task"}
        </button>
      </form>

      <hr />

      {tasks.map((task) => (
        <div
          key={task.id}
          style={{
            border: "1px solid #ddd",
            padding: "10px",
            marginBottom: "10px",
          }}
        >
          <h4>{task.title}</h4>

          {showPriority && <p>{task.priority}</p>}
        </div>
      ))}
    </div>
  );
}

export default Tasks; 