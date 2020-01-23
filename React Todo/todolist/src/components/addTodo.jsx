import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { addTodoAction } from '../actions/addTodoAction';

class AddTodo extends Component {
    addTodo(event) {
        if (event.key === 'Enter') {
            this.props.addTodo({ name: event.target.value });
            event.target.value = null;
        }
    }

    render() {
        return (
            <div>
                <input type="text" className="search" ref="task" onKeyDown={event => this.addTodo(event)} />
                {/* <button>Add Item</button> */}
            </div>
            
        );
    }
}

const mapDistachToProps = () => dispatch => {
    return bindActionCreators({ addTodo: addTodoAction }, dispatch);
};

export default connect(null, mapDistachToProps)(AddTodo);