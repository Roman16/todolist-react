import React, {Component} from 'react';

import CreateTodo from './CreateTodo';
import TodosList from './TodosList';
import axios from 'axios';

import io from 'socket.io-client'

const update = require('immutability-helper');

const apiUrl = 'http://localhost:8080/api/v1/';
const socketUrl = "http://localhost:8080";

const socket = io(socketUrl);

let online = window.navigator.onLine;

class Task {
    constructor(title) {
        this.title = title;
        this.done = false;
    }
}

class App extends Component {
    state = {
        tasks: [],
        newTask: ''
    };

    getTodoList = () => {
        axios.get(apiUrl)
            .then(res => {
                this.setState({
                    tasks: res.data
                })
            })
    };

    save = () => {
        if (!online) {
            localStorage.setItem('todoList', JSON.stringify(this.state.tasks));
        }
    };

    add = () => {
        let task = new Task(this.state.newTask);
       if(online) axios.post(apiUrl, task)
            .then(res => {
                socket.emit('GET_TASKS');
            })
            .catch(error => {
                console.log(error)

            });
        this.setState({
            tasks: [...this.state.tasks, task],
            newTask: ''
        }, () => {
            this.save();
        });

    };


    updateTusk = (id, task, done) => {
        let targetTask = {};
        let updateTusk = this.state.tasks.map((item) => {
            if (id === item._id) {
                targetTask = item;
                item.title = task ? task : item.title;
                item.done = done ? !item.done : item.done;
            }
            return item;
        });

        axios.put(apiUrl, targetTask)
            .then(() => {
                socket.emit('GET_TASKS');
            })
            .catch(error => {
                console.log(error)
            });

        this.setState({
            tasks: updateTusk
        }, () => {
            this.save();
        });
    };

    deleteTask = id => {
        let newList = this.state.tasks.filter((item) => {
            return item._id !== id;
        });

        axios.delete(apiUrl, {data: {id: id}})
            .then(res => {
                socket.emit('GET_TASKS');
            })
            .catch(error => {
                console.log(error)
            });

        this.setState({
            tasks: newList
        }, () => {
            this.save();
        });
    };

    moveCard = (dragIndex, hoverIndex) => {
        const dragCard = this.state.tasks[dragIndex];
        this.setState(
            update(this.state, {
                tasks: {
                    $splice: [[dragIndex, 1], [hoverIndex, 0, dragCard]],
                },
            }), () => {
                axios.post(apiUrl + 'moveCard', this.state.tasks)
                    .then((res) => {
                        socket.emit('GET_TASKS');
                    });

                this.save();
            })
    };

    componentDidMount() {
        let offlineTodoList = JSON.parse(localStorage.getItem('todoList')) || [];

        if (online && offlineTodoList.length > 0) {
            axios.post(apiUrl + 'moveCard', offlineTodoList)
                .then(() => {
                    this.getTodoList();
                    localStorage.clear();
                })
        } else if(!online) {
            this.setState({tasks: offlineTodoList || []})
        }

        socket.on('connect', () => {
            console.log("Connected");

            socket.on('SHOW_TASKS', this.getTodoList);
        });
        this.getTodoList();
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
                    edit={this.updateTusk}
                    rm={this.deleteTask}
                    moveCard={this.moveCard}
                />
            </div>
        )
    }
}

export default App;