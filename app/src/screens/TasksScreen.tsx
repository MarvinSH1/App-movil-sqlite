//app/src/screens/TasksScreen.tsx
import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  TextInput,
  Button,
  FlatList,
  TouchableOpacity,
} from "react-native";
import { addTask, getTasks, updateTask, deleteTask } from "../database/db";

export default function TasksScreen() {
  const [tasks, setTasks] = useState<
    { id: number; title: string; completed: number }[]
  >([]);
  const [newTask, setNewTask] = useState("");

  useEffect(() => {
    loadTasks();
  }, []);

  async function loadTasks() {
    const loadedTasks = await getTasks();
    setTasks(loadedTasks);
  }

  async function handleAddTask() {
    if (newTask.trim() === "") return;
    await addTask(newTask);
    setNewTask("");
    loadTasks();
  }

  async function handleToggleTask(id: number, completed: number) {
    await updateTask(id, !completed);
    loadTasks();
  }

  async function handleDeleteTask(id: number) {
    await deleteTask(id);
    loadTasks();
  }

  return (
    <View style={{ padding: 20 }}>
      <TextInput
        placeholder="Nueva tarea..."
        value={newTask}
        onChangeText={setNewTask}
        style={{ borderWidth: 1, padding: 8, marginBottom: 10 }}
      />
      <Button title="Agregar Tarea" onPress={handleAddTask} />
      <FlatList
        data={tasks}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              marginVertical: 8,
            }}
          >
            <TouchableOpacity
              onPress={() => handleToggleTask(item.id, item.completed)}
            >
              <Text
                style={{
                  textDecorationLine: item.completed ? "line-through" : "none",
                }}
              >
                {item.title}
              </Text>
            </TouchableOpacity>
            <Button title="❌" onPress={() => handleDeleteTask(item.id)} />
          </View>
        )}
      />
    </View>
  );
}
