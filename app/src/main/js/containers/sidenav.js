import React, {Component} from 'react';
import {connect} from 'react-redux';
import {getListItem} from '../actions/list_actions';
import {Link} from 'react-router-dom';

class ShowListItem extends Component {
		componentDidMount() {
			 $(".button-collapse").sideNav();
		}
		render() {
				return (
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
				)
		}
}

function mapStateToProps(state) {
		return {item: state.lists.item}
}

export default connect(mapStateToProps, {getListItem})(ShowListItem);
