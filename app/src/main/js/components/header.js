import React, { Component } from 'react';
import TopNav from '../containers/top_nav';
import StyleInjector from '../containers/style_injector';

class Header extends Component {
	render(){
		return(
			<div className="header">
				<TopNav />
				<StyleInjector />
			</div>
		)
	}
}

export default Header;
