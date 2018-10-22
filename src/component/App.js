import React, {Component} from 'react';

import CreateTodo from './CreateTodo';
import TodosList from './TodosList';
import axios from 'axios';

const update = require('immutability-helper');


class Task {
    constructor(title) {
        this.id = new Date().getTime();
        this.title = title;
        this.done = false;
    }
}

class App extends Component {
    state = {
        tasks: [],
        newTask: ''
    };

    save = () => {
        localStorage.setItem('todoList', JSON.stringify(this.state.tasks))
    };

    add = () => {
        let task = new Task(this.state.newTask);
        this.setState({
                tasks: [...this.state.tasks, task],
                newTask: ''
            },
            () => this.save());
    };

    finishedTask = id => {
        let doneTusk = this.state.tasks.map((item, index) => {
            if (id === index) item.done = !item.done;
            return item;
        });
        this.setState({
                tasks: doneTusk
            },
            () => this.save());
    };

    updateTusk = (id, task) => {
        let updateTusk = this.state.tasks.map((item, index) => {
            if (id === index) item.title = task;
            return item;
        });
        this.setState({
                tasks: updateTusk
            },
            () => this.save());
    };

    deleteTask = id => {
        let newList = this.state.tasks;
        newList.splice(id, 1);
        this.setState({
                tasks: newList
            },
            () => this.save());
    };

    moveCard = (dragIndex, hoverIndex) => {
        const dragCard = this.state.tasks[dragIndex];
        this.setState(
            update(this.state, {
                tasks: {
                    $splice: [[dragIndex, 1], [hoverIndex, 0, dragCard]],
                },
            }),
            () => this.save());
    };

    componentDidMount() {
        axios.get('http://localhost:8080/api/');

        let pastList = JSON.parse(localStorage.getItem('todoList')) || [];

        this.setState({
            tasks: pastList
        })
    }

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