import React from "react"


function TodoItem(props) {

    // Conditional styling:
    // The style for a completed to do

    const completedStyle = {
        fontStyle: "italic",
        color: "#cdcdcd",
        textDecoration: "line-through"
    }

    // JSX 

    return (
        // two elements will be shown: INPUT & PARAGRAPH
        <div className="todo-item">

            <input 
                type="checkbox" 
                checked={props.item.completed} 
                onChange={() => props.handleChange(props.item.id)}
            />

            <p style={props.item.completed ? completedStyle : null}>{props.item.text}</p>

        </div>
    )
}

export default TodoItem