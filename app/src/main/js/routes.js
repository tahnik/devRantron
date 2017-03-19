import React, { Component } from 'react';
import ViewItem from './containers/show_list_item';

import Header from './components/header';
import Main from './components/main';

import SideNav from './containers/side_nav';

import {
	HashRouter as Router,
	Route,
} from 'react-router-dom';

export default class extends Component {
	componentDidMount() {
		$(".button-collapse").sideNav({
			menuWidth: 270
		});
	}
	render() {
		return (
			<Router>
				<div>
					<Header />
					<SideNav />
				</div>
			</Router>
		)
	}
}