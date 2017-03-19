import React, { Component } from 'react';
import StaticSideNav from '../containers/static_side_nav';
import TopNav from '../containers/top_nav';

class Header extends Component {
	render(){
		return(
			<div className="header">
				<TopNav />
				<StaticSideNav />
			</div>
		)
	}
}

export default Header;
