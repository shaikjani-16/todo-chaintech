const REACT_APP_API_URL = "http://localhost:5000/api/tasks";
export const getTasks = async () => {
  const response = await fetch(REACT_APP_API_URL);
  return response.json();
};

export const createTask = async (task) => {
  const response = await fetch(REACT_APP_API_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(task),
  });
  return response.json();
};
