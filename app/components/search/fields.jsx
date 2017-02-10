import React, { Component } from 'react';
import AdvancedFields from './advanced-fields.jsx';
import { connect } from 'react-redux';
import { createAction } from '../../utils';
import { SEARCH } from '../../constants';

import '../../styles/search.styl';
import t from '../../i18n';

class Fields extends Component {
	constructor(props) {
		super(props);
	}
	_toggleAdvanced() {
		this.props.toggleAdvancedAction({})
	}
	_fieldChangeSimple(ev) {
		this.props.simpleFieldValueChange({ value: ev.target.value })
	}
	_submitSimple() {
		this.props.simpleSearchSubmit({ value: this.props.fieldValueSimple })
	}
	render() {
	    return <div className="search">
	    	<form className="basic-search" onSubmit={() => this._submitSimple()}>
	        	<input type="search" placeholder={t('search-for-a-game')} onChange={(ev) => this._fieldChangeSimple(ev)} />
	        	{this.props.fieldValueSimple && <button type="submit" />}
	        	{!this.props.advancedSearchVisible && 
	        		<a onClick={() => this._toggleAdvanced()} className="trigger-advanced">{t('advanced-search')}</a>}
	        </form>
	        <AdvancedFields visible={this.props.advancedSearchVisible} />
	    </div>;
	}
}

const mapStateToProps = state => ({
    advancedSearchVisible: state.search.advancedVisible,
    fieldValueSimple: state.search.fieldValueSimple
});

const mapDispatchToProps = {
    simpleFieldValueChange: createAction(SEARCH.CHANGEDSIMPLE),
    simpleSearchSubmit: createAction(SEARCH.SUBMITTEDSIMPLE),
    toggleAdvancedAction: createAction(SEARCH.TOGGLEADVANCED)
};

export default connect(mapStateToProps, mapDispatchToProps)(Fields);