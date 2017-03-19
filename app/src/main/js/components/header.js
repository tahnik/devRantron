import React, { Component } from 'react';
import TopNav from '../containers/top_nav';

class Header extends Component {
	render(){
		return(
			<div className="header">
				<TopNav />
			</div>
		)
	}
}

export default Header;
