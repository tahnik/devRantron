import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getListItem } from '../actions/list_actions';
import { Link } from 'react-router-dom';

class TopNav extends Component {
	render(){
		return(
			<div className="top_nav">
				<ul >
					<li>
						Recent
					</li>
					<li>
						Algo
					</li>
					<li>
						Top
					</li>
				</ul>
			</div>
		)
	}
}

function mapStateToProps(state){
	return {
		item: state.lists.item
	}
}

export default connect(mapStateToProps, { getListItem })(TopNav);
