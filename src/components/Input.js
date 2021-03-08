import "../App.css";
import { Component } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default class Input extends Component {
	state = {
		inputText: "",
		placeholder: "Enter your To-Do here",
		error: false,
	};

	handleInput = (event) => {
		this.setState({ inputText: event.target.value });
	};

	validate = (field) => {
		const isValid = field !== "";
		this.setState({ error: !isValid });
		return isValid;
	};

	handleSubmit = (event) => {
		event.preventDefault();
		if (this.validate(this.state.inputText)) {
			this.props.onSubmit({
				id: Math.random(),
				text: this.state.inputText,
				isFinsihed: false,
				datetime: Date.now(),
			});
		}
		this.setState({ inputText: "" });
	};

	render() {
		return (
			<div>
				<form onSubmit={this.handleSubmit}>
					<div>
						<input
							value={this.state.inputText}
							onChange={this.handleInput}
							placeholder={this.state.placeholder}
						/>
						<button className="btn" type="submit">
							<FontAwesomeIcon icon="plus" />
						</button>
					</div>
					{this.state.error ? (
						<p style={{ color: "#ff0000" }}>To-Do Cannot be Empty!</p>
					) : null}
				</form>
			</div>
		);
	}
}
