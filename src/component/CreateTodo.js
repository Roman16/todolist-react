import React from 'react';

const CreateTodo = (props) => {


    return (
        <div className='create=block'>
            <h2>Create new task</h2>
                <input
                    type="text"
                    placeholder='New Task'
                    value={props.task}
                    onChange={props.change}
                />
                <button type='button' onClick={props.add}>add</button>
        </div>

    )
};

export default CreateTodo;