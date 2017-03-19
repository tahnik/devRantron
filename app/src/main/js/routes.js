import React, { Component } from 'react';
import ViewItem from './containers/show_list_item';

import Header from './components/header';
import Main from './components/main';

import {
  HashRouter as Router,
  Route,
} from 'react-router-dom';

export default class extends Component {
	render() {
		return (
			<Router>
				<div>
					<Header />
					<Route exact path="/" component={Main} />
					<Route path="/view/:name" component={ViewItem} />
				</div>
			</Router>
		)
	}
}