import React from 'react';
import Card from './TodoTask';
import HTML5Backend from 'react-dnd-html5-backend'
import {DragDropContext} from 'react-dnd'


const TodoList = (props) => {
    return (
        <div className='list-tasks'>
            {props.list.map((item, i) => (
                <Card
                    key={item.id}
                    index={i}
                    id={item.id}
                    task={item}
                    done={item.done}
                    moveCard={props.moveCard}
                    toggle={props.toggle}
                    edit={props.edit}
                    rm={props.rm}
                />
            ))}
        </div>
    );
};

export default DragDropContext(HTML5Backend)(TodoList);
