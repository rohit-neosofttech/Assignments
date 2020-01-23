import React, { Component } from 'react'
import TodoList from '../components/todoList';
import AddTodo from '../components/addTodo';

export class ReduxTodoList extends Component {
    render() {
        return (
            <div className="card">
                <label>Redux To-do List</label>
                <TodoList />
                <AddTodo className="search" />
            </div>
        )
    }
}

export default ReduxTodoList
