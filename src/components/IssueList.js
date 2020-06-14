import React from 'react'

class IssueFilter extends React.Component {
	render() {
		return (
			<div>This is a placeholder for the issue Filter</div>
		)
	}
}

class IssueTable extends React.Component {
	render() {
		const rowStyle = {border: '1px solid silver', padding: 4}
		return (
			<table style={{borderCollapse: 'collapse'}}>
				<thead>
					<tr>
						<th style={rowStyle}>ID</th>
						<th style={rowStyle}>Title</th>
					</tr>
				</thead>
				<tbody>
					<IssueRow rowStyle={rowStyle} issue_id={123} issue_title="title of second issue"/>
					<IssueRow rowStyle={rowStyle} issue_id={456} issue_title="title of first issue"/>
				</tbody>
			</table>
		)
	}
}
class BoarderWrap extends React.Component{
	render(){
		const boarderStyle = {border: '1px solid silver', padding: 6}
		return(
			<div style={boarderStyle}>
				{this.props.children}
			</div>
		)
	}
}

class IssueRow extends React.Component {
	render() {
		const style = this.props.rowStyle
		return (
			<tr>
				<td style={style}>{this.props.issue_id}</td>
        <td style={style}>{this.props.issue_title}</td>
			</tr>
		)
	}
}
class IssueAdd extends React.Component {
	render() {
		return (
			<div>This is a placeholder for form to add an issue</div>
		)
	}
}

class IssueList extends React.Component {
	render() {
		return (
			<React.Fragment>
				<h1>issue tracker</h1>
				<IssueFilter />
				<hr />
				<IssueTable />
				<hr />
				<IssueAdd />
			</React.Fragment>
		)
	}
}

export default IssueList