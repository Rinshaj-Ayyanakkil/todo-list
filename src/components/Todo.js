import "../App.css";
import { Component } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default class Item extends Component {
	state = {
		showDetais: false,
	};

	finishedTodoStyle = {
		textDecoration: "line-through",
		fontStyle: "italic",
		color: "#ddd",
	};

	handleChange = (event) => {
		this.props.onChange(event.target.name, event.target.value);
	};

	render() {
		return (
			<div className="todo">
				<div style={{ backgroundColor: "#fff000", padding: "5px", margin: "5px" }}>
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
					<input
						style={this.props.todo.isFinished ? this.finishedTodoStyle : {}}
						type="text"
						name="text"
						onChange={this.handleChange}
						value={this.props.todo.text}
					/>
					<p>
						{Math.floor((Date.now() - this.props.todo.datetime) / (1000 * 60))}{" "}
						minutes ago
					</p>
				</div>

				<div
					style={{ padding: "10px", backgroundColor: "#ff0000" }}
					onClick={this.props.deleteTodo}
				>
					<FontAwesomeIcon icon="trash-alt" />
				</div>

				<div
					style={{ padding: "10px", backgroundColor: "#fff000" }}
					onClick={() =>
						this.setState({
							showDetais: !this.state.showDetais,
						})
					}
				>
					<FontAwesomeIcon
						icon={this.state.showDetais ? "caret-up" : "caret-down"}
					/>
				</div>

				{this.state.showDetais ? (
					<div style={{ display: "block" }}>
						<div>
							<label style={this.props.todo.isFinished ? this.finishedTodoStyle : {}}>
								Notes:
								<br />
								<textarea
									style={this.props.todo.isFinished ? this.finishedTodoStyle : {}}
									name="notes"
									rows="5"
									value={this.props.todo.notes}
									onChange={this.handleChange}
								></textarea>
							</label>
						</div>
						<div>
							<label style={this.props.todo.isFinished ? this.finishedTodoStyle : {}}>
								Due:
								<br />
								<input
									style={this.props.todo.isFinished ? this.finishedTodoStyle : {}}
									type="date"
									name="due"
									value={this.props.todo.due}
									onChange={this.handleChange}
								/>
							</label>
						</div>
					</div>
				) : null}
			</div>
		);
	}
}
