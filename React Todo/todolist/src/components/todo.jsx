import React, { Component } from 'react';
import { connect } from 'react-redux';
import { deleteTodoAction } from '../actions/deleteTodoAction';
import { bindActionCreators } from 'redux';

class Todo extends Component {
    render() {
        return (
            <div className='items'>
                <p >{this.props.item.name}</p>
                <button className="button2" onClick={() => this.props.deleteTodoById(this.props.index)}>&#10006;</button>
            </div>
        );
    }
}

const mapDistachToProps = () => dispatch => {
    return bindActionCreators({ deleteTodoById: deleteTodoAction }, dispatch);
};

export default connect(null, mapDistachToProps)(Todo);
