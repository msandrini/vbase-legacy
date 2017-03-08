import React, { Component } from 'react'
import AdvancedFields from './advanced-fields.jsx'
import { connect } from 'react-redux'
import { createAction } from '../../utils'
import { SEARCH } from '../../constants'

import './_main.styl'
import t from '../../i18n'
import Icon from '../shared/icon.jsx'

class Fields extends Component {
	constructor(props) {
		super(props)
		this._toggleAdvanced = this._toggleAdvanced.bind(this)
		this._fieldChangeSimple = this._fieldChangeSimple.bind(this)
		this._submitSimple = this._submitSimple.bind(this)
		this._submitAdvanced = this._submitAdvanced.bind(this)
	}
	_toggleAdvanced() {
		this.props.toggleAdvancedAction({})
		if (!this.props.advancedSearchVisible) {
			document.getElementById('simpleSearchValue').value = ''
		}
	}
	_fieldChangeSimple(ev) {
		this.props.simpleFieldValueChange({ value: ev.target.value })
	}
	_submitSimple(ev) {
		ev.preventDefault()
		this.props.simpleSearchSubmit({ value: this.props.fieldValueSimple })
	}
	_submitAdvanced(data) {
		this.props.advancedSearchSubmit({ data })
	}
	render() {
		const { advancedSearchVisible, fieldValueSimple } = this.props
		return <div className="search">
			<form className="basic-search" onSubmit={this._submitSimple}>
				<input type="search" placeholder={t(advancedSearchVisible ? 'search-for-a-game-below' : 'search-for-a-game')} id="simpleSearchValue"
					disabled={advancedSearchVisible} onChange={this._fieldChangeSimple} autoComplete="off" />
				<button type="submit" className="ball" disabled={!fieldValueSimple}>
					<Icon type="search" size="24" />
				</button>
				{!advancedSearchVisible &&
					<a onClick={this._toggleAdvanced} className="trigger-advanced">
						{t('advanced-search')}
						<Icon size="9" type="plus" />
					</a>}
			</form>
			<AdvancedFields visible={advancedSearchVisible} hide={this._toggleAdvanced} submit={this._submitAdvanced} />
		</div>
	}
}

const mapStateToProps = state => ({
	advancedSearchVisible: state.search.advancedVisible,
	fieldValueSimple: state.search.fieldValueSimple
})

const mapDispatchToProps = {
	simpleFieldValueChange: createAction(SEARCH.CHANGEDSIMPLE),
	simpleSearchSubmit: createAction(SEARCH.SUBMITTEDSIMPLE),
	advancedSearchSubmit: createAction(SEARCH.SUBMITTEDADVANCED),
	toggleAdvancedAction: createAction(SEARCH.TOGGLEADVANCED)
}

export default connect(mapStateToProps, mapDispatchToProps)(Fields)
