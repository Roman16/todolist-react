import React, {Component} from 'react';

import CreateTodo from './CreateTodo';
import TodosList from "./TodosList";


class App extends Component {
    state = {
        tasks: [
            'Task-1',
            'Task-2',
            'Task-3',
            'Task-4',
            'Task-5',
        ],
        newTask: ''
    };

    add = () => {
        this.setState({tasks: [...this.state.tasks, this.state.newTask], newTask: ''});
    };

    changeInput = (e) => {
        this.setState({newTask: e.target.value})
    };

    render() {
        return (
            <div className='todo-app'>
                <CreateTodo
                    add={this.add}
                    task={this.state.newTask}
                    change={this.changeInput}
                />

                <TodosList list={this.state.tasks}/>
            </div>
        )
    }
}

export default App;