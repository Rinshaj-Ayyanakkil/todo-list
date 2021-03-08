import "../App.css";
import { Component } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

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
				<div>
					<input
						checked={this.props.todo.isFinished}
						style={{
							height: "20px",
							width: "20px",
							backgroundColor: "#eee",
						}}
						type="checkbox"
						onChange={this.props.toggleFinished}
					/>
				</div>
				<div style={this.props.todo.isFinished ? this.finishedTodoStyle : {}}>
					{this.props.todo.text}
					<p>
						{Math.floor((Date.now() - this.props.todo.datetime) / (1000 * 60))}{" "}
						minutes ago
					</p>
				</div>

				<div>
					{this.state.visible ? (
						<FontAwesomeIcon icon="trash-alt" onClick={this.props.deleteTodo} />
					) : null}
				</div>
			</div>
		);
	}
}
