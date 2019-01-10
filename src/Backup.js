/*
January 2019

The actual data is stored in a fix variable (instead of an API call that would normally provide this data),

V1

Our application is only one logical component - a list of to dos...

To reflect a more realistic web app we will consider that the list of to do is an actual

*/

import React from "react"

// Rem: importing from an external folder (outside of src) does not seems to work.

import TodoItem from "./TodoItemProject/TodoItem.js"
import todosData from "./TodoItemProject/todosData.js"

class App extends React.Component {

    constructor() {
        super()
        /* {
            id: 1,
            text: "Take out the trash",
            completed: true
        } */
        this.state = {
            todos: todosData
        }
        this.handleChange = this.handleChange.bind(this)    // trick suggested by the author
    }

    handleChange(id) {
        // This in fact executed from the TodoItem function component who adds an argument from
        // the props (the actual key that is the id).
        //
        // This id will serve here as an identifier of todo item.
        this.setState(prevState => {
            const updatedTodos = prevState.todos.map(todo => {
                if (todo.id === id) {
                    todo.completed = !todo.completed
                }
                return todo
            })
            return {
                todos: updatedTodos
            }
        })
    }
    render() {
        const todoItems = this.state.todos.map(
            item => <TodoItem
            key={item.id}
            item={item}
            handleChange={this.handleChange}
            />)

        return (
            <div className="todo-list">
                {todoItems}
            </div>
        )
    }
}

export default App