import React, { Component } from "react";
import "./App.css";
import ModalView from "./Components/ModalView";
import InputItem from "./Components/InputItem"
import TodoList from "./Components/TodoList";
import ModalToDoViewDetails from "./Components/ModalToDoDetailsView";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isModalOpen: false,
      title: "",
      description: "",
      allTodos: JSON.parse(localStorage.getItem("todos")) || [],
      showTodoType: "all",
      searchTerm: "",
      showDetailsModal: false,
      showDetailsOf: "",
      isEdittable:false
    };
  }

  onTitleChange = title => {
    this.setState({ title });
  };

  onDescChange = description => {
    this.setState({ description });
  };

  toggleModal = () => {
    this.setState({ isModalOpen: !this.state.isModalOpen });
  };

  resetData = () => {
    this.setState({ title: "", description: "" });
  };

  completedToDo = id => {
    const { allTodos } = this.state;
    const todoIndex = this.state.allTodos.findIndex(todo => todo.id === id);
    allTodos[todoIndex].completed = true;
    this.updateTodo(allTodos);
    this.updateLocalStorage(allTodos);
  };

  addTodo = () => {
    let todosList = [];
    let todoItem = {};
    const { title, description } = this.state;
    if (!title) return;
    const previousList = JSON.parse(localStorage.getItem("todos"));
    if (previousList !== "" && Array.isArray(previousList)) {
      todosList = [...previousList];
    }
    const d = new Date();
    const id = d.valueOf();
    todoItem = { id: id, title, description, completed: false };
    todosList.push(todoItem);
    this.updateLocalStorage(todosList);
    this.updateTodo(todosList);
    this.toggleModal();
    this.resetData();
  };

  updateTodo = allTodos => {
    this.setState({ allTodos });
  };

  updateLocalStorage = todoList => {
    localStorage.setItem("todos", JSON.stringify(todoList));
  };

  deleteTodo = id => {
    const newList = this.state.allTodos.filter(todos => todos.id !== id);
    this.updateLocalStorage(newList);
    this.updateTodo(newList);
  };

  todosToShow = type => {
    this.setState({ showTodoType: type });
  };

  fiilerTodosToShow = type => {
    const { allTodos } = this.state;
    switch (type) {
      case "completed":
        return allTodos.filter(todo => todo.completed === true);
      case "pending":
        return allTodos.filter(todo => todo.completed === false);
      default:
        return allTodos;
    }
  };

  filterWithSearchTerm = (searchTerm, todoList) => {
    const pattern = new RegExp(`^.*${searchTerm}.*$`);
    return todoList.filter(item => {
      if (pattern.test(item.title) || pattern.test(item.description)) {
        return item;
      }
    });
  };

  todoToView = id => {
    const { allTodos } = this.state;
    const detailsToShow = allTodos.filter(todo => todo.id === id);
    this.setState({
      showDetailsModal: !this.state.showDetailsModal,
      showDetailsOf: detailsToShow
    });
  };

  todoToEdit = id => {
    const { allTodos } = this.state;
    const detailsToShow = allTodos.filter(todo => todo.id === id);
    this.setState({
      showDetailsModal: !this.state.showDetailsModal,
      showDetailsOf: detailsToShow
    });
  };

  render() {
    const {
      title,
      showTodoType,
      searchTerm,
      showDetailsModal,
      showDetailsOf
    } = this.state;

    const listOfTodos = this.filterWithSearchTerm(
      searchTerm,
      this.fiilerTodosToShow(showTodoType)
    );

    return (
      <>
        <div className="card">
          <InputItem title={title} onTitleChange={this.onTitleChange} add={this.addTodo} />
          <TodoList
            todos={listOfTodos}
            deleteTodo={this.deleteTodo}
            completedToDo={this.completedToDo}
            isEdittable={this.isEdittable}
          />
          <ModalView isVisible={showDetailsModal}>
            <ModalToDoViewDetails
              detailsToView={showDetailsOf}
              cancel={() =>
                this.setState({
                  showDetailsModal: !this.state.showDetailsModal
                })
              }
            />
          </ModalView>
        </div>
      </>
    );
  }
}

export default App;
