import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getListItem } from '../actions/list_actions';
import { Link } from 'react-router-dom';

class SideNav extends Component {
	constructor(props) {
		super(props);
		this.state = {
			sideNavHidden: true
		}
	}
	componentDidMount() {
		let nav = document.getElementById("togglable_nav");
		nav.style.webkitTransform = 'translateX(-100%)';
	}
	toggleNav() {
		if(this.state.sideNavHidden) {
			this.showNav();
		} else {
			this.hideNav();
		}
		this.setState({ sideNavHidden: !this.state.sideNavHidden });
	}
	hideNav() {
		let nav = document.getElementById("togglable_nav");
		nav.style.webkitTransform = 'translateX(-100%)';
	}
	showNav() {
		let nav = document.getElementById("togglable_nav");
		nav.style.webkitTransform = 'translateX(0)';
	}
	render(){
		return(
			<div>
				<div className="togglable_side_nav" id="togglable_nav">
					<ul>
						<li>
							<Link to={'/'} className="btn side_nav_toggle" >
								Rant feed
							</Link>
						</li>
						<li>
							<Link to={'/'} className="btn side_nav_toggle" >
								Collabs
							</Link>
						</li>
						<li>
							<Link to={'/'} className="btn side_nav_toggle" >
								Stories
							</Link>
						</li>
						<li>
							<Link to={'/'} className="btn side_nav_toggle" >
								Settings
							</Link>
						</li>
					</ul>
				</div>
				<div className="static_side_nav">
					<button onClick={() => this.toggleNav()} 
					className="btn side_nav_toggle" >
						<i className="ion-navicon-round"></i>
					</button>
					<ul>
						<li>
							<Link to={'/'} className="btn side_nav_toggle" >
								<i className="ion-chatbubble"></i>
							</Link>
						</li>
						<li>
							<Link to={'/'} className="btn side_nav_toggle" >
								<i className="ion-chatbubbles"></i>
							</Link>
						</li>
						<li>
							<Link to={'/'} className="btn side_nav_toggle" >
								<i className="ion-ios-book"></i>
							</Link>
						</li>
						<li>
							<Link to={'/'} className="btn side_nav_toggle" >
								<i className="ion-ios-gear"></i>
							</Link>
						</li>
					</ul>
				</div>
			</div>
		)
	}
}

function mapStateToProps(state){
	return {
		item: state.lists.item
	}
}

export default connect(mapStateToProps, { getListItem })(SideNav);
