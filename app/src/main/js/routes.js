import React, { Component } from 'react';
import ViewItem from './containers/show_list_item';

import Header from './components/header';
import Main from './components/main';

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
					<ul id="slide-out" className="side-nav">
						<li>
							<a href="#!">Rant Feed</a>
						</li>
						<li>
							<a href="#!">Collabs</a>
						</li>
						<li>
							<a href="#!">Stories</a>
						</li>
						<li>
							<a href="#!">Settings</a>
						</li>
					</ul>
					<a 
					href="#" data-activates="slide-out"
					className="button-collapse btn">
						<i className="ion-navicon-round"></i>
					</a>
				</div>
			</Router>
		)
	}
}