import React, { Component } from 'react'

import './pagination.styl'
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
		for (let x = 1; x <= this.pages; x++) {
			this.pagesArray.push(x)
		}
		this.hasPrev = (props.currentPage !== 1)
		this.hasNext = props.currentPage < this.pages
	}

	_goToPage(ev) {
		const pageNumber = (typeof ev === 'object' ? parseInt(ev.target.value, 10) : ev)
		const page = String(pageNumber)
		this.props.linkFunction(page)
	}

	render() {
		const { currentPage } = this.props
		const pageInt = parseInt(currentPage, 10)
		return <aside className="pagination">
			<a className={'ball btn extremes first' + (this.hasPrev ? '' : ' inactive')} title={t('first-page')} onClick={() => this.hasPrev && this._goToPage(1)}>
				<Icon size="9" type="first" />
			</a>
			<a className={'ball btn sequence prev' + (this.hasPrev ? '' : ' inactive')} title={t('previous-page')} onClick={() => this.hasPrev && this._goToPage(pageInt - 1)}>
				<Icon size="17" type="prev" />
			</a>
			<div className="ball btn">
				<SelectBox onChange={(ev) => this._goToPage(ev)} value={currentPage}>
					{this.pagesArray.map(p => { return <option key={p} value={p}>{p}</option> })}
				</SelectBox>
			</div>
			<a className={'ball btn sequence next' + (this.hasNext ? '' : ' inactive')} title={t('next-page')} onClick={() => this.hasNext && this._goToPage(pageInt + 1)}>
				<Icon size="17" type="next" />
			</a>
			<a className={'ball btn extremes last' + (this.hasNext ? '' : ' inactive')} title={t('last-page')} onClick={() => this.hasNext && this._goToPage(this.pages)}>
				<Icon size="9" type="last" />
			</a>
		</aside>
	}
}

export default Pagination
