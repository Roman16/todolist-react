import React from 'react';

const TodoTask = (props) => {
    return (
        <div className='task-block'>
            <div>
                <input type="checkbox"/>
                <span className='title-task'>{props.task}</span>
            </div>
            <div className='button-block'>
                <button>Edit</button>
                <button>Delete</button>
            </div>
        </div>
    )
};

export default TodoTask;