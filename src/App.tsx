import React, {useState} from 'react';
import './App.css';
import {TaskType, TodoList} from "./TodoList";
import {v1} from "uuid";

export type FilterValueType = "all" | "completed" | "active";

function App() {
    // console.log(typeof (v1()))
    let [tasks, setTasks] = useState<Array<TaskType>>([
        {id: v1(), title: "CSS", isDone: true},
        {id: v1(), title: "HTML", isDone: true},
        {id: v1(), title: "React", isDone: false},
        {id: v1(), title: "restAPI", isDone: false},
        {id: v1(), title: "GraphQL", isDone: false}
    ]);
    let [filter, setFilter] = useState<FilterValueType>("all");

    const removeTask = (id: string) => {
        let filteredTasks: Array<TaskType> = tasks.filter(task => task.id !== id)
        setTasks(filteredTasks);
    }

    const addTask = (title: string) => {
        const newTask: TaskType = {
            id: v1(),
            title: title,
            isDone: false
        }
        const copyState = [newTask, ...tasks]

        setTasks(copyState)
    }

    const changeFilter = (value: FilterValueType) => {
        setFilter(value)
    }

    let tasksForTodoList = tasks;
    if (filter === "completed") {
        tasksForTodoList = tasks.filter(task => task.isDone === true)
    }
    if (filter === "active") {
        tasksForTodoList = tasks.filter(task => task.isDone === false)
    }


    return (
        <div className="App">
            <TodoList title="What to learn"
                      tasks={tasksForTodoList}
                      removeTask={removeTask}
                      changeFilter={changeFilter}
                      addTask={addTask}
            />


        </div>
    );
}

export default App;
