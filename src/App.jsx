import { useState } from "react";

function App() {
  const [tasks, setTasks] = useState([]);
  const [text, setText] = useState("");

  // タスク追加（ボタン & Enter）
  const addTask = () => {
    if (text.trim() === "") return; // 空文字は追加しない

    const newTask = {
      id: Date.now(),
      title: text,
      done: false,
    };

    setTasks([...tasks, newTask]); // 配列を直接変更しない
    setText("");
  };

  // 完了切り替え
  const toggleDone = (id) => {
    const updated = tasks.map((task) =>
      task.id === id ? { ...task, done: !task.done } : task
    );
    setTasks(updated);
  };

  // 削除
  const deleteTask = (id) => {
    const updated = tasks.filter((task) => task.id !== id);
    setTasks(updated);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-100 p-6">
      <h1 className="text-3xl font-extrabold text-center mb-8 text-gray-800">
        Todo List
      </h1>

      {/* 入力欄 */}
      <div className="flex gap-3 mb-8 max-w-lg mx-auto">
        <input
          type="text"
          value={text}
          onChange={(e) => setText(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && addTask()}
          placeholder="タスクを入力してください"
          className="flex-1 border border-gray-300 rounded-lg px-4 py-2 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400 bg-white"
        />
        <button
          onClick={addTask}
          className="bg-blue-600 text-white font-bold px-5 py-2 rounded-lg shadow hover:bg-blue-700 transition"
        >
          追加
        </button>
      </div>

      {/* タスク一覧 */}
      <ul className="max-w-lg mx-auto space-y-4">
        {tasks.map((task) => (
          <li
            key={task.id}
            className="flex items-center justify-between bg-white p-4 rounded-lg shadow hover:shadow-lg transition"
          >
            <span
              onClick={() => toggleDone(task.id)}
              className={`cursor-pointer text-lg ${
                task.done
                  ? "line-through text-gray-400"
                  : "text-gray-800 hover:text-blue-600"
              }`}
            >
              {task.title}
            </span>

            <button
              onClick={() => deleteTask(task.id)}
              className="text-red-500 hover:text-red-700 font-bold transition"
            >
              削除
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
