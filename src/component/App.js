import React, {Component} from 'react';

import CreateTodo from './CreateTodo';
import TodosList from "./TodosList";

const update = require('immutability-helper');


class Task {
    constructor(title) {
        this.title = title;
        this.done = false;
    }
}

class App extends Component {
    state = {
        tasks: [
            {
                id: 1,
                title: 'Task-1',
                done: false
            },
            {
                id: 2,
                title: 'Task-2',
                done: true
            },
            {
                id: 3,
                title: 'Task-3',
                done: false
            },
            {
                id: 4,
                title: 'Task-4',
                done: false
            },
            {
                id: 5,
                title: 'Task-55',
                done: true
            },
        ],
        newTask: ''
    };

    add = () => {
        let task = new Task(this.state.newTask);
        this.setState({tasks: [...this.state.tasks, task], newTask: ''});
    };

    finishedTask = id => {
        console.log(id);
        let doneTusk = this.state.tasks.map((item, index) => {
            if (id === index) item.done = !item.done;
            return item;
        });

        this.setState({
            tasks: doneTusk
        });
        console.log(this.state.tasks);
    };

    updateTusk = (id, task) => {
        let updateTusk = this.state.tasks.map((item, index) => {
            if (id === index) item.title = task;
            return item;
        });

        this.setState({
            tasks: updateTusk
        });
        console.log(this.state.tasks);
    };

    deleteTask = id => {
        let newList = this.state.tasks;
        newList.splice(id, 1);
        this.setState({
            tasks: newList
        });
    };

    moveCard = (dragIndex, hoverIndex) => {
        const dragCard = this.state.tasks[dragIndex];

        this.setState(
            update(this.state, {
                tasks: {
                    $splice: [[dragIndex, 1], [hoverIndex, 0, dragCard]],
                },
            }),
        )
    };

    render() {
        return (
            <div className='todo-app'>
                <CreateTodo
                    add={this.add}
                    task={this.state.newTask}
                    change={e => this.setState({newTask: e.target.value})}
                />

                <TodosList
                    list={this.state.tasks}
                    toggle={this.finishedTask}
                    edit={this.updateTusk}
                    rm={this.deleteTask}
                    moveCard={this.moveCard}
                />
            </div>
        )
    }
}

export default App;