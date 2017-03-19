import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getListItem } from '../actions/list_actions';
import { Link } from 'react-router-dom';

class ShowListItem extends Component {
	componentDidMount(){
		this.props.getListItem(this.props.match.params.name);
	}
	render(){
		const { item } = this.props;
		if(!item) {
			return (<div>Loading...</div>)
		}

		return(
			<div className="row" >
				<div className="col s12 m4 offset-m4" >
					<Link to={"/"}>
						<button 
						type="button" 
						className="waves-effect waves-light btn" 
						style={{ marginTop: 10, marginBottom: 10 }}>
						Go Back
						</button>
					</Link>
					<h3>{ item.name }</h3>
					<p>{ item.description }</p>
				</div>
			</div>
		)
	}
}

/*
 This is a redux specific function.
 What is does is: It gets the state specified in here from the global redux state.
 For example, here we are retrieving the list of items from the redux store.
 Whenever this list changes, any component that is using this list of item will re-render.
 */
function mapStateToProps(state){
	return {
		item: state.lists.item
	}
}

/*
 Here we are creating a Higher order component
 https://facebook.github.io/react/docs/higher-order-components.html
 */
export default connect(mapStateToProps, { getListItem })(ShowListItem);
