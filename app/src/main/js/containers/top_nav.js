import React, { Component } from 'react';
import { connect } from 'react-redux';
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

export default TopNav;