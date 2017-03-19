import React, { Component } from 'react';
import SideNav from '../containers/sidenav';

class Header extends Component {
	render(){
		return(
			<div style={{ marginTop: 20 }}>
				<h1>React Redux Router</h1>
				<SideNav />
			</div>
		)
	}
}

export default Header;
