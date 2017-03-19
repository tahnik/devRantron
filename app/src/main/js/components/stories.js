import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getListItem } from '../actions/list_actions';
import { Link } from 'react-router-dom';

class Stories extends Component {
	render(){
		return(
			<div className="rants">
				<h1>Stories</h1>
			</div>
		)
	}
}

function mapStateToProps(state){
	return {
		item: state.lists.item
	}
}

export default connect(mapStateToProps, { getListItem })(Stories);