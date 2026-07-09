const STORAGE_KEY = "tasks";

const readTasks = () => {
  if (typeof window === "undefined") {
    return [];
  }

  const savedTasks = localStorage.getItem(STORAGE_KEY);

  if (!savedTasks) {
    return [];
  }

  try {
    const parsedTasks = JSON.parse(savedTasks);
    return Array.isArray(parsedTasks) ? parsedTasks : [];
  } catch (err) {
    console.error("Failed to parse saved tasks", err);
    return [];
  }
};

const saveTasks = (tasks) => {
  if (typeof window !== "undefined") {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks));
  }

  return tasks;
};

export const getTasks = async () => {
  return readTasks();
};

export const addTask = async (task) => {
  const existingTasks = readTasks();
  const newTask = {
    id: Date.now(),
    ...task,
  };

  const updatedTasks = saveTasks([...existingTasks, newTask]);

  return updatedTasks[updatedTasks.length - 1];
};