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
		$(".button-collapse").sideNav();
	}
	render() {
		return (
			<Router>
				<div>
					<ul id="slide-out" className="side-nav">
						<li>
							<div className="userView">
								<a href="#!name">
									<span className="white-text name">John Doe</span>
								</a>
								<a href="#!email">
									<span className="white-text email">jdandturk@gmail.com</span>
								</a>
							</div>
						</li>
						<li>
							<a href="#!">
								<i className="material-icons">cloud</i>
								First Link With Icon
            </a>
						</li>
						<li>
							<a href="#!">Second Link</a>
						</li>
						<li>
							<div className="divider"></div>
						</li>
						<li>
							<a className="subheader">Subheader</a>
						</li>
						<li>
							<a className="waves-effect" href="#!">Third Link With Waves</a>
						</li>
					</ul>
					<a href="#" data-activates="slide-out" className="button-collapse btn">
						<i className="material-icons">menu</i>
					</a>
				</div>
			</Router>
		)
	}
}