import React, { Component } from 'react';
import { connect } from 'react-redux';
import { changeStyle } from '../actions/style_actions';
import { Link } from 'react-router-dom';

let theme = null;

class StyleInjector extends Component {
	render(){
		if(theme) {
			theme.unuse();
		}
		theme = require('../../res/css/' + this.props.style + '.sass');
		theme.use();
		return(
			<div></div>
		)
	}
}

function mapStateToProps(state){
	return {
		style: state.style
	}
}

export default connect(mapStateToProps, { changeStyle })(StyleInjector);