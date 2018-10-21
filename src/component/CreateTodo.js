import React from 'react';

const CreateTodo = (props) => {

    return (
        <div className='create-block'>
                <input
                    type="text"
                    placeholder='New Task'
                    value={props.task}
                    onChange={props.change}
                />
                <button
                    type='button'
                    onClick={props.add}
                    className='btn'
                >
                    Add
                </button>
        </div>

    )
};

export default CreateTodo;