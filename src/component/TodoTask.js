import React, {Component} from 'react';
import {findDOMNode} from 'react-dom';
import {DragSource, DropTarget} from 'react-dnd';
import flow from 'lodash/flow';

const cardSource = {
    beginDrag(props) {
        return {
            id: props.id,
            index: props.index,
        }
    },
};

const cardTarget = {
    hover(props, monitor, component) {
        const dragIndex = monitor.getItem().index;
        const hoverIndex = props.index;

        // Don't replace items with themselves
        if (dragIndex === hoverIndex) {
            return;
        }

        // Determine rectangle on screen
        const hoverBoundingRect = (findDOMNode(
            component,
        )).getBoundingClientRect();

        // Get vertical middle
        const hoverMiddleY = (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;

        // Determine mouse position
        const clientOffset = monitor.getClientOffset();

        // Get pixels to the top
        const hoverClientY = (clientOffset).y - hoverBoundingRect.top;

        if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
            return;
        }

        if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
            return;
        }

        props.moveCard(dragIndex, hoverIndex);

        monitor.getItem().index = hoverIndex;
    },
}

class TodoTask extends Component {
    state = {
        isEditing: false,
        task: this.props.task.title
    };

    check = () => {
        this.props.edit(this.props.id,'', true)
    };

    editTask = () => {
        this.setState({task: this.props.task.title});

        if (this.state.isEditing) {
            this.props.edit(this.props.id, this.state.task);
            this.setState({isEditing: !this.state.isEditing})
        } else {
            this.setState({isEditing: !this.state.isEditing})
        }
    };

    deleteTask = () => {
        this.props.rm(this.props.id);
    };

    renderTask() {
        if (this.state.isEditing) {
            return (
                <input
                    type="text"
                    className='title-task'
                    value={this.state.task}
                    onChange={e => this.setState({task: e.target.value})}
                />
            )
        } else {
            return (
                <span className={this.props.task.done ? 'finished-task title-task' : 'title-task'}>
                   {this.props.task.title}
                 </span>
            )
        }
    };

    render() {
        const {
            isDragging,
            connectDragSource,
            connectDropTarget,
        } = this.props;
        const opacity = isDragging ? 0 : 1;

        return (
            connectDragSource &&
            connectDropTarget &&
            connectDragSource(
                connectDropTarget(
                        <div className='task-block'  style={{opacity }}>
                        <div className='d-flex'>
                            <input
                                type="checkbox"
                                checked={this.props.done}
                                onChange={this.check}
                            />

                            {this.renderTask()}
                        </div>

                        <div className='button-block'>
                            <button className='btn' onClick={this.editTask}>
                                {this.state.isEditing ? 'Save' : 'Edit'}
                            </button>
                            <button className='btn' onClick={this.deleteTask}>Delete</button>
                        </div>
                    </div>
                )
            )
        )
    }
}

export default flow(
    DragSource(
        'card',
        cardSource,
        (connect, monitor) => ({
            connectDragSource: connect.dragSource(),
            isDragging: monitor.isDragging(),
        }),
    ),
    DropTarget('card', cardTarget, (connect) => ({
        connectDropTarget: connect.dropTarget(),
    }))
)(TodoTask);

