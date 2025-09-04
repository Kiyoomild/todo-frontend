import axios from "axios";

//URL backend
const API_URL = "http://localhost:3000/todos";

export const getTodos = async () => {
  const res = await axios.get(API_URL);
  return res.data;
};

export const addTodo = async (title: string) => {
  const res = await axios.post(API_URL, { title });
  //console.log("POST result:", res.data);
  return res.data;
};


export const toggleTodo = async (id: number, completed: boolean) => {
  const res = await axios.put(`${API_URL}/${id}`, { completed });
  return res.data;
};

export const deleteTodo = async (id: number) => {
  const res = await axios.delete(`${API_URL}/${id}`);
  return res.data;
};
