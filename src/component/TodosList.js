import React from 'react';

import TodoTask from './TodoTask';

const TodosList = (props) => {
    return (
        <div className='list-tasks'>
            {props.list.map((item, index) => {
                return <TodoTask key={index} task={item}/>
            })}
        </div>
    )
};

export default TodosList;