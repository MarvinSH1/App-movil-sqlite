//app/src/database/db.ts
import * as SQLite from "expo-sqlite";
// Función para inicializar la base de datos
async function setupDatabase() {
  const db = await SQLite.openDatabaseAsync("tasksDB");

  await db.execAsync(`
    PRAGMA journal_mode = WAL;
    CREATE TABLE IF NOT EXISTS tasks (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      title TEXT NOT NULL,
      completed INTEGER DEFAULT 0
    );
  `);

  return db;
}

export const dbPromise = setupDatabase();

// Función para insertar una nueva tarea
export async function addTask(title: string) {
  const db = await dbPromise;
  await db.runAsync(
    "INSERT INTO tasks (title, completed) VALUES (?, ?)",
    title,
    0
  );
  console.log("Tarea insertada");
}

// Función para obtener todas las tareas
export async function getTasks(): Promise<
  { id: number; title: string; completed: number }[]
> {
  const db = await dbPromise;
  const tasks = await db.getAllAsync("SELECT * FROM tasks");
  return tasks as { id: number; title: string; completed: number }[];
}

// Función para marcar una tarea como completada
export async function updateTask(id: number, completed: boolean) {
  const db = await dbPromise;
  console.log(` ${id}  tarea completada: ${completed}`);
  await db.runAsync(
    "UPDATE tasks SET completed = ? WHERE id = ?",
    completed ? 1 : 0,
    id
  );
}

// Función para eliminar una tarea
export async function deleteTask(id: number) {
  const db = await dbPromise;
  await db.runAsync("DELETE FROM tasks WHERE id = ?", id);
  console.log("Tarea eliminada");
}

// Exportar un componente React por defecto
const DatabaseComponent = () => {
  return null;
};

export default DatabaseComponent;
