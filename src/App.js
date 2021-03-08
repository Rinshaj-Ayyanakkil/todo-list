import "./App.css";
import { Component } from "react";
import Input from "./components/Input";
import Todo from "./components/Todo";
import Filter from "./components/Filter";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { library } from "@fortawesome/fontawesome-svg-core";
import { faTrashAlt } from "@fortawesome/free-solid-svg-icons";
import { faCheckSquare } from "@fortawesome/free-solid-svg-icons";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
library.add(faTrashAlt);
library.add(faCheckSquare);
library.add(faPlus);

class App extends Component {
	state = {
		todos: [],
		filterType: "All",
		isAllFinished: false,
	};

	componentDidMount() {
		let data = localStorage.getItem("state")
			? localStorage.getItem("state")
			: JSON.stringify(this.state);
		this.setState(JSON.parse(data));
	}

	componentDidUpdate() {
		localStorage.setItem("state", JSON.stringify(this.state));
	}

	addTodo = (newTodo) => {
		this.setState({
			todos: [...this.state.todos, newTodo],
		});
	};

	toggleFinished = (id) => {
		this.setState({
			todos: this.state.todos.map((todo) => {
				return todo.id === id
					? {
							...todo,
							isFinished: !todo.isFinished,
					  }
					: todo;
			}),
		});
	};

	toggleAll = () => {
		this.setState({
			isAllFinished: !this.state.isAllFinished,
			todos: this.state.todos.map((todo) => {
				return { ...todo, isFinished: !this.state.isAllFinished };
			}),
		});
	};

	deleteTodo = (id) => {
		this.setState({
			todos: this.state.todos.filter((todo) => todo.id !== id),
		});
	};

	handleFilterChange = (value) => {
		this.setState({
			filterType: value,
		});
	};

	filterList() {
		return this.state.todos.filter((todo) =>
			this.state.filterType === "All"
				? todo
				: this.state.filterType === "Active"
				? !todo.isFinished
				: todo.isFinished
		);
	}

	clearList = () => {
		if (window.confirm(`Are you sure?`)) {
			this.setState({
				todos: this.state.todos.filter((todo) => !this.filterList().includes(todo)),
			});
		}
	};

	render() {
		return (
			<div
				style={{
					margin: " 0 auto",
					textAlign: "center",
				}}
			>
				<h1>To-Do List</h1>
				<Input onSubmit={this.addTodo} />
				<div>
					<Filter onChange={this.handleFilterChange} value={this.state.filterType} />
					{this.filterList().length ? (
						<button className="btn btn-danger" onClick={this.clearList}>
							Clear All
							<FontAwesomeIcon icon="trash-alt" />
						</button>
					) : null}

					{this.state.todos.length ? (
						<button className="btn" onClick={this.toggleAll}>
							Mark All as Finished
							<FontAwesomeIcon icon="check-square" />
						</button>
					) : null}
				</div>
				<div
					style={{
						width: "fit-content",
						overflowWrap: "anywhere",
						padding: "10px",
					}}
				>
					{this.filterList().map((todo) => (
						<Todo
							key={todo.id}
							todo={todo}
							toggleFinished={() => this.toggleFinished(todo.id)}
							deleteTodo={() => this.deleteTodo(todo.id)}
						/>
					))}
				</div>
			</div>
		);
	}
}

export default App;
