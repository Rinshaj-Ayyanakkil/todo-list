import { Component } from "react";
import "../App.css";

export default class Filter extends Component {
	handleChange = (event) => {
		this.props.onChange(event.target.value);
	};

	render() {
		return (
			<select onChange={this.handleChange}>
				<option>All</option>
				<option>Active</option>
				<option>Finished</option>
			</select>
		);
	}
}
