import { useState, useEffect } from "react";

export default function TodoApp() {
  const [todo, setTodo] = useState("");
  const [date, setDate] = useState("");
  const [todos, setTodos] = useState([]);

  useEffect(() => {
    const saved = localStorage.getItem("todos");
    if (saved) setTodos(JSON.parse(saved));
  }, []);

  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos));
  }, [todos]);

  const addTodo = () => {
    if (!todo || !date) return alert("Please fill all fields");
    setTodos([...todos, { id: Date.now(), todo, date, done: false }]);
    setTodo("");
    setDate("");
  };

  const toggleTodo = (id) => {
    setTodos(
      todos.map((t) =>
        t.id === id ? { ...t, done: !t.done } : t
      )
    );
  };

  const deleteTodo = (id) => {
    setTodos(todos.filter((t) => t.id !== id));
  };

  const completed = todos.filter((t) => t.done).length;
  const progress = todos.length
    ? Math.round((completed / todos.length) * 100)
    : 0;

  return (
    <div style={styles.page}>
      <div style={styles.card}>
        <h1 style={styles.title}> Todo App</h1>

        {}
        <div style={styles.progressBox}>
          <div style={styles.progressTrack}>
            <div
              style={{
                ...styles.progressFill,
                width: `${progress}%`,
              }}
            />
          </div>
          <small style={styles.progressText}>
            {completed}/{todos.length} completed ({progress}%)
          </small>
        </div>

        {}
        <div style={styles.inputRow}>
          <input
            style={styles.input}
            placeholder="What do you need to do?"
            value={todo}
            onChange={(e) => setTodo(e.target.value)}
          />
          <input
            type="date"
            style={styles.input}
            value={date}
            onChange={(e) => setDate(e.target.value)}
          />
          <button style={styles.addBtn} onClick={addTodo}>
            Add
          </button>
        </div>

        {}
        {todos.length === 0 ? (
          <p style={styles.empty}>No tasks yet 🚀</p>
        ) : (
          todos.map((t) => (
            <div key={t.id} style={styles.todo}>
              <div>
                <h4
                  style={{
                    ...styles.todoText,
                    textDecoration: t.done ? "line-through" : "none",
                    opacity: t.done ? 0.6 : 1,
                  }}
                >
                  {t.todo}
                </h4>
                <small style={styles.date}>
                   {new Date(t.date).toLocaleDateString()}
                </small>
              </div>
              <div style={styles.actions}>
                <button
                  style={{
                    ...styles.doneBtn,
                    background: t.done ? "#f59b0aff" : "#e58108ff",
                  }}
                  onClick={() => toggleTodo(t.id)}
                >
                  {t.done ? "Undo" : "Done"}
                </button>
                <button
                  style={styles.deleteBtn}
                  onClick={() => deleteTodo(t.id)}
                >
                  ✕
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
const styles = {
  page: {
    minHeight: "100vh",
    background: "linear-gradient(135deg, #f38609ff, #764ba2)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontFamily: "Poppins, sans-serif",
  },
  card: {
    width: "90%",
    maxWidth: "480px",
    background: "rgba(255,255,255,0.15)",
    backdropFilter: "blur(12px)",
    borderRadius: "20px",
    padding: "30px",
    color: "#fff",
    boxShadow: "0 20px 40px rgba(239, 113, 10, 0.25)",
  },
  title: {
    textAlign: "center",
    marginBottom: "20px",
    fontSize: "32px",
  },
  progressBox: { marginBottom: "25px" },
  progressTrack: {
    height: "10px",
    background: "rgba(255,255,255,0.3)",
    borderRadius: "10px",
    overflow: "hidden",
  },
  progressFill: {
    height: "100%",
    background: "linear-gradient(90deg,#06d6a0,#1b9aaa)",
    transition: "0.4s",
  },
  progressText: {
    display: "block",
    marginTop: "6px",
    fontSize: "13px",
    textAlign: "right",
  },
  inputRow: {
    display: "flex",
    gap: "10px",
    marginBottom: "25px",
    flexWrap: "wrap",
  },
  input: {
    flex: 1,
    padding: "12px",
    borderRadius: "10px",
    border: "none",
    outline: "none",
    fontSize: "15px",
  },
  addBtn: {
    padding: "12px 18px",
    borderRadius: "10px",
    border: "none",
    background: "#f9ad0aff",
    fontWeight: "bold",
    cursor: "pointer",
  },
  todo: {
    background: "rgba(255,255,255,0.18)",
    padding: "15px",
    borderRadius: "14px",
    marginBottom: "12px",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  },
  todoText: { margin: 0, fontSize: "18px" },
  date: { fontSize: "12px", opacity: 0.85 },
  actions: { display: "flex", gap: "8px" },
  doneBtn: {
    padding: "8px 14px",
    borderRadius: "8px",
    border: "none",
    color: "#000",
    cursor: "pointer",
    fontWeight: "bold",
  },
  deleteBtn: {
    padding: "8px 12px",
    borderRadius: "8px",
    border: "none",
    background: "#ef476f",
    color: "#fff",
    cursor: "pointer",
    fontWeight: "bold",
  },
  empty: {
    textAlign: "center",
    opacity: 0.85,
  },
};
