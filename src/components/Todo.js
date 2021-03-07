import "../App.css";
import { Component } from "react";

export default class Item extends Component {
	state = {
		visible: false,
	};

	finishedTodoStyle = {
		textDecoration: "line-through",
		fontStyle: "italic",
		color: "#ddd",
	};

	toggleCross = () => {
		this.setState({
			visible: !this.state.visible,
		});
	};

	render() {
		return (
			<div
				className="todo"
				onMouseLeave={this.toggleCross}
				onMouseEnter={this.toggleCross}
			>
				<div
					style={this.props.todo.isFinished ? this.finishedTodoStyle : {}}
					onClick={this.props.toggleFinished}
				>
					{this.props.todo.text}
				</div>
				{this.state.visible ? (
					<button onClick={this.props.deleteTodo}>x</button>
				) : null}
			</div>
		);
	}
}
