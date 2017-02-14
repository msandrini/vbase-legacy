import React, { Component } from 'react'
import { Link } from 'react-router'

import '../../styles/pagination.styl'
import t from '../../i18n'
import Icon from './icon.jsx'
import SelectBox from './select-box.jsx'

import { ITEMS_PER_PAGE } from '../../constants'

class Pagination extends Component {
	constructor(props) {
		super(props)
		this.hasPrev = false
		this.hasNext = false
		this.pages = 0
	}

	componentWillMount() {
		this._buildPagination(this.props)
	}

	componentWillReceiveProps(nextProps) {
		this._buildPagination(nextProps)
	}

	_buildPagination(props) {
		this.pagesArray = []
		this.pages = Math.ceil(props.results / ITEMS_PER_PAGE)
		for (let x = 0; x < this.pages; x++) {
			this.pagesArray.push(x)
		}
		this.hasPrev = (props.currentPage !== 0)
		this.hasNext = props.currentPage < (this.pages - 1)
	}

	_goToPage(ev) {
		const page = (typeof ev === 'object' ? ev.target.value : String(ev))
		this.props.linkFunction(page)
	}

	render() {
		const { linkFunction, currentPage } = this.props
		const pageInt = parseInt(currentPage, 10)
		return <aside className="pagination">
			{this.hasPrev &&
	    		<a className="btn extremes first" title={t('first-page')} onClick={() => this._goToPage(0)}>
	    			<span className="alt">{t('first-page')}</span>
	    			<Icon size="20" type="prev" />
	    		</a>}
	    	{this.hasPrev &&
	    		<a className="btn sequence prev" title={t('previous-page')} onClick={() => this._goToPage(pageInt - 1)}>
	    			<span className="alt">{t('previous-page')}</span>
	    			<Icon size="25" type="prev" />
	    		</a>}
	    	<SelectBox onChange={(ev) => this._goToPage(ev)} value={currentPage}>
		    	{this.pagesArray.map(p => { return <option key={p} value={p}>{p+1}</option> })}
		    </SelectBox>
	    	{this.hasNext &&
	    		<a className="btn sequence next" title={t('next-page')} onClick={() => this._goToPage(pageInt + 1)}>
	    			<span className="alt">{t('next-page')}</span>
	    			<Icon size="25" type="next" />
	    		</a>}
	    	{this.hasNext &&
	    		<a className="btn extremes last" title={t('last-page')} onClick={() => this._goToPage(this.pages - 1)}>
	    			<span className="alt">{t('last-page')}</span>
	    			<Icon size="20" type="next" />
	    		</a>}
	    </aside>
	}
}

export default Pagination