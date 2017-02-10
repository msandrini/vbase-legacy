import React, { Component } from 'react';

class AdvancedFields extends Component {
	constructor(props) {
		super(props);
	}
	render() {
		return <form className={'advanced-search' + (this.props.visible?'':' hidden')}>
	        <input type="search" />
	    </form>
	}

}

export default AdvancedFields;