/*
January 2019

The actual data is stored in a fix variable (instead of an API call that would normally provide this data),

V1

Our application is only one logical component - a list of to dos...

V2

To reflect a more realistic web app we will consider that the list of to do is an actual visual component within
the App.

Let's refactor...done

Properties hierarchy

App
    ToDoList (has state)
        TodoItem (has no state - gets its prop from the above layer)

Styling

    App has no styling of itw own
    ToDoList has its own css class WITHOUT conditional styling
    TodoItems has itw own styling AND conditional styling to reflect state

Action propagation

    App has no action
    ToDoList has the overall state of the application so it needs to be told
        when the user chages the state of one of its items. Actual handling is
        executed at the following layer (TodoItems) -  a call back is passed within
        the JSX (using props of course).
    TodoItems handles the action by executing the code of the callback (in props)

*/

import React from "react"

// Rem: importing from an external folder (outside of src) does not seems to work.

import TodoItem from "./TodoItemProject/TodoItem.js"
import todosData from "./TodoItemProject/todosData.js"


class App extends React.Component {

    render() {
        return < ToDoList />
    }
}

class ToDoList extends React.Component {

    constructor() {
        super()
        /* {
            id: 1,
            text: "Take out the trash",
            completed: true
        } */

        // This 'emulates' a real worldd API call that would return a certain quantity of to do items.

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

        // Remarque on the code below:
        //
        // We're looping around all data in hope to match the id.
        // if found then toggle the 'completed' field, otherwise just return the item.


        // a setState like this one MUST return the new updated "state" (in fact a new copy)
        
        this.setState(prevState => {

            // Phase 1

            const updatedTodos = prevState.todos.map(todo => {
                if (todo.id === id) {
                    todo.completed = !todo.completed        // actual work - this line !!!
                }
                return todo
            })
            
            // Phase 2

            return {
                todos: updatedTodos
            }
        })
    }

    render() {

        // map will process an array of objects and for each entry (item here) will
        // generate a new entry...this is like saying
        // new array = processed argument array
        //  or
        // todoItems = this.state.todos.map(recipe)
        //
        // the recipe here is a formatting one from raw data (id and text and completion flag)
        // to JSX data
        //

        const todoItems = this.state.todos.map(
            item => <TodoItem
                        key={item.id}
                        item={item}
                        handleChange={this.handleChange}
                    />)
    
        return (

            // 1- formating style is set explicitly here for the whole
            // list (the todo-list class - see style.css)
            // 2- The display array of 'TodoItem' is not limited or filter - raw output, a big list...

            // JSX

            <div className="todo-list">
                {todoItems}
            </div>
        )
    }
}

export default App