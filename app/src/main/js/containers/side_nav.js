import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { ROUTES } from '../routes';
import { changeStyle } from '../actions/style_actions';


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
		console.log("HEllo there")
		this.props.changeStyle('LIGHT_THEME');
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
							<Link to={ROUTES.root} className="btn" >
								Rant feed
							</Link>
						</li>
						<li>
							<Link to={ROUTES.collabs} className="btn" >
								Collabs
							</Link>
						</li>
						<li>
							<Link to={ROUTES.stories} className="btn" >
								Stories
							</Link>
						</li>
						<li>
							<Link to={ROUTES.settings} className="btn" >
								Settings
							</Link>
						</li>
					</ul>
				</div>
				<div className="static_side_nav">
					<button onClick={() => this.toggleNav()} 
					onBlur={() => this.toggleNav()}
					className="btn side_nav_toggle" >
						<i className="ion-navicon-round"></i>
					</button>
					<ul>
						<li>
							<Link to={ROUTES.root} className="btn" >
								<i className="ion-chatbubble"></i>
							</Link>
						</li>
						<li>
							<Link to={ROUTES.collabs} className="btn" >
								<i className="ion-chatbubbles"></i>
							</Link>
						</li>
						<li>
							<Link to={ROUTES.stories} className="btn" >
								<i className="ion-ios-book"></i>
							</Link>
						</li>
						<li>
							<Link to={ROUTES.settings} className="btn" >
								<i className="ion-ios-gear"></i>
							</Link>
						</li>
					</ul>
				</div>
			</div>
		)
	}
}

export default connect(null, { changeStyle })(SideNav);